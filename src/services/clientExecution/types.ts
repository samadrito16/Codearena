export type ClientEngineType = 'pyodide-wasm' | 'isolated-worker' | 'server';

export interface ClientExecutionOptions {
  code: string;
  language: string;
  stdin?: string;
  timeoutMs?: number;
  onStatus?: (status: PyodideStatus, message?: string) => void;
}

export interface ClientExecutionResult {
  success: boolean;
  verdict: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Time Limit Exceeded' | 'Compilation Error';
  stdout: string;
  stderr?: string;
  returnValue?: string;
  runtimeMs: number;
  engine: ClientEngineType;
  details?: string;
}

export type PyodideStatus = 'idle' | 'loading' | 'ready' | 'running' | 'error';

export interface EngineDetails {
  type: ClientEngineType;
  badgeLabel: string;
  badgeColor: string;
  description: string;
  isClientSide: boolean;
}
