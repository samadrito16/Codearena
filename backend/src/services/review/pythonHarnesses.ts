export interface ReviewInputFile {
  filename: string;
  content: string;
}

const HARNESS_PRELUDE = `
import sys
import types
import json
import base64
import traceback

__SENTINEL__ = "___REVIEW_TEST_RESULTS___"
__USER_FILES__ = json.loads(base64.b64decode("__FILES_B64__").decode("utf-8"))

def _load_user_module(module_name: str, filename: str):
    source = __USER_FILES__.get(filename)
    if source is None:
        raise FileNotFoundError(f"Missing required file: {filename}")
    mod = types.ModuleType(module_name)
    mod.__file__ = filename
    sys.modules[module_name] = mod
    exec(compile(source, filename, "exec"), mod.__dict__)
    return mod
`;

const SCENARIO_HARNESSES: Record<string, { moduleLoadOrder: string[]; body: string }> = {
  'rev-002': {
    moduleLoadOrder: ['embedding_pipeline.py', 'orchestrator.py'],
    body: `
import asyncio

# Inject mock aiohttp before importing user modules
class _MockClientTimeout:
    def __init__(self, total=5):
        self.total = total

_tracker = {
    "inflight": 0,
    "closed_while_inflight": False,
    "sessions_open": 0,
    "slow_cancelled": False,
    "slow_completed": False,
}

class _MockResponse:
    def __init__(self, url: str):
        self.url = url
        self.status = 504 if "/fail" in url else 200

    async def __aenter__(self):
        _tracker["inflight"] += 1
        try:
            if "/slow" in self.url:
                await asyncio.sleep(0.35)
                _tracker["slow_completed"] = True
            else:
                await asyncio.sleep(0.01)
        except asyncio.CancelledError:
            if "/slow" in self.url:
                _tracker["slow_cancelled"] = True
            _tracker["inflight"] = max(0, _tracker["inflight"] - 1)
            raise
        except BaseException:
            _tracker["inflight"] = max(0, _tracker["inflight"] - 1)
            raise
        return self

    async def __aexit__(self, exc_type, exc, tb):
        _tracker["inflight"] = max(0, _tracker["inflight"] - 1)

    async def json(self):
        return {"url": self.url, "vec": [0.1, 0.2]}

class _MockClientSession:
    async def __aenter__(self):
        _tracker["sessions_open"] += 1
        return self

    async def __aexit__(self, exc_type, exc, tb):
        if _tracker["inflight"] > 0:
            _tracker["closed_while_inflight"] = True
        _tracker["sessions_open"] = max(0, _tracker["sessions_open"] - 1)

    def post(self, url, json=None, timeout=None):
        return _MockResponse(url)

_aiohttp_mod = types.ModuleType("aiohttp")
_aiohttp_mod.ClientSession = _MockClientSession
_aiohttp_mod.ClientTimeout = _MockClientTimeout
sys.modules["aiohttp"] = _aiohttp_mod

embedding_pipeline = _load_user_module("embedding_pipeline", "embedding_pipeline.py")
orchestrator = _load_user_module("orchestrator", "orchestrator.py")

async def _run_all():
    results = []

    # Test 1: Happy path 200 OK
    try:
        _tracker["inflight"] = 0
        _tracker["closed_while_inflight"] = False
        res = await orchestrator.run_pipeline({
            "endpoints": ["https://m1/ok", "https://m2/ok"],
            "documents": ["doc1", "doc2"],
        })
        passed = isinstance(res, list) and len(res) == 2 and not _tracker["closed_while_inflight"]
        results.append({
            "testId": "t1",
            "passed": passed,
            "expected": "2 embedding dicts returned and clean session close",
            "actual": f"len={len(res) if isinstance(res, list) else type(res).__name__}, closed_while_inflight={_tracker['closed_while_inflight']}",
        })
    except Exception as e:
        results.append({"testId": "t1", "passed": False, "error": f"{type(e).__name__}: {e}"})

    # Test 2: Fast sibling cancellation when an endpoint fails 504 (no lingering /slow tasks)
    try:
        _tracker["inflight"] = 0
        _tracker["closed_while_inflight"] = False
        _tracker["slow_cancelled"] = False
        _tracker["slow_completed"] = False

        try:
            await orchestrator.run_pipeline({
                "endpoints": ["https://m1/ok", "https://m2/fail", "https://m3/slow"],
                "documents": ["doc1", "doc2", "doc3"],
            })
        except Exception:
            pass

        passed = _tracker["slow_cancelled"] and not _tracker["slow_completed"] and not _tracker["closed_while_inflight"]
        results.append({
            "testId": "t2",
            "passed": passed,
            "expected": "Failing 504 task cancels slow sibling immediately before ClientSession exits",
            "actual": f"slow_cancelled={_tracker['slow_cancelled']}, slow_completed={_tracker['slow_completed']}, closed_while_inflight={_tracker['closed_while_inflight']}",
        })
    except Exception as e:
        results.append({"testId": "t2", "passed": False, "error": f"{type(e).__name__}: {e}"})

    return results

_final_results = asyncio.run(_run_all())
print(__SENTINEL__ + json.dumps(_final_results))
`,
  },

  'rev-004': {
    moduleLoadOrder: ['chunker.py'],
    body: `
chunker = _load_user_module("chunker", "chunker.py")
results = []

# Test 1
try:
    actual = list(chunker.create_fixed_chunks([1, 2, 3, 4, 5, 6], 3))
    expected = [[1, 2, 3], [4, 5, 6]]
    results.append({
        "testId": "t1",
        "passed": actual == expected,
        "expected": repr(expected),
        "actual": repr(actual),
    })
except Exception as e:
    results.append({"testId": "t1", "passed": False, "error": f"{type(e).__name__}: {e}"})

# Test 2
try:
    actual = list(chunker.create_fixed_chunks([1, 2, 3, 4, 5, 6, 7], 3))
    expected = [[1, 2, 3], [4, 5, 6], [7]]
    results.append({
        "testId": "t2",
        "passed": actual == expected,
        "expected": repr(expected),
        "actual": repr(actual),
    })
except Exception as e:
    results.append({"testId": "t2", "passed": False, "error": f"{type(e).__name__}: {e}"})

# Test 3
try:
    actual = chunker.process_corpus(["doc1", "doc2", "doc3"], chunk_size=32)
    results.append({
        "testId": "t3",
        "passed": actual == 3,
        "expected": "3",
        "actual": repr(actual),
    })
except Exception as e:
    results.append({"testId": "t3", "passed": False, "error": f"{type(e).__name__}: {e}"})

print(__SENTINEL__ + json.dumps(results))
`,
  },

  'rev-006': {
    moduleLoadOrder: ['event_bus.py', 'discount_service.py', 'audit_service.py'],
    body: `
import io
import contextlib

event_bus = _load_user_module("event_bus", "event_bus.py")
discount_service = _load_user_module("discount_service", "discount_service.py")
audit_service = _load_user_module("audit_service", "audit_service.py")

results = []

# Test 1: Subscribers execute cleanly
try:
    seen = []
    bus = event_bus.EventBus()
    bus.subscribe("ping", lambda p: seen.append(p.get("id")))
    bus.publish("ping", {"id": 42})
    results.append({
        "testId": "t1",
        "passed": seen == [42],
        "expected": "[42]",
        "actual": repr(seen),
    })
except Exception as e:
    results.append({"testId": "t1", "passed": False, "error": f"{type(e).__name__}: {e}"})

# Test 2: Discount subscriber must not corrupt audit subscriber or caller payload
try:
    bus = event_bus.EventBus()
    bus.subscribe("order_created", discount_service.apply_tax_and_discounts)
    bus.subscribe("order_created", audit_service.audit_order_total)

    payload = {"items": [{"price": 600}, {"price": 500}]}
    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        bus.publish("order_created", payload)

    output = buf.getvalue()
    caller_intact = payload["items"][0]["price"] == 600 and not payload.get("discount_applied", False)
    audit_flagged = "1100" in output
    passed = caller_intact and audit_flagged
    results.append({
        "testId": "t2",
        "passed": passed,
        "expected": "Caller price intact (600) AND audit_order_total sees unmutated total 1100",
        "actual": f"caller_price={payload['items'][0]['price']}, audit_stdout={output.strip()!r}",
    })
except Exception as e:
    results.append({"testId": "t2", "passed": False, "error": f"{type(e).__name__}: {e}"})

print(__SENTINEL__ + json.dumps(results))
`,
  },

  'rev-009': {
    moduleLoadOrder: ['reporting_service.py'],
    body: `
import sqlite3

reporting_service = _load_user_module("reporting_service", "reporting_service.py")

def _make_db():
    conn = sqlite3.connect(":memory:")
    conn.execute("CREATE TABLE audit_logs (id INTEGER PRIMARY KEY, tenant_id TEXT, status TEXT, event_type TEXT, created_at TEXT)")
    conn.executemany(
        "INSERT INTO audit_logs (tenant_id, status, event_type, created_at) VALUES (?, ?, ?, ?)",
        [
            ("acme", "LOGIN", "user.login", "2026-01-01"),
            ("acme", "LOGOUT", "user.logout", "2026-01-02"),
            ("globex", "ACTIVE", "secret.export", "2026-01-03"),
        ],
    )
    conn.commit()
    return conn

results = []

# Test 1: Legitimate query
try:
    conn = _make_db()
    rows = reporting_service.get_tenant_activity(conn, "acme", "LOGIN")
    passed = isinstance(rows, list) and len(rows) == 1 and rows[0]["event_type"] == "user.login"
    results.append({
        "testId": "t1",
        "passed": passed,
        "expected": "1 row for acme LOGIN",
        "actual": repr(rows),
    })
except Exception as e:
    results.append({"testId": "t1", "passed": False, "error": f"{type(e).__name__}: {e}"})

# Test 2: SQL Injection probe
try:
    conn = _make_db()
    malicious_tenant = "acme' OR '1'='1"
    malicious_status = "LOGIN' OR '1'='1"
    rows = reporting_service.get_tenant_activity(conn, malicious_tenant, malicious_status)
    passed = isinstance(rows, list) and len(rows) == 0
    results.append({
        "testId": "t2",
        "passed": passed,
        "expected": "[] (0 rows leaked on SQL injection payload)",
        "actual": f"Returned {len(rows)} row(s): {rows!r}",
    })
except Exception as e:
    results.append({
        "testId": "t2",
        "passed": False,
        "expected": "[] cleanly with parameterized query",
        "actual": f"SQL error raised: {type(e).__name__}: {e}",
    })

print(__SENTINEL__ + json.dumps(results))
`,
  },

  'rev-011': {
    moduleLoadOrder: ['wallet_store.py', 'cache_store.py', 'order_saga.py'],
    body: `
wallet_store = _load_user_module("wallet_store", "wallet_store.py")
cache_store = _load_user_module("cache_store", "cache_store.py")
order_saga = _load_user_module("order_saga", "order_saga.py")

class TrackedWallet(wallet_store.WalletStore):
    def __init__(self, initial=1000):
        self.balance = initial
        self.refund_calls = []

    def deduct_balance(self, user_id: str, amount: int) -> str:
        self.balance -= amount
        return f"tx_{user_id}_{amount}"

    def refund_balance(self, user_id: str, amount: int, orig_tx: str) -> None:
        self.balance += amount
        self.refund_calls.append((user_id, amount, orig_tx))

class HealthyCache(cache_store.CacheStore):
    def store_reservation(self, order_id: str, user_id: str, amount: int) -> None:
        return None

class FailingCache(cache_store.CacheStore):
    def store_reservation(self, order_id: str, user_id: str, amount: int) -> None:
        raise ConnectionError("Redis cache unavailable")

results = []

# Test 1: Healthy path
try:
    w = TrackedWallet(1000)
    saga = order_saga.OrderSaga(w, HealthyCache())
    ok = saga.execute_order("u1", "o1", 250)
    passed = ok is True and w.balance == 750 and len(w.refund_calls) == 0
    results.append({
        "testId": "t1",
        "passed": passed,
        "expected": "ok=True, balance=750, refunds=0",
        "actual": f"ok={ok}, balance={w.balance}, refunds={len(w.refund_calls)}",
    })
except Exception as e:
    results.append({"testId": "t1", "passed": False, "error": f"{type(e).__name__}: {e}"})

# Test 2: Cache failure must trigger refund_balance
try:
    w = TrackedWallet(1000)
    saga = order_saga.OrderSaga(w, FailingCache())
    ok = saga.execute_order("u1", "o2", 400)
    passed = ok is False and w.balance == 1000 and len(w.refund_calls) == 1
    results.append({
        "testId": "t2",
        "passed": passed,
        "expected": "ok=False AND refund_balance restores balance to 1000",
        "actual": f"ok={ok}, balance={w.balance}, refund_calls={w.refund_calls!r}",
    })
except Exception as e:
    results.append({"testId": "t2", "passed": False, "error": f"{type(e).__name__}: {e}"})

print(__SENTINEL__ + json.dumps(results))
`,
  },

  'rev-013': {
    moduleLoadOrder: ['url_validator.py', 'dispatcher.py'],
    body: `
import socket

# Mock requests module
_outbound_calls = []
class _MockResponse:
    status_code = 200

_req_mod = types.ModuleType("requests")
def _mock_post(url, json=None, timeout=None, allow_redirects=True):
    _outbound_calls.append(url)
    return _MockResponse()
_req_mod.post = _mock_post
sys.modules["requests"] = _req_mod

# Deterministic offline DNS mapping
def _fake_getaddrinfo(host, port, *args, **kwargs):
    h = (host or "").lower()
    if h == "hooks.example.com":
        ip = "93.184.216.34"
    elif h == "internal.evil.com":
        ip = "169.254.169.254"
    elif h in ("localhost", "127.0.0.1"):
        ip = "127.0.0.1"
    else:
        ip = "93.184.216.34"
    return [(socket.AF_INET, socket.SOCK_STREAM, 6, "", (ip, 443))]

socket.getaddrinfo = _fake_getaddrinfo

url_validator = _load_user_module("url_validator", "url_validator.py")
dispatcher = _load_user_module("dispatcher", "dispatcher.py")

results = []

# Test 1: Public HTTPS URL
try:
    _outbound_calls.clear()
    status = dispatcher.dispatch_webhook("https://hooks.example.com/events", {"ok": True})
    passed = status == 200 and len(_outbound_calls) == 1
    results.append({
        "testId": "t1",
        "passed": passed,
        "expected": "status 200 for public HTTPS webhook",
        "actual": f"status={status}, calls={len(_outbound_calls)}",
    })
except Exception as e:
    results.append({"testId": "t1", "passed": False, "error": f"{type(e).__name__}: {e}"})

# Test 2: Cloud metadata & loopback SSRF
try:
    blocked_all = True
    failed_urls = []
    for bad_url in ["https://169.254.169.254/latest/meta-data", "https://127.0.0.1/admin", "https://[::1]/admin"]:
        _outbound_calls.clear()
        try:
            dispatcher.dispatch_webhook(bad_url, {"x": 1})
            blocked_all = False
            failed_urls.append(bad_url)
        except ValueError:
            if len(_outbound_calls) > 0:
                blocked_all = False
                failed_urls.append(bad_url)
    results.append({
        "testId": "t2",
        "passed": blocked_all,
        "expected": "Raise ValueError for 169.254.169.254, 127.0.0.1, and ::1",
        "actual": "All blocked" if blocked_all else f"SSRF BYPASS: permitted {failed_urls}",
    })
except Exception as e:
    results.append({"testId": "t2", "passed": False, "error": f"{type(e).__name__}: {e}"})

# Test 3: Private RFC1918 CIDRs
try:
    blocked_all = True
    failed_urls = []
    for priv_url in ["https://10.0.1.4/hook", "https://192.168.1.50/hook", "https://172.16.0.10/hook"]:
        _outbound_calls.clear()
        try:
            dispatcher.dispatch_webhook(priv_url, {"x": 1})
            blocked_all = False
            failed_urls.append(priv_url)
        except ValueError:
            if len(_outbound_calls) > 0:
                blocked_all = False
                failed_urls.append(priv_url)
    results.append({
        "testId": "t3",
        "passed": blocked_all,
        "expected": "Raise ValueError for 10.x, 192.168.x, and 172.16.x",
        "actual": "All blocked" if blocked_all else f"SSRF BYPASS: permitted {failed_urls}",
    })
except Exception as e:
    results.append({"testId": "t3", "passed": False, "error": f"{type(e).__name__}: {e}"})

print(__SENTINEL__ + json.dumps(results))
`,
  },

  'rev-016': {
    moduleLoadOrder: ['views.py'],
    body: `
# Inject Django-like ORM mock tracking exact SQL query count
_db_stats = {"queries": 0}

class _Badge:
    def __init__(self, name: str):
        self.name = name

class _BadgeManager:
    def __init__(self, badges, prefetched=False):
        self._badges = badges
        self._prefetched = prefetched

    def all(self):
        if not self._prefetched:
            _db_stats["queries"] += 1
        return self._badges

class _Author:
    def __init__(self, display_name: str, badges: list[_Badge], badges_prefetched=False):
        self.display_name = display_name
        self.badges = _BadgeManager(badges, prefetched=badges_prefetched)

class _PostRecord:
    def __init__(self, pid: int, title: str, author_name: str, badge_names: list[str], select_author=False, prefetch_badges=False):
        self.id = pid
        self.title = title
        self._author_obj = _Author(author_name, [_Badge(b) for b in badge_names], badges_prefetched=prefetch_badges)
        self._select_author = select_author

    @property
    def author(self):
        if not self._select_author:
            _db_stats["queries"] += 1
        return self._author_obj

_SEED_ROWS = [
    (i, f"Post #{i}", f"Author_{i}", ["Pro", "Verified"] if i % 2 == 0 else ["TopWriter"])
    for i in range(1, 21)
]

class _QuerySet:
    def __init__(self):
        self._selects = set()
        self._prefetches = set()
        self._limit = 100

    def filter(self, **kwargs):
        return self

    def select_related(self, *fields):
        self._selects.update(fields)
        return self

    def prefetch_related(self, *fields):
        self._prefetches.update(fields)
        return self

    def order_by(self, *fields):
        return self

    def __getitem__(self, item):
        if isinstance(item, slice) and item.stop is not None:
            self._limit = item.stop
        return list(self)

    def __iter__(self):
        _db_stats["queries"] += 1  # Main Post query
        has_select_author = "author" in self._selects
        has_prefetch_badges = "author__badges" in self._prefetches or "badges" in self._prefetches
        if has_prefetch_badges:
            _db_stats["queries"] += 1  # Single batch prefetch query
        for pid, title, aname, bnames in _SEED_ROWS[: self._limit]:
            yield _PostRecord(pid, title, aname, bnames, select_author=has_select_author, prefetch_badges=has_prefetch_badges)

class _Objects:
    def filter(self, **kwargs):
        return _QuerySet().filter(**kwargs)

class _PostModel:
    objects = _Objects()

_models_mod = types.ModuleType("models")
_models_mod.Post = _PostModel
sys.modules["models"] = _models_mod

views = _load_user_module("views", "views.py")
results = []

# Test 1 & 2
try:
    _db_stats["queries"] = 0
    feed = views.get_trending_feed()
    queries_executed = _db_stats["queries"]

    t1_passed = (
        isinstance(feed, list)
        and len(feed) == 20
        and feed[0]["id"] == 1
        and feed[0]["author_name"] == "Author_1"
        and feed[0]["badges"] == ["TopWriter"]
    )
    results.append({
        "testId": "t1",
        "passed": t1_passed,
        "expected": "20 serialized posts with id, title, author_name, badges",
        "actual": f"len={len(feed) if isinstance(feed, list) else None}, first={feed[0] if feed else None}",
    })

    results.append({
        "testId": "t2",
        "passed": t1_passed and queries_executed <= 5,
        "expected": "<= 5 SQL queries executed for 20 posts",
        "actual": f"{queries_executed} SQL queries executed (N+1 cascade if > 5)",
    })
except Exception as e:
    results.append({"testId": "t1", "passed": False, "error": f"{type(e).__name__}: {e}"})
    results.append({"testId": "t2", "passed": False, "error": f"{type(e).__name__}: {e}"})

print(__SENTINEL__ + json.dumps(results))
`,
  },
};

export function isSupportedPythonReviewScenario(scenarioId: string): boolean {
  return Boolean(SCENARIO_HARNESSES[scenarioId]);
}

export function buildPythonReviewProgram(
  scenarioId: string,
  files: ReviewInputFile[],
): string {
  const spec = SCENARIO_HARNESSES[scenarioId];
  if (!spec) {
    throw new Error(`No server test harness found for scenario: ${scenarioId}`);
  }

  const fileMap: Record<string, string> = {};
  for (const f of files) {
    fileMap[f.filename] = f.content;
  }

  const encodedFiles = Buffer.from(JSON.stringify(fileMap), 'utf8').toString('base64');
  const prelude = HARNESS_PRELUDE.replace('__FILES_B64__', () => encodedFiles);
  return `${prelude}\n${spec.body}`;
}
