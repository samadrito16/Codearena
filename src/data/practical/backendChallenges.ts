import { PracticalChallenge } from '../../types/practicalCoding';

export const backendChallenges: PracticalChallenge[] = [
  // ========================================================
  // BACKEND 1: Token Bucket HTTP Rate Limiter (Canonical)
  // ========================================================
  {
    id: 'rate-limiter-middleware',
    slug: 'rate-limiter-middleware',
    title: 'Token Bucket HTTP Rate Limiter',
    track: 'backend_api',
    difficulty: 'Intermediate',
    roleTarget: 'Backend Engineer',
    estimatedMinutes: 35,
    tags: ['Backend', 'Middleware', 'Rate Limiting', 'Algorithms', 'Security'],
    description:
      'Design and implement a production-grade Token Bucket HTTP Rate Limiter middleware in TypeScript/Node.js. The limiter must enforce request burst limits per client IP, smoothly refill tokens over time, and return HTTP 429 Too Many Requests with a Retry-After header when exhausted.',
    requirements: [
      'Implement `class TokenBucketRateLimiter` with constructor parameters `capacity: number` and `refillRatePerSec: number`.',
      'The `allowRequest(clientId: string): { allowed: boolean; retryAfterSeconds?: number }` method returns true if tokens remain, decrementing by 1.',
      'Refill tokens dynamically on demand based on elapsed time (`elapsedSeconds * refillRatePerSec`), capped at capacity.',
      'Return accurate `retryAfterSeconds` indicating how many seconds until the next token becomes available when allowed is false.',
      'Clean up stale client records to avoid in-memory memory leaks.',
    ],
    files: [
      {
        name: 'rateLimiter.ts',
        language: 'typescript',
        content: `export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

export class TokenBucketRateLimiter {
  capacity: number;
  refillRatePerSec: number;
  buckets = new Map<string, any>();

  constructor(capacity: number, refillRatePerSec: number) {
    this.capacity = capacity;
    this.refillRatePerSec = refillRatePerSec;
  }

  public allowRequest(clientId: string): any {
    // TODO:
    // 1. Retrieve or initialize client's bucket with full capacity
    // 2. Refill tokens based on (Date.now() - lastRefillMs)
    // 3. If tokens >= 1, decrement and return { allowed: true }
    // 4. Otherwise, calculate retryAfterSeconds and return { allowed: false, retryAfterSeconds }
    return { allowed: true };
  }
}
`,
      },
    ],
    testCases: [
      {
        id: 'tc-burst-capacity',
        title: 'Allows bursts up to capacity',
        description: 'Sends capacity requests and verifies all are allowed',
        assertionType: 'http_status',
      },
      {
        id: 'tc-block-overflow',
        title: 'Blocks requests once capacity is exhausted',
        description: 'Sends capacity + 1 request and verifies allowed is false with retryAfterSeconds',
        assertionType: 'http_status',
      },
    ],
    testRunnerScript: `(async function testRateLimiter(exportsObj) {
  const results = [];
  const LimiterClass = (exportsObj && exportsObj.TokenBucketRateLimiter) || TokenBucketRateLimiter;
  const capacity = 3;
  const refillRate = 1;
  const limiter = new LimiterClass(capacity, refillRate);

  // 1. Burst
  let allBurstAllowed = true;
  for (let i = 0; i < capacity; i++) {
    if (!limiter.allowRequest('client-1').allowed) {
      allBurstAllowed = false;
      break;
    }
  }
  results.push({
    testId: 'tc-burst-capacity',
    title: 'Allows bursts up to capacity',
    passed: allBurstAllowed
  });

  // 2. Block
  const overflow = limiter.allowRequest('client-1');
  const blocked = overflow.allowed === false && typeof overflow.retryAfterSeconds === 'number';
  results.push({
    testId: 'tc-block-overflow',
    title: 'Blocks requests once capacity is exhausted',
    passed: blocked,
    expected: 'allowed: false with retryAfterSeconds',
    actual: JSON.stringify(overflow)
  });

  return results;
})`,
    solutionFiles: [
      {
        name: 'rateLimiter.ts',
        language: 'typescript',
        content: `export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

export class TokenBucketRateLimiter {
  capacity: number;
  refillRatePerSec: number;
  buckets = new Map<string, any>();

  constructor(capacity: number, refillRatePerSec: number) {
    this.capacity = capacity;
    this.refillRatePerSec = refillRatePerSec;
  }

  public allowRequest(clientId: string): any {
    const now = Date.now();
    let bucket = this.buckets.get(clientId);

    if (!bucket) {
      bucket = { tokens: this.capacity, lastRefillMs: now };
      this.buckets.set(clientId, bucket);
    } else {
      const elapsedSec = (now - bucket.lastRefillMs) / 1000;
      const tokensToAdd = elapsedSec * this.refillRatePerSec;
      bucket.tokens = Math.min(this.capacity, bucket.tokens + tokensToAdd);
      bucket.lastRefillMs = now;
    }

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return { allowed: true };
    }

    const missingTokens = 1 - bucket.tokens;
    const retryAfterSeconds = Math.ceil(missingTokens / this.refillRatePerSec);
    return { allowed: false, retryAfterSeconds };
  }
}
`,
      },
    ],
    editorialMarkdown: `### Architectural Walkthrough: Token Bucket Algorithm

The **Token Bucket Algorithm** is standard across Stripe, AWS API Gateway, and Cloudflare.
- **Lazy Refill vs Background Ticker**: Rather than running interval timers for thousands of client IPs (which burns memory and CPU), tokens are refilled on-demand whenever a request arrives using \`(now - lastRefillMs) / 1000 * rate\`.`,
  },

  // ========================================================
  // BACKEND 2: JWT Authentication & Refresh Token Rotation [NEW]
  // ========================================================
  {
    id: 'jwt-auth-refresh-middleware',
    slug: 'jwt-auth-refresh-middleware',
    title: 'JWT Authentication & Refresh Token Rotation Middleware',
    track: 'backend_api',
    difficulty: 'Intermediate',
    roleTarget: 'Backend Engineer',
    estimatedMinutes: 35,
    tags: ['JWT', 'Authentication', 'Security', 'Middleware', 'Node.js', 'Tokens'],
    description:
      'Implement a production-grade JWT authentication and refresh token rotation service. Issues short-lived access tokens and single-use rotating refresh tokens, verifies cryptographically signed tokens, and guards against replay attacks by invalidating compromised token families.',
    requirements: [
      'Implement `class JWTAuthService` with `signTokens(user)` and `verifyAccessToken(token)`.',
      'Tokens must encode `{ exp, iat, sub }` with signature validation.',
      '`verifyAccessToken(token)`: Validates signature and expiration; returns `{ valid: true, payload }` or `{ valid: false, error }`.',
      '`rotateRefreshToken(oldRefreshToken)`: Validates refresh token, invalidates it in a revocation registry, and issues a fresh access and refresh token pair.',
      'Replay Protection: If an already-revoked refresh token is presented, mark the entire user session compromised and reject with `{ success: false, error: "REPLAY_ATTACK_DETECTED" }`.',
    ],
    files: [
      {
        name: 'authService.ts',
        language: 'typescript',
        content: `export interface UserPayload {
  userId: string;
  email: string;
  role: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface VerifyResult {
  valid: boolean;
  payload?: any;
  error?: string;
}

export class JWTAuthService {
  secretKey: string;
  revokedTokens = new Set<string>();
  activeRefreshTokens = new Map<string, any>();

  constructor(secretKey: string = 'super-secret-prismcode-key') {
    this.secretKey = secretKey;
  }

  // Simple Base64URL HMAC-like signature simulator for client sandbox
  private createSignature(data: string): string {
    let hash = 0;
    const combined = data + '|' + this.secretKey;
    for (let i = 0; i < combined.length; i++) {
      hash = (hash << 5) - hash + combined.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(36);
  }

  public signTokens(user: any): any {
    // TODO:
    // 1. Issue access token with short expiry (e.g. 15 minutes)
    // 2. Issue refresh token and track in activeRefreshTokens
    // 3. Return { accessToken, refreshToken }
    return { accessToken: '', refreshToken: '' };
  }

  public verifyAccessToken(token: string): any {
    // TODO:
    // 1. Split token into payload and signature
    // 2. Verify signature matches secretKey
    // 3. Check expiration
    return { valid: false, error: 'NOT_IMPLEMENTED' };
  }

  public rotateRefreshToken(oldRefreshToken: string): any {
    // TODO:
    // 1. Check if token is in revokedTokens -> if so, return error: REPLAY_ATTACK_DETECTED
    // 2. Check if token exists in activeRefreshTokens
    // 3. Revoke old token and issue new TokenPair
    return { success: false, error: 'NOT_IMPLEMENTED' };
  }
}
`,
      },
    ],
    testCases: [
      {
        id: 'tc-jwt-valid-auth',
        title: 'Signs and verifies valid access tokens',
        description: 'Issues tokens for a user payload and verifies signature matches',
        assertionType: 'http_status',
      },
      {
        id: 'tc-jwt-reject-tampered',
        title: 'Rejects tampered or expired tokens',
        description: 'Modifies signature or payload and verifies rejection',
        assertionType: 'http_status',
      },
      {
        id: 'tc-jwt-token-rotation',
        title: 'Rotates refresh tokens and revokes prior token',
        description: 'Refreshes session, issues new token pair, and confirms old token is revoked',
        assertionType: 'http_status',
      },
      {
        id: 'tc-jwt-replay-protection',
        title: 'Detects token reuse and flags replay attack',
        description: 'Submits an already-revoked refresh token and asserts REPLAY_ATTACK_DETECTED',
        assertionType: 'http_status',
      },
    ],
    testRunnerScript: `(async function testJwtAuth(exportsObj) {
  const results = [];
  const ServiceClass = (exportsObj && exportsObj.JWTAuthService) || JWTAuthService;
  const auth = new ServiceClass('test-secret-salt-123');

  const testUser = { userId: 'usr-42', email: 'dev@prismcode.dev', role: 'admin' };
  const tokens = auth.signTokens(testUser);

  // 1. Valid auth
  const validCheck = auth.verifyAccessToken(tokens.accessToken);
  const isValid = validCheck.valid === true && validCheck.payload?.userId === 'usr-42';
  results.push({
    testId: 'tc-jwt-valid-auth',
    title: 'Signs and verifies valid access tokens',
    passed: isValid,
    expected: 'valid: true with matching userId',
    actual: JSON.stringify(validCheck)
  });

  // 2. Tampered token
  const tamperedToken = tokens.accessToken + '-tampered';
  const tamperedCheck = auth.verifyAccessToken(tamperedToken);
  const isRejected = tamperedCheck.valid === false;
  results.push({
    testId: 'tc-jwt-reject-tampered',
    title: 'Rejects tampered or expired tokens',
    passed: isRejected,
    expected: 'valid: false',
    actual: JSON.stringify(tamperedCheck)
  });

  // 3. Rotation
  const rotation = auth.rotateRefreshToken(tokens.refreshToken);
  const rotatedOk = rotation.success === true && Boolean(rotation.tokens?.accessToken) && rotation.tokens?.refreshToken !== tokens.refreshToken;
  results.push({
    testId: 'tc-jwt-token-rotation',
    title: 'Rotates refresh tokens and revokes prior token',
    passed: rotatedOk,
    expected: 'success: true with new distinct refreshToken',
    actual: JSON.stringify(rotation)
  });

  // 4. Replay attack detection
  const replayAttempt = auth.rotateRefreshToken(tokens.refreshToken);
  const replayCaught = replayAttempt.success === false && replayAttempt.error === 'REPLAY_ATTACK_DETECTED';
  results.push({
    testId: 'tc-jwt-replay-protection',
    title: 'Detects token reuse and flags replay attack',
    passed: replayCaught,
    expected: 'error: REPLAY_ATTACK_DETECTED',
    actual: JSON.stringify(replayAttempt)
  });

  return results;
})`,
    solutionFiles: [
      {
        name: 'authService.ts',
        language: 'typescript',
        content: `export interface UserPayload {
  userId: string;
  email: string;
  role: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface VerifyResult {
  valid: boolean;
  payload?: any;
  error?: string;
}

export class JWTAuthService {
  secretKey: string;
  revokedTokens = new Set<string>();
  activeRefreshTokens = new Map<string, any>();

  constructor(secretKey: string = 'super-secret-prismcode-key') {
    this.secretKey = secretKey;
  }

  private createSignature(data: string): string {
    let hash = 0;
    const combined = data + '|' + this.secretKey;
    for (let i = 0; i < combined.length; i++) {
      hash = (hash << 5) - hash + combined.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(36);
  }

  public signTokens(user: any): any {
    const now = Date.now();
    const accessPayload = JSON.stringify({
      ...user,
      iat: now,
      exp: now + 15 * 60 * 1000,
      type: 'access'
    });
    const accessSig = this.createSignature(accessPayload);
    const accessToken = btoa(accessPayload) + '.' + accessSig;

    const refreshPayload = JSON.stringify({
      userId: user.userId,
      iat: now,
      exp: now + 7 * 24 * 60 * 60 * 1000,
      type: 'refresh',
      nonce: Math.random().toString(36).substring(2)
    });
    const refreshSig = this.createSignature(refreshPayload);
    const refreshToken = btoa(refreshPayload) + '.' + refreshSig;

    this.activeRefreshTokens.set(refreshToken, { ...user });

    return { accessToken, refreshToken };
  }

  public verifyAccessToken(token: string): any {
    if (!token || !token.includes('.')) {
      return { valid: false, error: 'INVALID_TOKEN_FORMAT' };
    }

    const parts = token.split('.');
    const encodedPayload = parts[0];
    const signature = parts[1];

    try {
      const payloadStr = atob(encodedPayload);
      const expectedSig = this.createSignature(payloadStr);

      if (signature !== expectedSig) {
        return { valid: false, error: 'SIGNATURE_MISMATCH' };
      }

      const payload = JSON.parse(payloadStr);
      if (Date.now() > payload.exp) {
        return { valid: false, error: 'TOKEN_EXPIRED' };
      }

      return { valid: true, payload };
    } catch (e) {
      return { valid: false, error: 'MALFORMED_TOKEN' };
    }
  }

  public rotateRefreshToken(oldRefreshToken: string): any {
    if (this.revokedTokens.has(oldRefreshToken)) {
      return { success: false, error: 'REPLAY_ATTACK_DETECTED' };
    }

    const user = this.activeRefreshTokens.get(oldRefreshToken);
    if (!user) {
      return { success: false, error: 'INVALID_REFRESH_TOKEN' };
    }

    this.activeRefreshTokens.delete(oldRefreshToken);
    this.revokedTokens.add(oldRefreshToken);

    const newTokens = this.signTokens(user);
    return { success: true, tokens: newTokens };
  }
}
`,
      },
    ],
    editorialMarkdown: `### Architectural Walkthrough: Refresh Token Rotation & Replay Defense

#### 1. The Token Rotation Lifecycle
Storing long-lived JWTs in browser local storage exposes users to XSS token theft. **Refresh Token Rotation (RTR)** provides bank-grade session security:
- **Short-Lived Access Token (15 mins)**: Used for API calls; compromise window is minimal.
- **Single-Use Refresh Token (7 days)**: Sent exclusively to \`/auth/refresh\`. Once exchanged, the old refresh token is immediately burned.

#### 2. Replay Attack Detection (Token Families)
If an attacker intercepts a refresh token and uses it *after* the legitimate client has already rotated it:
1. The server checks the revocation blacklist.
2. Finding the token present immediately triggers the **Replay Attack Alarm**.
3. All sessions associated with that token family/user are terminated immediately, forcing re-authentication.`,
  },

  // ========================================================
  // BACKEND 3: In-Memory LRU Cache with TTL Expiry [NEW]
  // ========================================================
  {
    id: 'lru-cache-ttl',
    slug: 'lru-cache-ttl',
    title: 'In-Memory LRU Cache with TTL Expiry & O(1) Operations',
    track: 'backend_api',
    difficulty: 'Advanced',
    roleTarget: 'Backend Engineer',
    estimatedMinutes: 40,
    tags: ['Cache', 'Data Structures', 'Doubly Linked List', 'Hash Map', 'TTL', 'Algorithms'],
    description:
      'Design and build an in-memory Least Recently Used (LRU) Cache supporting Time-to-Live (TTL) expiration. All `get` and `put` operations must operate in strict O(1) amortized time complexity using a Doubly Linked List paired with a Hash Map.',
    requirements: [
      'Implement `class LRUCache` with constructor `(capacity: number, defaultTtlMs: number)`.',
      '`put(key: any, value: any, ttlMs?: number): void`: Inserts or updates key. If capacity exceeded, evicts the least recently used entry in $O(1)$.',
      '`get(key: any): any | null`: Returns value and marks entry as Most Recently Used (MRU). If entry has expired past its TTL, purges it and returns `null`.',
      '`pruneExpired(): number`: Actively scans and deletes all stale entries, returning the count of purged items.',
      '`size`: Getter returning the count of currently active, unexpired keys.',
      'Maintain strict $O(1)$ operations for `get` and `put` using dummy head/tail sentinel nodes.',
    ],
    files: [
      {
        name: 'lruCache.ts',
        language: 'typescript',
        content: `export class LRUCache {
  capacity: number;
  defaultTtlMs: number;
  map = new Map<any, any>();
  head: any;
  tail: any;

  constructor(capacity: number, defaultTtlMs: number = 60000) {
    this.capacity = capacity;
    this.defaultTtlMs = defaultTtlMs;

    // Sentinel dummy nodes
    this.head = { key: null, value: null, expiresAt: 0, prev: null, next: null };
    this.tail = { key: null, value: null, expiresAt: 0, prev: null, next: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  public get size(): number {
    return this.map.size;
  }

  public get(key: any): any {
    // TODO:
    // 1. Lookup in map; return null if missing
    // 2. Check if expired; if so, remove node and return null
    // 3. Move node to head (MRU)
    // 4. Return node.value
    return null;
  }

  public put(key: any, value: any, ttlMs?: number): void {
    // TODO:
    // 1. If key exists, update value/ttl and move to head
    // 2. If new key, check capacity; if full, evict tail.prev (LRU)
    // 3. Insert new node at head and register in map
  }

  public pruneExpired(): number {
    // TODO:
    // Iterate through cache and remove nodes where Date.now() > expiresAt
    return 0;
  }
}
`,
      },
    ],
    testCases: [
      {
        id: 'tc-lru-capacity-eviction',
        title: 'Evicts least recently used item at capacity',
        description: 'Fills cache to capacity, adds one more item, and verifies LRU item was evicted',
        assertionType: 'js_return',
      },
      {
        id: 'tc-lru-recency-update',
        title: 'get() updates recency and prevents eviction',
        description: 'Reads oldest item before inserting, asserting it is spared from eviction',
        assertionType: 'js_return',
      },
      {
        id: 'tc-lru-ttl-expiration',
        title: 'Lazily purges expired items on get()',
        description: 'Sets item with short TTL, waits for expiry, and asserts get() returns null',
        assertionType: 'js_return',
      },
      {
        id: 'tc-lru-explicit-prune',
        title: 'pruneExpired() actively sweeps stale entries',
        description: 'Fills expired entries and confirms pruneExpired() returns accurate purge count',
        assertionType: 'js_return',
      },
    ],
    testRunnerScript: `(async function testLruCache(exportsObj) {
  const results = [];
  const CacheClass = (exportsObj && exportsObj.LRUCache) || LRUCache;

  // 1. Capacity Eviction
  const cache = new CacheClass(3, 100000);
  cache.put('a', 1);
  cache.put('b', 2);
  cache.put('c', 3);
  cache.put('d', 4); // should evict 'a'

  const aEvicted = cache.get('a') === null && cache.get('b') === 2 && cache.size === 3;
  results.push({
    testId: 'tc-lru-capacity-eviction',
    title: 'Evicts least recently used item at capacity',
    passed: aEvicted,
    expected: 'key a evicted, size === 3',
    actual: 'get(a)=' + cache.get('a') + ', size=' + cache.size
  });

  // 2. Recency Update
  const cache2 = new CacheClass(3, 100000);
  cache2.put('x', 10);
  cache2.put('y', 20);
  cache2.put('z', 30);
  cache2.get('x'); // elevates 'x' to MRU; 'y' is now LRU
  cache2.put('w', 40); // should evict 'y'

  const yEvictedAndXPreserved = cache2.get('y') === null && cache2.get('x') === 10;
  results.push({
    testId: 'tc-lru-recency-update',
    title: 'get() updates recency and prevents eviction',
    passed: yEvictedAndXPreserved,
    expected: 'key y evicted, key x spared',
    actual: 'get(y)=' + cache2.get('y') + ', get(x)=' + cache2.get('x')
  });

  // 3. TTL Expiration
  const cache3 = new CacheClass(5, 50); // 50ms TTL
  cache3.put('fast', 'hello', 50);
  await new Promise((r) => setTimeout(r, 70));
  const expiredVal = cache3.get('fast');
  const ttlPassed = expiredVal === null;

  results.push({
    testId: 'tc-lru-ttl-expiration',
    title: 'Lazily purges expired items on get()',
    passed: ttlPassed,
    expected: 'null after TTL elapsed',
    actual: String(expiredVal)
  });

  // 4. Prune Expired
  const cache4 = new CacheClass(10, 30);
  cache4.put('e1', 1, 30);
  cache4.put('e2', 2, 30);
  cache4.put('fresh', 3, 50000);
  await new Promise((r) => setTimeout(r, 50));
  const purgedCount = cache4.pruneExpired();
  const prunePassed = purgedCount === 2 && cache4.size === 1;

  results.push({
    testId: 'tc-lru-explicit-prune',
    title: 'pruneExpired() actively sweeps stale entries',
    passed: prunePassed,
    expected: 'purgedCount: 2, size: 1',
    actual: 'purged=' + purgedCount + ', size=' + cache4.size
  });

  return results;
})`,
    solutionFiles: [
      {
        name: 'lruCache.ts',
        language: 'typescript',
        content: `export class LRUCache {
  capacity: number;
  defaultTtlMs: number;
  map = new Map<any, any>();
  head: any;
  tail: any;

  constructor(capacity: number, defaultTtlMs: number = 60000) {
    this.capacity = capacity;
    this.defaultTtlMs = defaultTtlMs;

    this.head = { key: null, value: null, expiresAt: 0, prev: null, next: null };
    this.tail = { key: null, value: null, expiresAt: 0, prev: null, next: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  public get size(): number {
    return this.map.size;
  }

  private removeNode(node: any): void {
    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
    node.prev = null;
    node.next = null;
  }

  private addNodeToHead(node: any): void {
    node.next = this.head.next;
    node.prev = this.head;
    if (this.head.next) {
      this.head.next.prev = node;
    }
    this.head.next = node;
  }

  public get(key: any): any {
    const node = this.map.get(key);
    if (!node) return null;

    if (Date.now() > node.expiresAt) {
      this.removeNode(node);
      this.map.delete(key);
      return null;
    }

    this.removeNode(node);
    this.addNodeToHead(node);
    return node.value;
  }

  public put(key: any, value: any, ttlMs?: number): void {
    const now = Date.now();
    const expiresAt = now + (typeof ttlMs === 'number' ? ttlMs : this.defaultTtlMs);

    const existing = this.map.get(key);
    if (existing) {
      existing.value = value;
      existing.expiresAt = expiresAt;
      this.removeNode(existing);
      this.addNodeToHead(existing);
      return;
    }

    if (this.map.size >= this.capacity) {
      const lruNode = this.tail.prev;
      if (lruNode && lruNode !== this.head) {
        this.removeNode(lruNode);
        this.map.delete(lruNode.key);
      }
    }

    const newNode = {
      key: key,
      value: value,
      expiresAt: expiresAt,
      prev: null,
      next: null
    };

    this.addNodeToHead(newNode);
    this.map.set(key, newNode);
  }

  public pruneExpired(): number {
    const now = Date.now();
    let count = 0;
    const toDelete: any[] = [];

    for (const [key, node] of this.map.entries()) {
      if (now > node.expiresAt) {
        toDelete.push(key);
      }
    }

    for (const key of toDelete) {
      const node = this.map.get(key);
      if (node) {
        this.removeNode(node);
        this.map.delete(key);
        count++;
      }
    }

    return count;
  }
}
`,
      },
    ],
    editorialMarkdown: `### Architectural Walkthrough: O(1) LRU Cache with Sentinel Nodes

#### 1. Why a Doubly Linked List + Map?
- A standard JavaScript \`Map\` or \`Object\` provides $O(1)$ lookups, but finding and evicting the least recently used element would require scanning all elements ($O(N)$).
- An Array provides order, but splicing an element on \`get()\` takes $O(N)$.
- Combining a **Doubly Linked List** with a **Hash Map** allows:
  - $O(1)$ node lookup via Map reference.
  - $O(1)$ node removal and unlinking from any position in the list.
  - $O(1)$ node insertion at the front (MRU).

#### 2. The Power of Sentinel (Dummy) Nodes
By initializing \`head\` and \`tail\` as permanent sentinel nodes:
\`\`\`ts
this.head.next = this.tail;
this.tail.prev = this.head;
\`\`\`
We eliminate null-pointer edge cases when the list is empty or has only one element. Adding to head or removing from tail never requires checking \`if (head === null)\`.`,
  },

  // ========================================================
  // BACKEND 4: Event-Driven Webhook Delivery Queue [NEW]
  // ========================================================
  {
    id: 'webhook-retry-backoff',
    slug: 'webhook-retry-backoff',
    title: 'Event-Driven Webhook Delivery Queue with Exponential Backoff',
    track: 'backend_api',
    difficulty: 'Advanced',
    roleTarget: 'Backend Engineer',
    estimatedMinutes: 40,
    tags: ['Webhooks', 'Queue', 'Exponential Backoff', 'Jitter', 'Resilience', 'Distributed Systems'],
    description:
      'Build a resilient event-driven webhook delivery queue. Manages dispatched webhooks, applies exponential backoff with full jitter to protect downstream receivers during outages, and cleanly moves repeatedly failing webhooks to a Dead Letter Queue (DLQ).',
    requirements: [
      'Implement `class WebhookDispatcher` with configuration `{ maxAttempts: number, baseDelayMs: number, maxDelayMs: number }`.',
      '`enqueue(url: string, payload: any): any`: Creates and stores a pending webhook job.',
      '`calculateBackoff(attempt: number): number`: Computes backoff delay using formula: $\\min(\\text{maxDelay}, \\text{baseDelay} \\times 2^{\\text{attempt}}) + \\text{jitter}$.',
      '`processJob(jobId: string, sender: any): Promise<any>`: Attempts delivery; on 2xx marks `SUCCESS`, on 5xx or network error schedules next retry.',
      'When `attempts >= maxAttempts`, transitions job status to `DEAD_LETTER` with error log.',
      '`getStats()`: Returns summary `{ pending: number, success: number, deadLetter: number }`.',
    ],
    files: [
      {
        name: 'webhookQueue.ts',
        language: 'typescript',
        content: `export class WebhookDispatcher {
  config: any;
  jobs = new Map<string, any>();

  constructor(config: any = { maxAttempts: 4, baseDelayMs: 100, maxDelayMs: 5000 }) {
    this.config = config;
  }

  public enqueue(url: string, payload: any): any {
    const job = {
      id: 'job_' + Math.random().toString(36).substring(2, 9),
      url: url,
      payload: payload,
      status: 'PENDING',
      attempts: 0
    };
    this.jobs.set(job.id, job);
    return job;
  }

  public calculateBackoff(attempt: number): number {
    // TODO:
    // Compute exponential delay with jitter:
    // exp = min(maxDelayMs, baseDelayMs * (2 ** attempt))
    // delay = exp + Math.random() * (exp * 0.2)
    return 100;
  }

  public async processJob(jobId: string, sender: any): any {
    const job = this.jobs.get(jobId);
    if (!job) throw new Error('Job not found');

    // TODO:
    // 1. Increment job.attempts
    // 2. Call sender(job.url, job.payload)
    // 3. If response.status is 2xx (200-299), set status = 'SUCCESS'
    // 4. If status is >= 500 or throws:
    //    - If job.attempts >= config.maxAttempts -> status = 'DEAD_LETTER'
    //    - Else status = 'RETRY_SCHEDULED' and compute nextRetryAt
    return job;
  }

  public getStats(): any {
    let pending = 0;
    let success = 0;
    let deadLetter = 0;

    for (const job of this.jobs.values()) {
      if (job.status === 'PENDING' || job.status === 'RETRY_SCHEDULED') pending++;
      else if (job.status === 'SUCCESS') success++;
      else if (job.status === 'DEAD_LETTER') deadLetter++;
    }

    return { pending, success, deadLetter };
  }
}
`,
      },
    ],
    testCases: [
      {
        id: 'tc-webhook-immediate-success',
        title: 'Delivers immediately on 200 OK',
        description: 'Processes job with successful 200 endpoint, asserting status is SUCCESS and attempt is 1',
        assertionType: 'js_return',
      },
      {
        id: 'tc-webhook-backoff-growth',
        title: 'Calculates exponential backoff delay growth',
        description: 'Verifies backoff delays increase exponentially across successive failure attempts',
        assertionType: 'js_return',
      },
      {
        id: 'tc-webhook-dead-letter-exhaustion',
        title: 'Routes to Dead Letter Queue after max attempts',
        description: 'Simulates repeated 500 server errors and verifies transition to DEAD_LETTER',
        assertionType: 'js_return',
      },
    ],
    testRunnerScript: `(async function testWebhookQueue(exportsObj) {
  const results = [];
  const DispatcherClass = (exportsObj && exportsObj.WebhookDispatcher) || WebhookDispatcher;
  const dispatcher = new DispatcherClass({ maxAttempts: 3, baseDelayMs: 50, maxDelayMs: 2000 });

  // 1. Immediate Success
  const job1 = dispatcher.enqueue('https://api.partner.com/webhook', { event: 'order.placed' });
  const mockSuccessSender = async () => ({ status: 200 });
  const processed1 = await dispatcher.processJob(job1.id, mockSuccessSender);

  const immediatePassed = processed1.status === 'SUCCESS' && processed1.attempts === 1;
  results.push({
    testId: 'tc-webhook-immediate-success',
    title: 'Delivers immediately on 200 OK',
    passed: immediatePassed,
    expected: 'status: SUCCESS, attempts: 1',
    actual: 'status: ' + processed1.status + ', attempts: ' + processed1.attempts
  });

  // 2. Backoff Growth
  const delay0 = dispatcher.calculateBackoff(0);
  const delay1 = dispatcher.calculateBackoff(1);
  const delay2 = dispatcher.calculateBackoff(2);
  const backoffGrows = delay1 > delay0 && delay2 > delay1;

  results.push({
    testId: 'tc-webhook-backoff-growth',
    title: 'Calculates exponential backoff delay growth',
    passed: backoffGrows,
    expected: 'delay0 < delay1 < delay2',
    actual: delay0 + ' < ' + delay1 + ' < ' + delay2
  });

  // 3. Dead Letter Exhaustion
  const job2 = dispatcher.enqueue('https://api.failing.com/webhook', { event: 'payment.failed' });
  const mockFailingSender = async () => ({ status: 500 });

  await dispatcher.processJob(job2.id, mockFailingSender); // attempt 1
  await dispatcher.processJob(job2.id, mockFailingSender); // attempt 2
  const finalJob = await dispatcher.processJob(job2.id, mockFailingSender); // attempt 3 -> DLQ

  const dlqPassed = finalJob.status === 'DEAD_LETTER' && finalJob.attempts === 3;
  results.push({
    testId: 'tc-webhook-dead-letter-exhaustion',
    title: 'Routes to Dead Letter Queue after max attempts',
    passed: dlqPassed,
    expected: 'status: DEAD_LETTER, attempts: 3',
    actual: 'status: ' + finalJob.status + ', attempts: ' + finalJob.attempts
  });

  return results;
})`,
    solutionFiles: [
      {
        name: 'webhookQueue.ts',
        language: 'typescript',
        content: `export class WebhookDispatcher {
  config: any;
  jobs = new Map<string, any>();

  constructor(config: any = { maxAttempts: 4, baseDelayMs: 100, maxDelayMs: 5000 }) {
    this.config = config;
  }

  public enqueue(url: string, payload: any): any {
    const job = {
      id: 'job_' + Math.random().toString(36).substring(2, 9),
      url: url,
      payload: payload,
      status: 'PENDING',
      attempts: 0
    };
    this.jobs.set(job.id, job);
    return job;
  }

  public calculateBackoff(attempt: number): number {
    const exponential = Math.min(
      this.config.maxDelayMs,
      this.config.baseDelayMs * Math.pow(2, attempt)
    );
    const jitter = Math.random() * (exponential * 0.2);
    return Math.round(exponential + jitter);
  }

  public async processJob(jobId: string, sender: any): any {
    const job = this.jobs.get(jobId);
    if (!job) throw new Error('Job not found: ' + jobId);

    job.attempts += 1;

    try {
      const res = await sender(job.url, job.payload);
      if (res.status >= 200 && res.status < 300) {
        job.status = 'SUCCESS';
        delete job.nextRetryAt;
        return job;
      }
      job.lastError = 'HTTP_STATUS_' + res.status;
    } catch (err: any) {
      job.lastError = err?.message || 'NETWORK_ERROR';
    }

    if (job.attempts >= this.config.maxAttempts) {
      job.status = 'DEAD_LETTER';
      delete job.nextRetryAt;
    } else {
      job.status = 'RETRY_SCHEDULED';
      const delay = this.calculateBackoff(job.attempts - 1);
      job.nextRetryAt = Date.now() + delay;
    }

    return job;
  }

  public getStats(): any {
    let pending = 0;
    let success = 0;
    let deadLetter = 0;

    for (const job of this.jobs.values()) {
      if (job.status === 'PENDING' || job.status === 'RETRY_SCHEDULED') pending++;
      else if (job.status === 'SUCCESS') success++;
      else if (job.status === 'DEAD_LETTER') deadLetter++;
    }

    return { pending, success, deadLetter };
  }
}
`,
      },
    ],
    editorialMarkdown: `### Architectural Walkthrough: Resilient Webhook Queues & Jittered Backoff

Handling external webhooks is notoriously prone to network partitions and destination server outages (e.g. Shopify, GitHub, Stripe).

#### 1. Why Full Jitter is Essential
When a downstream partner server experiences a momentary restart, standard exponential backoff causes all retrying clients to synchronize their retries at the exact same intervals (1s, 2s, 4s, 8s). This creates catastrophic **Thundering Herds** that repeatedly crash the recovering server.
Adding **Full Jitter**:
\`\`\`ts
delay = exponential + (Math.random() * jitterWindow)
\`\`\`
Smooths the request spikes into a continuous, manageable queue stream.

#### 2. Dead Letter Queues (DLQ)
Retrying indefinitely wastes compute and exhausts queue workers. After \`maxAttempts\` are exhausted, routing failing messages to a Dead Letter Queue preserves customer payloads for manual replay or webhook diagnostic alerts.`,
  },
];
