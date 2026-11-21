import { config } from '../src/config.js';
import { db } from '../src/db/database.js';
import app from '../src/index.js';
import { authService } from '../src/services/authService.js';
import { runTestCases } from '../src/services/onlineCompilerService.js';
import http from 'http';

async function runSecuritySuite() {
  console.log('====================================================');
  console.log('    PRISMCODE COMPREHENSIVE SECURITY VERIFICATION   ');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}${detail ? ` -> ${detail}` : ''}`);
      failed++;
    }
  }

  // 1. Verify OnlineCompiler.io Execution in Isolated Container
  console.log('--- Test 1: Isolated OnlineCompiler.io Execution ---');
  try {
    const pythonCode = `
class Solution:
    def twoSum(self, nums, target):
        lookup = {}
        for i, n in enumerate(nums):
            diff = target - n
            if diff in lookup:
                return [lookup[diff], i]
            lookup[n] = i
        return []
`;
    const res = await runTestCases('python', pythonCode, [
      { caseNumber: 1, input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]' },
    ]);
    assert(res.success === true, 'OnlineCompiler executes Python in isolated container', `verdict=${res.verdict}, err=${res.stderr}`);
    assert(res.totalPassed === 1, 'Test case passed correctly in isolated container');
  } catch (err) {
    assert(false, 'OnlineCompiler execution failed', String(err));
  }

  // 2. Verify JavaScript execution on OnlineCompiler
  console.log('\n--- Test 2: JavaScript Execution on OnlineCompiler ---');
  try {
    const jsCode = `
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) return [map.get(diff), i];
    map.set(nums[i], i);
  }
  return [];
}
`;
    const res = await runTestCases('javascript', jsCode, [
      { caseNumber: 1, input: 'nums = [3,2,4], target = 6', expected: '[1, 2]' },
    ]);
    assert(res.success === true, 'OnlineCompiler executes JavaScript in isolated container', `verdict=${res.verdict}`);
  } catch (err) {
    assert(false, 'JavaScript execution failed', String(err));
  }

  // 3. Verify Local Arbitrary Host Execution is Disabled
  console.log('\n--- Test 3: Unsafe Local Execution Blocked ---');
  assert(config.allowUnsafeLocalExecution === false, 'config.allowUnsafeLocalExecution is strictly false by default');

  // 4. Verify Leaderboard PII Protection (No Email Leak)
  console.log('\n--- Test 4: Leaderboard Email Privacy ---');
  const leaderboard = db.getLeaderboard();
  assert(leaderboard.length > 0, 'Leaderboard entries exist');
  const hasEmail = leaderboard.some((entry: any) => 'email' in entry && Boolean(entry.email));
  assert(!hasEmail, 'Leaderboard responses contain NO user email addresses (PII stripped)');

  // 5. Verify Password Complexity Enforcement
  console.log('\n--- Test 5: Password Complexity Enforcement ---');
  try {
    await authService.register({
      name: 'Weak User',
      email: `weak_${Date.now()}@example.com`,
      password: 'weakpassword', // No numbers or special characters
    });
    assert(false, 'Password complexity should have rejected password without numbers/symbols');
  } catch (err: any) {
    assert(
      err?.message?.includes('Password must contain at least one letter and at least one number or special character'),
      'Weak password without numbers/symbols was rejected with validation error'
    );
  }

  // 6. Verify Session Token Hashing (HIGH-2)
  console.log('\n--- Test 6: Session Token Hashing in Database ---');
  const demoUser = db.findUserByEmail('alex@example.com');
  if (demoUser) {
    const session = await authService.createSession(demoUser.id);
    const rawToken = session.id;
    // Look up via raw token
    const retrieved = db.findSessionById(rawToken);
    assert(Boolean(retrieved), 'Session successfully retrieved using raw token');
    // Ensure raw token is NOT stored as id in database record
    assert(retrieved?.id !== rawToken, 'Raw session token is NOT stored as id in database');
    assert(Boolean(retrieved?.tokenHash), 'Session record stores SHA-256 tokenHash');
    // Delete session
    await db.deleteSession(rawToken);
    const deletedCheck = db.findSessionById(rawToken);
    assert(!deletedCheck, 'Session successfully invalidated using raw token');
  }

  // 7. Verify HTTP Endpoints & Security Headers with ephemeral server
  console.log('\n--- Test 7: HTTP Security Headers, Route Shadowing & Dev Tokens ---');
  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const address = server.address() as any;
  const baseUrl = `http://127.0.0.1:${address.port}`;

  try {
    // Check security headers on /api/health
    const healthRes = await fetch(`${baseUrl}/api/health`);
    assert(healthRes.headers.get('x-content-type-options') === 'nosniff', 'X-Content-Type-Options: nosniff header present (Helmet active)');
    assert(healthRes.headers.get('x-frame-options') === 'SAMEORIGIN', 'X-Frame-Options header present (Helmet active)');

    // Verify shadow routes return 404 (HIGH-6 fix)
    const shadowRes = await fetch(`${baseUrl}/auth/login`, { method: 'POST' });
    assert(shadowRes.status === 404, 'Shadow route /auth/login returns 404 (strictly must use /api/auth/login)');

    // Verify /api/auth/dev/tokens is 404 when disabled (CRIT-6 fix)
    const devTokenRes = await fetch(`${baseUrl}/api/auth/dev/tokens?email=admin@prismcode.com`);
    assert(devTokenRes.status === 404, '/api/auth/dev/tokens route is disabled (returns 404)');

    // Verify code execution limits on submission route (MED-4 fix)
    const oversizedCode = 'a'.repeat(70000);
    const oversizedRes = await fetch(`${baseUrl}/api/submissions/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        problemId: 'two-sum',
        code: oversizedCode,
        language: 'javascript',
      }),
    });
    assert(oversizedRes.status === 400, 'Oversized code submissions (>64KB) are rejected with 400 Bad Request');

  } finally {
    server.close();
  }

  console.log('\n====================================================');
  console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runSecuritySuite().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
