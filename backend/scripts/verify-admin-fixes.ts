import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import { db } from '../src/db/database.js';
import { attachUser } from '../src/middleware/auth.js';
import { errorHandler } from '../src/middleware/errorHandler.js';
import adminRoutes from '../src/routes/adminRoutes.js';
import authRoutes from '../src/routes/authRoutes.js';
import type { Problem } from '../src/types/index.js';

async function runTests() {
  console.log('🧪 Starting Admin Fixes Verification Suite...\n');

  await db.init();

  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use(attachUser);
  app.use('/api/auth', authRoutes);
  app.use('/api/admin', adminRoutes);
  app.use(errorHandler);

  const server = http.createServer(app);
  await new Promise<void>((resolve) => server.listen(0, resolve));
  const address = server.address();
  const port = typeof address === 'object' && address ? address.port : 8000;
  const baseUrl = `http://127.0.0.1:${port}`;

  console.log(`📡 Test server running at ${baseUrl}`);

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, extra?: unknown) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`, extra ? extra : '');
      failed++;
    }
  }

  try {
    // 1. Test Admin Authorization Guard (Unauthenticated)
    console.log('\n--- 1. Testing Admin Role Authorization ---');
    const unauthRes = await fetch(`${baseUrl}/api/admin/stats`);
    assert(unauthRes.status === 401, 'Unauthenticated request to /api/admin/stats returns 401');

    // Sign in as admin user
    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@prismcode.com', password: 'Admin123!' }),
    });
    const setCookie = loginRes.headers.get('set-cookie');
    assert(loginRes.status === 200, 'Admin login succeeded with 200');
    assert(Boolean(setCookie), 'Admin login returned session cookie');

    const adminHeaders = {
      'Content-Type': 'application/json',
      Cookie: setCookie || '',
    };

    // Authenticated admin request
    const authStatsRes = await fetch(`${baseUrl}/api/admin/stats`, { headers: adminHeaders });
    assert(authStatsRes.status === 200, 'Admin request to /api/admin/stats returns 200');
    const statsData = await authStatsRes.json();
    assert(typeof statsData.totalProblems === 'number', 'Stats data contains totalProblems count');
    assert(typeof statsData.totalAuditLogs === 'number', 'Stats data contains totalAuditLogs count');

    // 2. Test Problem Create with Server-side Validation & Persistence
    console.log('\n--- 2. Testing Problem Create, Update, Delete & Validation ---');
    // 2a. Invalid payload (missing description & examples)
    const invalidCreateRes = await fetch(`${baseUrl}/api/admin/problems`, {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify({ id: 'bad-problem', title: 'Bad' }),
    });
    assert(invalidCreateRes.status === 400, 'Invalid problem payload rejected with 400');
    const invalidBody = await invalidCreateRes.json();
    assert(invalidBody.error?.code === 'VALIDATION_ERROR', 'Rejection code is VALIDATION_ERROR');

    // 2b. Valid payload
    const testProblem: Problem = {
      id: 'test-admin-sum',
      title: 'Test Admin Sum',
      difficulty: 'Easy',
      topics: ['Math', 'Testing'],
      acceptance: '85.0%',
      submissions: '500',
      description: 'Calculate sum of two numbers for verification.',
      examples: [{ input: 'a = 1, b = 2', output: '3' }],
      constraints: ['1 <= a, b <= 1000'],
    };

    const validCreateRes = await fetch(`${baseUrl}/api/admin/problems`, {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify(testProblem),
    });
    assert(validCreateRes.status === 201, 'Valid problem created with 201');
    const createdData = await validCreateRes.json();
    assert(createdData.id === 'test-admin-sum', 'Created problem has matching ID');

    // Verify persisted in DB
    const persisted = db.findProblemById('test-admin-sum');
    assert(persisted?.title === 'Test Admin Sum', 'Problem successfully persisted to database');

    // 2c. Update Problem
    const updateRes = await fetch(`${baseUrl}/api/admin/problems/test-admin-sum`, {
      method: 'PUT',
      headers: adminHeaders,
      body: JSON.stringify({
        ...testProblem,
        title: 'Test Admin Sum Updated',
        difficulty: 'Medium',
      }),
    });
    assert(updateRes.status === 200, 'Problem update succeeded with 200');
    const updatedInDb = db.findProblemById('test-admin-sum');
    assert(updatedInDb?.title === 'Test Admin Sum Updated', 'Update reflected in database');
    assert(updatedInDb?.difficulty === 'Medium', 'Updated difficulty reflected in database');

    // 3. Test Batch Import
    console.log('\n--- 3. Testing Batch Problem Import API ---');
    const importPayload = {
      fileName: 'test-suite-import.jsonl',
      problems: [
        {
          id: 'test-import-001',
          name: 'First Imported Question',
          difficulty: 'Easy',
          tags: ['Array', 'Search'],
          statement: 'Search for value in array.',
          examples: [{ input: 'nums = [1,2], target = 1', output: '0' }],
          constraints: ['nums.length > 0'],
        },
        {
          id: 'test-import-002',
          title: 'Second Imported Question',
          difficulty: 'Hard',
          topics: ['Dynamic Programming'],
          description: 'Complex optimal subproblem structure.',
          examples: [{ input: 'n = 5', output: '15' }],
          constraints: ['1 <= n <= 100'],
        },
        {
          // Invalid item missing title
          id: 'test-import-bad',
          difficulty: 'Easy',
        },
      ],
    };

    const importRes = await fetch(`${baseUrl}/api/admin/problems/import`, {
      method: 'POST',
      headers: adminHeaders,
      body: JSON.stringify(importPayload),
    });
    assert(importRes.status === 200, 'Import endpoint responded with 200');
    const importData = await importRes.json();
    assert(importData.acceptedCount === 2, 'Imported 2 valid problems');
    assert(importData.rejectedCount === 1, 'Rejected 1 invalid problem row');
    assert(Boolean(db.findProblemById('test-import-001')), 'First imported problem in database');
    assert(Boolean(db.findProblemById('test-import-002')), 'Second imported problem in database');

    // 4. Test Audit Logging
    console.log('\n--- 4. Testing Audit Logs Collection ---');
    const logsRes = await fetch(`${baseUrl}/api/admin/audit-logs`, { headers: adminHeaders });
    assert(logsRes.status === 200, 'Audit logs endpoint returned 200');
    const logsData = await logsRes.json();
    assert(Array.isArray(logsData), 'Audit logs response is an array');

    const actions = logsData.map((l: { action: string }) => l.action);
    assert(actions.includes('create_problem'), 'Audit logs contain create_problem event');
    assert(actions.includes('update_problem'), 'Audit logs contain update_problem event');
    assert(actions.includes('import_problems'), 'Audit logs contain import_problems event');

    const importLog = logsData.find((l: { action: string }) => l.action === 'import_problems');
    assert(importLog.userEmail === 'admin@prismcode.com', 'Audit log records admin user email');
    assert(importLog.details?.fileName === 'test-suite-import.jsonl', 'Audit log records import file name');
    assert(Boolean(importLog.timestamp), 'Audit log has valid ISO timestamp');

    // 5. Test Problem Delete
    console.log('\n--- 5. Testing Delete Problem & Delete Audit Log ---');
    const deleteRes = await fetch(`${baseUrl}/api/admin/problems/test-admin-sum`, {
      method: 'DELETE',
      headers: adminHeaders,
    });
    assert(deleteRes.status === 204, 'Problem deletion succeeded with 204');
    assert(db.findProblemById('test-admin-sum') === undefined, 'Problem removed from database');

    // Cleanup imported test questions
    await db.deleteProblem('test-import-001');
    await db.deleteProblem('test-import-002');

    // Check delete audit log
    const postDeleteLogsRes = await fetch(`${baseUrl}/api/admin/audit-logs`, { headers: adminHeaders });
    const postDeleteLogs = await postDeleteLogsRes.json();
    const deleteLog = postDeleteLogs.find((l: { action: string; targetId?: string }) => l.action === 'delete_problem' && l.targetId === 'test-admin-sum');
    assert(Boolean(deleteLog), 'Audit log recorded problem deletion event');

  } finally {
    server.close();
  }

  console.log(`\n========================================`);
  console.log(`Tests Completed: ${passed} passed, ${failed} failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test execution error:', err);
  process.exit(1);
});
