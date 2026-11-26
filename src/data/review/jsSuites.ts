import { ReviewTestSuite } from '../../types/review';

export const JS_REVIEW_SUITES: Record<string, ReviewTestSuite> = {
  'rev-001': {
    scenarioId: 'rev-001',
    executionMode: 'client_js',
    runtimeLanguage: 'javascript',
    testCases: [
      {
        id: 't1',
        title: 'Allows requests within concurrency cap & decrements on finish',
        description: 'A single request passes through middleware and resets active concurrency to 0 once response finishes.',
        isRegressionCheck: true,
      },
      {
        id: 't2',
        title: 'Blocks concurrent burst while Express downstream handler is still streaming',
        description: 'With maxConcurrent = 1, a second request arriving before res1 emits "finish" must be rejected with HTTP 429.',
      },
      {
        id: 't3',
        title: 'Handles direct async trackRequest burst and error cleanup accurately',
        description: 'Three concurrent direct trackRequest calls with maxConcurrent = 2 must reject the 3rd with 429 and settle activeCount to 0.',
      },
    ],
    harnessCode: `
      async function runTests(ctx) {
        const results = [];
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const createMockRes = () => {
          const listeners = {};
          const res = {
            statusCode: 200,
            body: null,
            on(ev, fn) { (listeners[ev] = listeners[ev] || []).push(fn); return res; },
            once(ev, fn) { return res.on(ev, fn); },
            emit(ev) { (listeners[ev] || []).forEach((fn) => fn()); },
            status(code) { res.statusCode = code; return res; },
            json(payload) { res.body = payload; return res; },
          };
          return res;
        };

        // Test 1
        try {
          ctx.resetModules();
          const middleware = ctx.require('./middleware.js');
          const tracker = ctx.require('./requestTracker.js');
          const res = createMockRes();
          let nextCalled = false;
          middleware({ headers: { 'x-client-id': 'c1', 'x-max-concurrent': '2' } }, res, () => {
            nextCalled = true;
            setTimeout(() => res.emit('finish'), 15);
          });
          await sleep(40);
          const countAfter = tracker.getActiveCount();
          const passed = nextCalled && res.statusCode === 200 && countAfter === 0;
          results.push({
            testId: 't1',
            passed,
            expected: 'next() called, status 200, activeCount === 0 after finish',
            actual: \`nextCalled=\${nextCalled}, status=\${res.statusCode}, activeCount=\${countAfter}\`,
          });
        } catch (err) {
          results.push({ testId: 't1', passed: false, error: err.message });
        }

        // Test 2
        try {
          ctx.resetModules();
          const middleware = ctx.require('./middleware.js');
          const tracker = ctx.require('./requestTracker.js');
          const res1 = createMockRes();
          const res2 = createMockRes();
          let req1NextCalled = false;
          let req2NextCalled = false;

          middleware({ headers: { 'x-client-id': 'c1', 'x-max-concurrent': '1' } }, res1, () => {
            req1NextCalled = true;
            // Route takes 40ms before finishing response
            setTimeout(() => res1.emit('finish'), 40);
          });

          await sleep(5);
          // Request 2 arrives while Request 1 is still streaming response
          middleware({ headers: { 'x-client-id': 'c2', 'x-max-concurrent': '1' } }, res2, () => {
            req2NextCalled = true;
            res2.emit('finish');
          });

          await sleep(60);
          const countEnd = tracker.getActiveCount();
          const passed = req1NextCalled && !req2NextCalled && res2.statusCode === 429 && countEnd === 0;
          results.push({
            testId: 't2',
            passed,
            expected: 'Request 2 blocked with HTTP 429 while Request 1 is still in-flight',
            actual: \`req2NextCalled=\${req2NextCalled}, res2.statusCode=\${res2.statusCode}, finalActiveCount=\${countEnd}\`,
          });
        } catch (err) {
          results.push({ testId: 't2', passed: false, error: err.message });
        }

        // Test 3
        try {
          ctx.resetModules();
          const tracker = ctx.require('./requestTracker.js');
          let rejected429 = 0;
          let succeeded = 0;
          const tasks = [1, 2, 3].map(() =>
            tracker.trackRequest('burst', 2, async () => { await sleep(20); return 'ok'; })
              .then(() => { succeeded++; })
              .catch((e) => { if (e && e.statusCode === 429) rejected429++; })
          );
          await Promise.all(tasks);
          const finalCount = tracker.getActiveCount();
          const passed = succeeded === 2 && rejected429 === 1 && finalCount === 0;
          results.push({
            testId: 't3',
            passed,
            expected: '2 succeeded, 1 rejected with 429, activeCount === 0',
            actual: \`succeeded=\${succeeded}, rejected429=\${rejected429}, finalCount=\${finalCount}\`,
          });
        } catch (err) {
          results.push({ testId: 't3', passed: false, error: err.message });
        }

        return results;
      }
    `,
    solutionFiles: [
      {
        filename: 'requestTracker.js',
        content: `const store = new Map();

let activeConcurrentRequests = 0;

async function trackRequest(clientId, maxConcurrent, nextHandler) {
  if (activeConcurrentRequests >= maxConcurrent) {
    const err = new Error('Rate limit exceeded');
    err.statusCode = 429;
    throw err;
  }

  activeConcurrentRequests++;
  store.set(clientId, (store.get(clientId) || 0) + 1);

  try {
    const result = await nextHandler();
    return result;
  } finally {
    activeConcurrentRequests = Math.max(0, activeConcurrentRequests - 1);
  }
}

function getActiveCount() {
  return activeConcurrentRequests;
}

module.exports = { trackRequest, getActiveCount };
`,
      },
      {
        filename: 'middleware.js',
        content: `const { trackRequest } = require('./requestTracker');

function rateLimitMiddleware(req, res, next) {
  const clientId = req.headers['x-client-id'] || 'anonymous';
  const maxConcurrent = parseInt(req.headers['x-max-concurrent'] || '10', 10);

  trackRequest(clientId, maxConcurrent, () => {
    return new Promise((resolve) => {
      let finished = false;
      const done = () => {
        if (!finished) {
          finished = true;
          resolve();
        }
      };
      res.once('finish', done);
      res.once('close', done);
      next();
    });
  }).catch((err) => {
    res.status(err.statusCode || 500).json({ error: err.message });
  });
}

module.exports = rateLimitMiddleware;
`,
      },
    ],
  },

  'rev-003': {
    scenarioId: 'rev-003',
    executionMode: 'client_js',
    runtimeLanguage: 'javascript',
    testCases: [
      {
        id: 't1',
        title: 'Accepts legitimately signed RS256 token',
        description: 'Valid token signed with server RSA key should verify and return user claims.',
        isRegressionCheck: true,
      },
      {
        id: 't2',
        title: 'Rejects forged HS256 token signed with public RSA key (Algorithm Confusion)',
        description: 'An attacker crafting an HS256 token using config.publicKey as HMAC secret must be rejected.',
      },
      {
        id: 't3',
        title: 'Rejects unsigned alg:"none" token',
        description: 'Tokens with alg="none" or mismatched algorithms must throw a verification error.',
      },
    ],
    harnessCode: `
      async function runTests(ctx) {
        const results = [];
        const b64 = (obj) => {
          const json = typeof obj === 'string' ? obj : JSON.stringify(obj);
          return btoa(json).replace(/=/g, '').replace(/\\+/g, '-').replace(/\\//g, '_');
        };
        const unb64 = (s) => {
          const pad = s.replace(/-/g, '+').replace(/_/g, '/');
          return JSON.parse(atob(pad));
        };
        const makeSig = (alg, key, h, p) => b64(alg + ':' + String(key).slice(0, 24) + ':' + h + '.' + p);
        const makeToken = (alg, payload, key) => {
          const h = b64({ alg, typ: 'JWT' });
          const p = b64(payload);
          const sig = alg === 'none' ? '' : makeSig(alg, key, h, p);
          return h + '.' + p + '.' + sig;
        };

        const jwtMock = {
          decode(token, opts) {
            const parts = String(token).split('.');
            if (parts.length < 2) return null;
            const header = unb64(parts[0]);
            const payload = unb64(parts[1]);
            return opts && opts.complete ? { header, payload, signature: parts[2] || '' } : payload;
          },
          verify(token, secretOrPublicKey, options) {
            const parts = String(token).split('.');
            if (parts.length !== 3) throw new Error('jwt malformed');
            const header = unb64(parts[0]);
            const payload = unb64(parts[1]);
            if (header.alg === 'none') {
              if (options && Array.isArray(options.algorithms) && !options.algorithms.includes('none')) {
                throw new Error('invalid algorithm');
              }
              throw new Error('jwt signature is required');
            }
            if (options && Array.isArray(options.algorithms)) {
              if (!options.algorithms.includes(header.alg)) {
                throw new Error('invalid algorithm');
              }
            }
            const expectedSig = makeSig(header.alg, secretOrPublicKey, parts[0], parts[1]);
            if (parts[2] !== expectedSig) {
              throw new Error('invalid signature');
            }
            return payload;
          }
        };

        ctx.setExternalModule('jsonwebtoken', jwtMock);

        // Test 1: Valid RS256 token
        try {
          ctx.resetModules();
          const config = ctx.require('./config.js');
          const { verifyUserToken } = ctx.require('./authService.js');
          const validToken = makeToken('RS256', { userId: 'u_42', role: 'user' }, config.publicKey);
          const decoded = verifyUserToken(validToken);
          const passed = decoded && decoded.userId === 'u_42';
          results.push({
            testId: 't1',
            passed,
            expected: '{ userId: "u_42", role: "user" }',
            actual: JSON.stringify(decoded),
          });
        } catch (err) {
          results.push({ testId: 't1', passed: false, error: err.message });
        }

        // Test 2: Attacker signs HS256 using RSA publicKey
        try {
          ctx.resetModules();
          const config = ctx.require('./config.js');
          const { verifyUserToken } = ctx.require('./authService.js');
          const forgedToken = makeToken('HS256', { userId: 'admin', role: 'superadmin' }, config.publicKey);
          let rejected = false;
          let outcome = null;
          try {
            outcome = verifyUserToken(forgedToken);
          } catch (e) {
            rejected = true;
          }
          results.push({
            testId: 't2',
            passed: rejected,
            expected: 'Throw verification error on HS256 forged token',
            actual: rejected ? 'Rejected forged HS256 token' : 'SECURITY BYPASS: accepted forged admin claims ' + JSON.stringify(outcome),
          });
        } catch (err) {
          results.push({ testId: 't2', passed: false, error: err.message });
        }

        // Test 3: alg=none bypass check
        try {
          ctx.resetModules();
          const { verifyUserToken } = ctx.require('./authService.js');
          const noneToken = makeToken('none', { userId: 'admin', role: 'superadmin' }, '');
          let rejected = false;
          try {
            verifyUserToken(noneToken);
          } catch (e) {
            rejected = true;
          }
          results.push({
            testId: 't3',
            passed: rejected,
            expected: 'Reject unsigned alg:"none" token',
            actual: rejected ? 'Rejected unsigned token' : 'Accepted unsigned token',
          });
        } catch (err) {
          results.push({ testId: 't3', passed: false, error: err.message });
        }

        return results;
      }
    `,
    solutionFiles: [
      {
        filename: 'authService.js',
        content: `const jwt = require('jsonwebtoken');
const config = require('./config');

function verifyUserToken(token) {
  if (!token) {
    throw new Error('Token missing');
  }

  return jwt.verify(token, config.publicKey, {
    algorithms: ['RS256'],
  });
}

module.exports = { verifyUserToken };
`,
      },
      {
        filename: 'config.js',
        content: `module.exports = {
  publicKey: process.env.JWT_PUBLIC_KEY || '-----BEGIN PUBLIC KEY-----\\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8...\\n-----END PUBLIC KEY-----',
  hmacSecret: process.env.JWT_HMAC_SECRET || '',
};
`,
      },
    ],
  },

  'rev-005': {
    scenarioId: 'rev-005',
    executionMode: 'client_js',
    runtimeLanguage: 'javascript',
    testCases: [
      {
        id: 't1',
        title: 'dbPool-first startup initializes and passes metrics health check',
        description: 'Loading dbPool.js before metrics.js must not leave metrics holding an empty circular export {}.',
      },
      {
        id: 't2',
        title: 'userModel-first startup executes queries cleanly',
        description: 'Loading userModel.js -> metrics.js -> dbPool.js connects and runs findUserById without TypeError.',
        isRegressionCheck: true,
      },
    ],
    harnessCode: `
      async function runTests(ctx) {
        const results = [];

        // Test 1: Require dbPool first (triggers dbPool -> metrics -> dbPool cycle)
        try {
          ctx.resetModules();
          const dbPool = ctx.require('./dbPool.js');
          dbPool.connect('postgres://prod:5432/app');
          const metrics = ctx.require('./metrics.js');
          const health = metrics.getHealth();
          const passed = Boolean(health && Array.isArray(health.rows));
          results.push({
            testId: 't1',
            passed,
            expected: 'metrics.getHealth() returns { rows: [] } without circular export error',
            actual: JSON.stringify(health),
          });
        } catch (err) {
          results.push({
            testId: 't1',
            passed: false,
            expected: 'metrics.getHealth() returns { rows: [] }',
            actual: err.name + ': ' + err.message,
          });
        }

        // Test 2: Require userModel first
        try {
          ctx.resetModules();
          const userModel = ctx.require('./userModel.js');
          const dbPool = ctx.require('./dbPool.js');
          dbPool.connect('postgres://prod:5432/app');
          const userRes = await userModel.findUserById(7);
          const metrics = ctx.require('./metrics.js');
          const health = metrics.getHealth();
          const passed = Boolean(userRes && Array.isArray(userRes.rows) && health && Array.isArray(health.rows));
          results.push({
            testId: 't2',
            passed,
            expected: 'Both findUserById and getHealth execute cleanly',
            actual: JSON.stringify({ userRes, health }),
          });
        } catch (err) {
          results.push({ testId: 't2', passed: false, error: err.name + ': ' + err.message });
        }

        return results;
      }
    `,
    solutionFiles: [
      {
        filename: 'dbPool.js',
        content: `const { registerMetrics } = require('./metrics');

class DatabasePool {
  constructor() {
    this.isConnected = false;
  }

  connect(connectionString) {
    this.connectionString = connectionString;
    this.isConnected = true;
    registerMetrics(this);
  }

  query(sql, params) {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }
    return { rows: [] };
  }
}

const poolInstance = new DatabasePool();
module.exports = poolInstance;
`,
      },
      {
        filename: 'metrics.js',
        content: `let registeredPool = null;

function registerMetrics(poolRef) {
  registeredPool = poolRef;
}

function getHealth() {
  const pool = registeredPool || require('./dbPool');
  return pool.query('SELECT 1');
}

module.exports = { registerMetrics, getHealth };
`,
      },
      {
        filename: 'userModel.js',
        content: `const metrics = require('./metrics');
const pool = require('./dbPool');

async function findUserById(id) {
  return pool.query('SELECT * FROM users WHERE id = $1', [id]);
}

module.exports = { findUserById };
`,
      },
    ],
  },

  'rev-008': {
    scenarioId: 'rev-008',
    executionMode: 'client_js',
    runtimeLanguage: 'typescript',
    testCases: [
      {
        id: 't1',
        title: 'Happy path checkout completes without triggering release',
        description: 'When inventory, payment, and loyalty all succeed, order succeeds and release() is not invoked.',
        isRegressionCheck: true,
      },
      {
        id: 't2',
        title: 'Compensates orphaned inventory reservation when payment rejects late',
        description: 'If payment fails after inventory reserves (or simultaneously), inventorySvc.release(orderId) must run after settling.',
      },
    ],
    harnessCode: `
      async function runTests(ctx) {
        const results = [];
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
        const mod = ctx.require('./orderCoordinator.ts');
        const payload = { orderId: 'ord_99', userId: 'u_1', items: [{ sku: 'A1', qty: 2 }] };

        // Test 1
        try {
          let released = false;
          let charged = false;
          let deducted = false;
          await mod.processCheckout(
            payload,
            { reserve: async () => { await sleep(5); }, release: async () => { released = true; } },
            { charge: async () => { await sleep(5); charged = true; } },
            { deductPoints: async () => { await sleep(5); deducted = true; } }
          );
          const passed = charged && deducted && !released;
          results.push({
            testId: 't1',
            passed,
            expected: 'All 3 succeed and release() is not called',
            actual: \`charged=\${charged}, deducted=\${deducted}, released=\${released}\`,
          });
        } catch (err) {
          results.push({ testId: 't1', passed: false, error: err.message });
        }

        // Test 2: payment fails immediately while inventory reservation finishes slightly later
        try {
          let reserved = false;
          let released = false;
          let threw = false;

          try {
            await mod.processCheckout(
              payload,
              {
                reserve: async () => { await sleep(20); reserved = true; },
                release: async () => { released = true; reserved = false; },
              },
              {
                charge: async () => { await sleep(5); throw new Error('Card declined'); },
              },
              {
                deductPoints: async () => { await sleep(10); },
              }
            );
          } catch (e) {
            threw = true;
          }

          await sleep(30);
          const passed = threw && released && !reserved;
          results.push({
            testId: 't2',
            passed,
            expected: 'Throws error AND calls inventorySvc.release(orderId) after settling async tasks',
            actual: \`threw=\${threw}, released=\${released}, stillReserved=\${reserved}\`,
          });
        } catch (err) {
          results.push({ testId: 't2', passed: false, error: err.message });
        }

        return results;
      }
    `,
    solutionFiles: [
      {
        filename: 'orderCoordinator.ts',
        content: `export interface CheckoutPayload {
  orderId: string;
  userId: string;
  items: Array<{ sku: string; qty: number }>;
}

export async function processCheckout(
  payload: CheckoutPayload,
  inventorySvc: { reserve: (id: string, items: any[]) => Promise<void>; release: (id: string) => Promise<void> },
  paymentSvc: { charge: (id: string, user: string) => Promise<void> },
  loyaltySvc: { deductPoints: (user: string, pts: number) => Promise<void> }
): Promise<void> {
  const outcomes = await Promise.allSettled([
    inventorySvc.reserve(payload.orderId, payload.items),
    paymentSvc.charge(payload.orderId, payload.userId),
    loyaltySvc.deductPoints(payload.userId, 50),
  ]);

  const failures = outcomes.filter((o): o is PromiseRejectedResult => o.status === 'rejected');
  if (failures.length > 0) {
    if (outcomes[0].status === 'fulfilled') {
      await inventorySvc.release(payload.orderId);
    }
    throw failures[0].reason;
  }
}
`,
      },
    ],
  },

  'rev-010': {
    scenarioId: 'rev-010',
    executionMode: 'client_js',
    runtimeLanguage: 'typescript',
    testCases: [
      {
        id: 't1',
        title: 'Decodes standard 32-bit record IDs accurately',
        description: 'encodeCursor(10500) -> decodeCursor(...) === 10500.',
        isRegressionCheck: true,
      },
      {
        id: 't2',
        title: 'Preserves unsigned values above 2^31 - 1 without negative wraparound',
        description: 'decodeCursor(encodeCursor(2147483648)) must equal 2147483648, not -2147483648.',
      },
      {
        id: 't3',
        title: 'Handles 64-bit / Snowflake scale cursor IDs safely',
        description: 'decodeCursor(encodeCursor(900719925474099)) must equal 900719925474099.',
      },
    ],
    harnessCode: `
      async function runTests(ctx) {
        const results = [];
        const mod = ctx.require('./cursorCodec.ts');

        const cases = [
          { id: 't1', val: 10500 },
          { id: 't2', val: 2147483648 },
          { id: 't3', val: 900719925474099 },
        ];

        for (const c of cases) {
          try {
            const actual = mod.decodeCursor(mod.encodeCursor(c.val));
            results.push({
              testId: c.id,
              passed: actual === c.val,
              expected: String(c.val),
              actual: String(actual),
            });
          } catch (err) {
            results.push({ testId: c.id, passed: false, error: err.message });
          }
        }
        return results;
      }
    `,
    solutionFiles: [
      {
        filename: 'cursorCodec.ts',
        content: `export function encodeCursor(id: number): string {
  return Buffer.from(\`item_\${id}\`).toString('base64');
}

export function decodeCursor(cursorStr: string): number {
  const decoded = Buffer.from(cursorStr, 'base64').toString('utf8');
  const rawId = decoded.replace('item_', '');
  const parsed = Number.parseInt(rawId, 10);
  if (Number.isNaN(parsed)) {
    throw new Error('Invalid cursor');
  }
  return parsed;
}
`,
      },
    ],
  },

  'rev-012': {
    scenarioId: 'rev-012',
    executionMode: 'client_js',
    runtimeLanguage: 'javascript',
    testCases: [
      {
        id: 't1',
        title: 'Applies monotonically newer webhook events normally',
        description: 'Events arriving in timestamp order t=100 then t=200 update status to latest.',
        isRegressionCheck: true,
      },
      {
        id: 't2',
        title: 'Ignores delayed out-of-order older webhook events',
        description: 'When t=200 ACTIVE arrives first, a late t=100 SUSPENDED webhook must NOT overwrite ACTIVE.',
      },
    ],
    harnessCode: `
      async function runTests(ctx) {
        const results = [];
        const makeRes = () => ({ status: () => ({ json: (b) => b }) });

        // Test 1: In-order
        try {
          ctx.resetModules();
          const { handleIncomingWebhook } = ctx.require('./webhookHandler.js');
          const accountSvc = ctx.require('./accountService.js');
          await handleIncomingWebhook({ body: { accountId: 'acc_1', newStatus: 'PENDING', eventTimestamp: 100 } }, makeRes());
          await handleIncomingWebhook({ body: { accountId: 'acc_1', newStatus: 'ACTIVE', eventTimestamp: 200 } }, makeRes());
          const state = accountSvc.getAccountStatus('acc_1');
          results.push({
            testId: 't1',
            passed: state && state.status === 'ACTIVE',
            expected: 'status === "ACTIVE"',
            actual: JSON.stringify(state),
          });
        } catch (err) {
          results.push({ testId: 't1', passed: false, error: err.message });
        }

        // Test 2: Out-of-order stale event
        try {
          ctx.resetModules();
          const { handleIncomingWebhook } = ctx.require('./webhookHandler.js');
          const accountSvc = ctx.require('./accountService.js');
          await handleIncomingWebhook({ body: { accountId: 'acc_2', newStatus: 'ACTIVE', eventTimestamp: 2000 } }, makeRes());
          await handleIncomingWebhook({ body: { accountId: 'acc_2', newStatus: 'SUSPENDED', eventTimestamp: 1000 } }, makeRes());
          const state = accountSvc.getAccountStatus('acc_2');
          results.push({
            testId: 't2',
            passed: state && state.status === 'ACTIVE',
            expected: 'status remains "ACTIVE" (stale t=1000 ignored)',
            actual: JSON.stringify(state),
          });
        } catch (err) {
          results.push({ testId: 't2', passed: false, error: err.message });
        }

        return results;
      }
    `,
    solutionFiles: [
      {
        filename: 'webhookHandler.js',
        content: `const { updateAccountStatus } = require('./accountService');

async function handleIncomingWebhook(req, res) {
  const { accountId, newStatus, eventTimestamp } = req.body;

  await updateAccountStatus(accountId, newStatus, eventTimestamp);
  return res.status(200).json({ ok: true });
}

module.exports = { handleIncomingWebhook };
`,
      },
      {
        filename: 'accountService.js',
        content: `const db = new Map();

async function updateAccountStatus(accountId, newStatus, eventTimestamp = Date.now()) {
  const current = db.get(accountId) || { status: 'PENDING', lastUpdated: 0 };
  if (eventTimestamp <= current.lastUpdated) {
    return current;
  }
  const nextState = { status: newStatus, lastUpdated: eventTimestamp };
  db.set(accountId, nextState);
  return nextState;
}

function getAccountStatus(accountId) {
  return db.get(accountId);
}

module.exports = { updateAccountStatus, getAccountStatus };
`,
      },
    ],
  },

  'rev-014': {
    scenarioId: 'rev-014',
    executionMode: 'client_js',
    runtimeLanguage: 'javascript',
    testCases: [
      {
        id: 't1',
        title: 'Recursively merges legitimate nested configuration objects',
        description: 'Merges nested user fields while preserving unaffected sibling properties.',
        isRegressionCheck: true,
      },
      {
        id: 't2',
        title: 'Blocks __proto__ prototype pollution injection',
        description: 'Merging JSON containing "__proto__" must not pollute Object.prototype.',
      },
      {
        id: 't3',
        title: 'Blocks constructor.prototype pollution vector',
        description: 'Merging JSON containing "constructor" / "prototype" keys must be safely ignored.',
      },
    ],
    harnessCode: `
      async function runTests(ctx) {
        const results = [];
        const { deepMerge } = ctx.require('./deepMerge.js');

        // Test 1: Legit merge
        try {
          const out = deepMerge({ user: { name: 'Ada', role: 'dev' }, theme: 'dark' }, { user: { role: 'staff' } });
          const passed = out.user.name === 'Ada' && out.user.role === 'staff' && out.theme === 'dark';
          results.push({
            testId: 't1',
            passed,
            expected: '{"user":{"name":"Ada","role":"staff"},"theme":"dark"}',
            actual: JSON.stringify(out),
          });
        } catch (err) {
          results.push({ testId: 't1', passed: false, error: err.message });
        }

        // Test 2: __proto__
        try {
          delete Object.prototype.pollutedFlag;
          const payload = JSON.parse('{"__proto__": {"pollutedFlag": true}}');
          deepMerge({}, payload);
          const leaked = ({}).pollutedFlag === true;
          delete Object.prototype.pollutedFlag;
          results.push({
            testId: 't2',
            passed: !leaked,
            expected: '({}).pollutedFlag === undefined',
            actual: leaked ? 'VULNERABILITY: Object.prototype.pollutedFlag === true' : 'Blocked cleanly',
          });
        } catch (err) {
          delete Object.prototype.pollutedFlag;
          results.push({ testId: 't2', passed: false, error: err.message });
        }

        // Test 3: constructor.prototype
        try {
          delete Object.prototype.isAdminExploit;
          const payload = JSON.parse('{"constructor": {"prototype": {"isAdminExploit": true}}}');
          deepMerge({}, payload);
          const leaked = ({}).isAdminExploit === true;
          delete Object.prototype.isAdminExploit;
          results.push({
            testId: 't3',
            passed: !leaked,
            expected: '({}).isAdminExploit === undefined',
            actual: leaked ? 'VULNERABILITY: Object.prototype.isAdminExploit === true' : 'Blocked cleanly',
          });
        } catch (err) {
          delete Object.prototype.isAdminExploit;
          results.push({ testId: 't3', passed: false, error: err.message });
        }

        return results;
      }
    `,
    solutionFiles: [
      {
        filename: 'deepMerge.js',
        content: `function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

const UNSAFE_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (UNSAFE_KEYS.has(key)) {
      continue;
    }
    if (isObject(source[key])) {
      if (!Object.prototype.hasOwnProperty.call(target, key) || !isObject(target[key])) {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

module.exports = { deepMerge };
`,
      },
    ],
  },

  'rev-017': {
    scenarioId: 'rev-017',
    executionMode: 'client_js',
    runtimeLanguage: 'typescript',
    testCases: [
      {
        id: 't1',
        title: 'Observes element dimensions and updates hook state on resize',
        description: 'Hook subscribes to ResizeObserver and emits updated width/height.',
        isRegressionCheck: true,
      },
      {
        id: 't2',
        title: 'Disconnects ResizeObserver when React component unmounts',
        description: 'Mounting and unmounting 5 instances must leave 0 active ResizeObservers.',
      },
    ],
    harnessCode: `
      async function runTests(ctx) {
        const results = [];

        function createReactEnv() {
          let activeObservers = 0;
          let stateVal;
          let effectCleanups = [];
          let activeCallbacks = [];

          class MockResizeObserver {
            constructor(cb) {
              this.cb = cb;
              this.disconnected = false;
            }
            observe(el) {
              activeObservers++;
              activeCallbacks.push({ observer: this, cb: this.cb });
            }
            disconnect() {
              if (!this.disconnected) {
                this.disconnected = true;
                activeObservers = Math.max(0, activeObservers - 1);
              }
            }
          }

          const ReactHooks = {
            useState(init) {
              stateVal = init;
              return [stateVal, (next) => { stateVal = next; }];
            },
            useEffect(fn) {
              const cleanup = fn();
              if (typeof cleanup === 'function') {
                effectCleanups.push(cleanup);
              }
            }
          };

          return {
            ReactHooks,
            MockResizeObserver,
            triggerResize(w, h) {
              activeCallbacks.forEach(({ observer, cb }) => {
                if (!observer.disconnected) cb([{ contentRect: { width: w, height: h } }]);
              });
            },
            unmountAll() {
              effectCleanups.forEach((fn) => fn());
              effectCleanups = [];
            },
            getState: () => stateVal,
            getActiveObservers: () => activeObservers,
          };
        }

        // Test 1
        try {
          ctx.resetModules();
          const env = createReactEnv();
          ctx.setGlobal('useState', env.ReactHooks.useState);
          ctx.setGlobal('useEffect', env.ReactHooks.useEffect);
          ctx.setGlobal('ResizeObserver', env.MockResizeObserver);
          const { useElementSize } = ctx.require('./useElementSize.ts');
          useElementSize({ current: { tagName: 'DIV' } });
          env.triggerResize(640, 320);
          const s = env.getState();
          results.push({
            testId: 't1',
            passed: s.width === 640 && s.height === 320,
            expected: '{ width: 640, height: 320 }',
            actual: JSON.stringify(s),
          });
        } catch (err) {
          results.push({ testId: 't1', passed: false, error: err.message });
        }

        // Test 2: Mount/Unmount 5 times
        try {
          ctx.resetModules();
          const env = createReactEnv();
          ctx.setGlobal('useState', env.ReactHooks.useState);
          ctx.setGlobal('useEffect', env.ReactHooks.useEffect);
          ctx.setGlobal('ResizeObserver', env.MockResizeObserver);
          const { useElementSize } = ctx.require('./useElementSize.ts');
          for (let i = 0; i < 5; i++) {
            useElementSize({ current: { tagName: 'DIV' } });
          }
          env.unmountAll();
          const remaining = env.getActiveObservers();
          results.push({
            testId: 't2',
            passed: remaining === 0,
            expected: '0 active ResizeObservers after unmount',
            actual: \`\${remaining} leaked ResizeObserver(s) still active\`,
          });
        } catch (err) {
          results.push({ testId: 't2', passed: false, error: err.message });
        }

        return results;
      }
    `,
    solutionFiles: [
      {
        filename: 'useElementSize.ts',
        content: `import { useState, useEffect, RefObject } from 'react';

export function useElementSize(elementRef: RefObject<HTMLElement>) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [elementRef]);

  return size;
}
`,
      },
    ],
  },
};
