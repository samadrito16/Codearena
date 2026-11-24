import { spawn } from 'node:child_process';
import { config } from '../../config.js';
import type { EngineRunResult } from './types.js';

interface OnlineCompilerResponse {
  output?: string;
  error?: string;
  status?: string;
  exit_code?: number;
  time?: number | string;
  memory?: number | string;
  signal?: string;
}

/**
 * Spawns an external command with standard input and a strict timeout.
 * Strictly gated by config.allowUnsafeLocalExecution and strictly forbidden in production.
 */
function runProcessWithStdin(
  command: string,
  args: string[],
  stdin: string,
  timeoutMs = 4000,
): Promise<EngineRunResult> {
  if (config.isProduction || !config.allowUnsafeLocalExecution) {
    return Promise.reject(
      new Error('Arbitrary local host process execution is disabled for security. Use isolated container execution.')
    );
  }

  return new Promise((resolve) => {
    let stdout = '';
    let stderr = '';
    const start = Date.now();
    let killedByTimeout = false;

    try {
      const child = spawn(command, args, {
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      const timer = setTimeout(() => {
        killedByTimeout = true;
        child.kill('SIGKILL');
        resolve({
          stdout,
          stderr: 'Time Limit Exceeded (4s)',
          runtimeMs: timeoutMs,
          memoryMb: 0,
          exitCode: 124,
        });
      }, timeoutMs);

      child.stdout.on('data', (d) => { stdout += d.toString(); });
      child.stderr.on('data', (d) => { stderr += d.toString(); });

      child.on('error', (err) => {
        clearTimeout(timer);
        resolve({
          stdout,
          stderr: err.message,
          runtimeMs: Date.now() - start,
          memoryMb: 0,
          exitCode: 1,
        });
      });

      child.on('close', (code) => {
        clearTimeout(timer);
        if (killedByTimeout) return;
        resolve({
          stdout: stdout.replace(/\r\n/g, '\n'),
          stderr: stderr.replace(/\r\n/g, '\n'),
          runtimeMs: Math.max(1, Date.now() - start),
          memoryMb: 0,
          exitCode: code ?? 0,
        });
      });

      if (stdin) {
        child.stdin.write(stdin);
      }
      child.stdin.end();
    } catch (err: unknown) {
      resolve({
        stdout: '',
        stderr: err instanceof Error ? err.message : String(err),
        runtimeMs: Date.now() - start,
        memoryMb: 0,
        exitCode: 1,
      });
    }
  });
}

/**
 * Executes code using OnlineCompiler.io isolated container endpoint.
 */
async function executeWithOnlineCompiler(
  compilerId: string,
  code: string,
  input: string,
): Promise<EngineRunResult> {
  const url = config.onlineCompilerApiUrl || 'https://api.onlinecompiler.io/api/run-code-sync/';
  const apiKey = config.onlineCompilerApiKey;

  if (!apiKey) {
    throw new Error('ONLINECOMPILER_API_KEY is not configured in backend/.env');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000); // 12-second HTTP timeout

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        compiler: compilerId,
        code,
        input,
        time_limit: 5,
        memory_limit: 256,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      throw new Error(`OnlineCompiler isolated container HTTP ${response.status}: ${errText || response.statusText}`);
    }

    const data = (await response.json()) as OnlineCompilerResponse;
    const parsedTime = parseFloat(String(data.time ?? '0'));
    const runtimeMs = parsedTime > 0 ? Math.round(parsedTime * 1000) : 0;

    const parsedMem = parseFloat(String(data.memory ?? '0'));
    // OnlineCompiler reports memory in KB (e.g. 132040 KB = ~128.9 MB)
    const memoryMb = parsedMem > 0 ? Math.round((parsedMem / 1024) * 10) / 10 : 0;

    let exitCode = data.exit_code ?? 0;
    if (data.status === 'time_limit_exceeded' || data.signal === 'SIGKILL' || data.signal === 'SIGXCPU') {
      exitCode = 124; // Standard TLE exit code
    } else if (data.status === 'error' && exitCode === 0) {
      exitCode = 1;
    }

    return {
      stdout: (data.output || '').replace(/\r\n/g, '\n'),
      stderr: (data.error || '').replace(/\r\n/g, '\n'),
      runtimeMs,
      memoryMb,
      exitCode,
    };
  } catch (err: unknown) {
    clearTimeout(timeout);
    if (err instanceof Error && err.name === 'AbortError') {
      return {
        stdout: '',
        stderr: 'Time Limit Exceeded: Execution container request timed out.',
        runtimeMs: 10000,
        memoryMb: 25.0,
        exitCode: 124,
      };
    }
    throw err;
  }
}

/**
 * Unified execution engine dispatch:
 * - Executes in isolated remote container via OnlineCompiler.io
 * - Strict security: arbitrary local execution on the host machine is completely blocked by default.
 */
export async function executeCode(
  languageId: string,
  compilerId: string,
  code: string,
  input: string,
): Promise<EngineRunResult> {
  // If OnlineCompiler API key is present, execute inside secure cloud container
  if (config.onlineCompilerApiKey) {
    try {
      return await executeWithOnlineCompiler(compilerId, code, input);
    } catch (err: unknown) {
      console.warn('[ExecutionEngine] OnlineCompiler execution error:', err);
      // For security, do NOT fall back to local unsandboxed host process execution
      if (!config.allowUnsafeLocalExecution || config.isProduction) {
        throw new Error(
          err instanceof Error ? err.message : 'Execution failed in the isolated container. Please try again.'
        );
      }
    }
  }

  // Local fallback is strictly blocked by default to prevent RCE
  if (!config.allowUnsafeLocalExecution || config.isProduction) {
    throw new Error(
      'Isolated container execution is required. Please ensure ONLINECOMPILER_API_KEY is configured in backend/.env. Arbitrary host process execution is disabled for security.'
    );
  }

  const lang = languageId.toLowerCase().trim();

  // Local fallback for JavaScript / TypeScript (ONLY if ALLOW_UNSAFE_LOCAL_EXECUTION=true and NOT production)
  if (lang === 'javascript' || lang === 'typescript' || compilerId.startsWith('node')) {
    return runProcessWithStdin('node', ['-e', code], input, 4000);
  }

  // Local fallback for Python (ONLY if ALLOW_UNSAFE_LOCAL_EXECUTION=true and NOT production)
  if (lang === 'python' || compilerId.startsWith('python')) {
    const pythonCmd = process.platform === 'win32' ? 'py' : 'python3';
    return runProcessWithStdin(pythonCmd, ['-c', code], input, 4000);
  }

  throw new Error(`Execution unsupported for ${languageId}. Isolated container execution required.`);
}
