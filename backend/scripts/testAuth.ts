import { db } from '../src/db/database.js';
import { config } from '../src/config.js';

interface ApiResponse<T = any> {
  status: number;
  data: T;
  headers: Headers;
  cookies: string[];
}

const BASE_URL = 'http://localhost:8000/api';

async function request<T = any>(
  path: string,
  options: {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
    cookie?: string;
  } = {}
): Promise<ApiResponse<T>> {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (options.cookie) {
    headers.set('Cookie', options.cookie);
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const cookies: string[] = [];
  const setCookie = res.headers.get('set-cookie');
  if (setCookie) {
    cookies.push(setCookie);
  }

  let data: any = null;
  const text = await res.text();
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  return {
    status: res.status,
    data,
    headers: res.headers,
    cookies,
  };
}

function extractSessionCookie(cookies: string[]): string {
  for (const c of cookies) {
    const match = c.match(/(?:prismcode_session|codearena_session)=([^;]+)/);
    if (match) return `${config.cookieName}=${match[1]}`;
  }
  return '';
}

async function runTests() {
  console.log('\n======================================================');
  console.log('       PrismCode Authentication & Security Test Suite   ');
  console.log('======================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(testName: string, condition: boolean, details?: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName} ${details ? `(${details})` : ''}`);
      failed++;
    }
  }

  await db.init();

  const testEmail = `testuser_${Date.now()}@prismcode.test`;
  const testPassword = 'StrongPassword123!';
  let userCookie = '';
  let adminCookie = '';

  // 1. Password validation
  console.log('\n[1] Registration Validation Checks:');
  const shortPassRes = await request('/auth/register', {
    method: 'POST',
    body: { name: 'Test User', email: testEmail, password: '123' },
  });
  assert('Rejects short password (< 8 chars)', shortPassRes.status === 400);

  const invalidEmailRes = await request('/auth/register', {
    method: 'POST',
    body: { name: 'Test User', email: 'notanemail', password: testPassword },
  });
  assert('Rejects malformed email address', invalidEmailRes.status === 400);

  // 2. Successful Registration
  console.log('\n[2] User Registration & Session Cookie:');
  const regRes = await request('/auth/register', {
    method: 'POST',
    body: { name: 'Automated Tester', email: testEmail, password: testPassword },
  });
  assert('Creates user with status 201', regRes.status === 201);
  assert('Sets HTTP-only session cookie', regRes.cookies.some((c) => c.includes(`${config.cookieName}=`)));
  assert('Initial emailVerified is false', regRes.data?.user?.email_verified === false);
  userCookie = extractSessionCookie(regRes.cookies);

  // 3. Duplicate Registration Prevention
  console.log('\n[3] Duplicate Registration Prevention:');
  const dupRes = await request('/auth/register', {
    method: 'POST',
    body: { name: 'Automated Tester 2', email: testEmail, password: testPassword },
  });
  assert('Rejects duplicate email with 409 Conflict', dupRes.status === 409);
  assert('Returns EMAIL_ALREADY_REGISTERED error code', dupRes.data?.error?.code === 'EMAIL_ALREADY_REGISTERED');

  // 4. Login Invalid Credentials
  console.log('\n[4] Login Security & Error Handling:');
  const wrongPassRes = await request('/auth/login', {
    method: 'POST',
    body: { email: testEmail, password: 'WrongPassword999!' },
  });
  assert('Rejects incorrect password with 401', wrongPassRes.status === 401);
  assert('Returns INVALID_CREDENTIALS without leaking user existence', wrongPassRes.data?.error?.code === 'INVALID_CREDENTIALS');

  // 5. Successful Login
  const loginRes = await request('/auth/login', {
    method: 'POST',
    body: { email: testEmail, password: testPassword },
  });
  assert('Logs in successfully with 200 OK', loginRes.status === 200);
  assert('Sets refreshed session cookie', loginRes.cookies.some((c) => c.includes(`${config.cookieName}=`)));
  userCookie = extractSessionCookie(loginRes.cookies);

  // 6. Session Verification (/auth/me)
  console.log('\n[5] Session Identity Verification (/api/auth/me):');
  const meRes = await request('/auth/me', { cookie: userCookie });
  assert('Returns current user details with valid session', meRes.status === 200 && meRes.data?.email === testEmail);
  assert('Assigns default "user" role', meRes.data?.role === 'user');

  // 7. Role-Based Access Control (RBAC) Enforcement
  console.log('\n[6] Server-Side Role-Based Authorization Checks:');
  const unauthAdminRes = await request('/admin/stats');
  assert('Unauthenticated request to /admin/stats returns 401', unauthAdminRes.status === 401);

  const userAdminRes = await request('/admin/stats', { cookie: userCookie });
  assert('Regular user request to /admin/stats returns 403 Forbidden', userAdminRes.status === 403);
  assert('Error code is FORBIDDEN', userAdminRes.data?.error?.code === 'FORBIDDEN');

  // 8. Admin Login & Access
  console.log('\n[7] Administrator Authentication & Access:');
  const adminLoginRes = await request('/auth/login', {
    method: 'POST',
    body: { email: 'admin@prismcode.com', password: 'Admin123!' },
  });
  assert('Admin signs in with 200 OK', adminLoginRes.status === 200);
  adminCookie = extractSessionCookie(adminLoginRes.cookies);

  const adminStatsRes = await request('/admin/stats', { cookie: adminCookie });
  assert('Admin accesses /admin/stats with 200 OK', adminStatsRes.status === 200);
  assert('Stats include totalUsers and totalProblems', typeof adminStatsRes.data?.totalUsers === 'number' && typeof adminStatsRes.data?.totalProblems === 'number');

  // 9. Password Reset Flow
  console.log('\n[8] Password Reset Flow:');
  const forgotRes = await request('/auth/forgot-password', {
    method: 'POST',
    body: { email: testEmail },
  });
  assert('Forgot password returns 202 Accepted', forgotRes.status === 202);

  const invalidResetRes = await request('/auth/reset-password', {
    method: 'POST',
    body: { token: 'invalid_token_123', password: 'BrandNewPassword123!' },
  });
  assert('Rejects invalid reset token with 400', invalidResetRes.status === 400);

  // Fetch real reset token dispatched by the server in dev mode
  const devTokenRes = await request(`/auth/dev/tokens?email=${encodeURIComponent(testEmail)}`);
  const rawResetToken = devTokenRes.data?.token;
  assert('Server generated and dispatched password reset token', Boolean(rawResetToken));

  const validResetRes = await request('/auth/reset-password', {
    method: 'POST',
    body: { token: rawResetToken, password: 'BrandNewPassword123!' },
  });
  assert('Password reset succeeds with 200 OK', validResetRes.status === 200);

  // Verify old password fails
  const oldLoginRes = await request('/auth/login', {
    method: 'POST',
    body: { email: testEmail, password: testPassword },
  });
  assert('Old password rejected after reset (401)', oldLoginRes.status === 401);

  // Verify new password succeeds
  const newLoginRes = await request('/auth/login', {
    method: 'POST',
    body: { email: testEmail, password: 'BrandNewPassword123!' },
  });
  assert('New password accepted (200 OK)', newLoginRes.status === 200);
  userCookie = extractSessionCookie(newLoginRes.cookies);

  // 10. Email Verification Flow
  console.log('\n[9] Email Verification Flow:');
  const invalidVerifyRes = await request('/auth/verify-email', {
    method: 'POST',
    body: { token: 'invalid_verification_token' },
  });
  assert('Rejects invalid email verification token (400)', invalidVerifyRes.status === 400);

  // Trigger resend verification to obtain a fresh verification token
  await request('/auth/resend-verification', {
    method: 'POST',
    body: { email: testEmail },
  });

  const devVerifyRes = await request(`/auth/dev/tokens?email=${encodeURIComponent(testEmail)}`);
  const rawVerifyToken = devVerifyRes.data?.token;
  assert('Server generated and dispatched verification token', Boolean(rawVerifyToken));

  const validVerifyRes = await request('/auth/verify-email', {
    method: 'POST',
    body: { token: rawVerifyToken },
  });
  assert('Email verification succeeds with 200 OK', validVerifyRes.status === 200);
  assert('User record updated to email_verified = true', validVerifyRes.data?.user?.email_verified === true);

  // 11. Logout & Session Invalidation
  console.log('\n[10] Logout & Session Invalidation:');
  const logoutRes = await request('/auth/logout', {
    method: 'POST',
    cookie: userCookie,
  });
  assert('Logout returns 204 No Content', logoutRes.status === 204);
  assert('Clears session cookie', logoutRes.cookies.some((c) => c.includes(`${config.cookieName}=;`)));

  const postLogoutMe = await request('/auth/me', { cookie: userCookie });
  assert('Session immediately invalidated, /auth/me returns 401 SESSION_EXPIRED', postLogoutMe.status === 401);

  console.log('\n======================================================');
  console.log(`Summary: Passed: ${passed} | Failed: ${failed}`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
