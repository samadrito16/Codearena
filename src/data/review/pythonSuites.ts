import { ReviewTestSuite } from '../../types/review';

export const PYTHON_REVIEW_SUITES: Record<string, ReviewTestSuite> = {
  'rev-002': {
    scenarioId: 'rev-002',
    executionMode: 'backend_container',
    runtimeLanguage: 'python',
    testCases: [
      {
        id: 't1',
        title: 'Returns embeddings cleanly when all endpoints respond 200',
        description: 'Validates normal batch fetching and clean session teardown.',
        isRegressionCheck: true,
      },
      {
        id: 't2',
        title: 'Cancels sibling tasks immediately on failure before ClientSession exits',
        description: 'When one endpoint fails with 504, orphan slow tasks must be cancelled cleanly (e.g. via asyncio.TaskGroup) rather than lingering.',
      },
    ],
    harnessCode: 'SERVER_SIDE_HARNESS',
    solutionFiles: [
      {
        filename: 'embedding_pipeline.py',
        content: `import asyncio
import aiohttp

async def fetch_chunk_embedding(session: aiohttp.ClientSession, url: str, text: str) -> dict:
    async with session.post(url, json={"text": text}, timeout=aiohttp.ClientTimeout(total=5)) as resp:
        if resp.status != 200:
            raise RuntimeError(f"Model endpoint failed with status {resp.status}")
        return await resp.json()

async def process_batch_embeddings(urls: list[str], documents: list[str]) -> list[dict]:
    async with aiohttp.ClientSession() as session:
        tasks = []
        try:
            async with asyncio.TaskGroup() as tg:
                tasks = [
                    tg.create_task(fetch_chunk_embedding(session, url, doc))
                    for url, doc in zip(urls, documents)
                ]
        except ExceptionGroup as eg:
            for exc in eg.exceptions:
                print(f"Warning: chunk failure: {exc}")
            return [t.result() for t in tasks if t.done() and not t.cancelled() and t.exception() is None]

        return [t.result() for t in tasks]
`,
      },
      {
        filename: 'orchestrator.py',
        content: `import asyncio
from embedding_pipeline import process_batch_embeddings

async def run_pipeline(batch_data):
    urls = batch_data['endpoints']
    docs = batch_data['documents']

    try:
        return await asyncio.wait_for(process_batch_embeddings(urls, docs), timeout=10.0)
    except asyncio.TimeoutError:
        print("Orchestration timed out!")
        return []
`,
      },
    ],
  },

  'rev-004': {
    scenarioId: 'rev-004',
    executionMode: 'backend_container',
    runtimeLanguage: 'python',
    testCases: [
      {
        id: 't1',
        title: 'Yields exact-size batches when length is divisible by batch_size',
        description: 'create_fixed_chunks([1,2,3,4,5,6], 3) -> [[1,2,3], [4,5,6]].',
        isRegressionCheck: true,
      },
      {
        id: 't2',
        title: 'Preserves trailing partial remainder batch items',
        description: 'create_fixed_chunks([1,2,3,4,5,6,7], 3) must yield [[1,2,3], [4,5,6], [7]].',
      },
      {
        id: 't3',
        title: 'Handles corpus smaller than default chunk_size',
        description: 'process_corpus(["a", "b", "c"], chunk_size=32) must process all 3 documents, not 0.',
      },
    ],
    harnessCode: 'SERVER_SIDE_HARNESS',
    solutionFiles: [
      {
        filename: 'chunker.py',
        content: `from typing import Generator, List, Any

def create_fixed_chunks(items: List[Any], batch_size: int) -> Generator[List[Any], None, None]:
    """Yield batches of fixed size including any trailing remainder."""
    for start_idx in range(0, len(items), batch_size):
        yield items[start_idx : start_idx + batch_size]

def process_corpus(corpus: List[str], chunk_size: int = 32):
    chunks_processed = 0
    for batch in create_fixed_chunks(corpus, chunk_size):
        chunks_processed += len(batch)
    return chunks_processed
`,
      },
    ],
  },

  'rev-006': {
    scenarioId: 'rev-006',
    executionMode: 'backend_container',
    runtimeLanguage: 'python',
    testCases: [
      {
        id: 't1',
        title: 'Publishes events cleanly to all registered subscribers',
        description: 'All subscribed handlers execute when event_name is published.',
        isRegressionCheck: true,
      },
      {
        id: 't2',
        title: 'Isolates payload state so subscriber mutations do not corrupt downstream services or caller',
        description: 'audit_order_total must receive original prices ($1100) and caller payload must remain unmutated.',
      },
    ],
    harnessCode: 'SERVER_SIDE_HARNESS',
    solutionFiles: [
      {
        filename: 'event_bus.py',
        content: `import copy
from typing import Callable, Dict, List, Any

class EventBus:
    def __init__(self):
        self._subscribers: Dict[str, List[Callable[[Dict[str, Any]], None]]] = {}

    def subscribe(self, event_name: str, handler: Callable[[Dict[str, Any]], None]):
        self._subscribers.setdefault(event_name, []).append(handler)

    def publish(self, event_name: str, payload: Dict[str, Any]):
        for handler in self._subscribers.get(event_name, []):
            handler(copy.deepcopy(payload))
`,
      },
      {
        filename: 'discount_service.py',
        content: `def apply_tax_and_discounts(event_payload: dict):
    items = event_payload.get('items', [])
    for item in items:
        item['price'] = item['price'] * 0.90
    event_payload['discount_applied'] = True
`,
      },
      {
        filename: 'audit_service.py',
        content: `def audit_order_total(event_payload: dict):
    original_total = sum(item['price'] for item in event_payload.get('items', []))
    if original_total > 1000:
        print("Flagging high value transaction for review:", original_total)
`,
      },
    ],
  },

  'rev-009': {
    scenarioId: 'rev-009',
    executionMode: 'backend_container',
    runtimeLanguage: 'python',
    testCases: [
      {
        id: 't1',
        title: 'Fetches legitimate tenant activity matching tenant_id and status',
        description: 'Normal lookup returns expected audit log records.',
        isRegressionCheck: true,
      },
      {
        id: 't2',
        title: 'Blocks SQL injection payload from leaking other tenants data',
        description: 'Malicious input like "acme\' OR \'1\'=\'1" must use bound parameters and return [] cleanly.',
      },
    ],
    harnessCode: 'SERVER_SIDE_HARNESS',
    solutionFiles: [
      {
        filename: 'reporting_service.py',
        content: `import sqlite3
from typing import List, Dict, Any

def get_tenant_activity(db_conn: sqlite3.Connection, tenant_id: str, status: str) -> List[Dict[str, Any]]:
    cursor = db_conn.cursor()
    query = "SELECT id, event_type, created_at FROM audit_logs WHERE tenant_id = ? AND status = ?"
    cursor.execute(query, (tenant_id, status))
    rows = cursor.fetchall()
    return [{"id": r[0], "event_type": r[1], "created_at": r[2]} for r in rows]
`,
      },
    ],
  },

  'rev-011': {
    scenarioId: 'rev-011',
    executionMode: 'backend_container',
    runtimeLanguage: 'python',
    testCases: [
      {
        id: 't1',
        title: 'Completes order saga normally when cache succeeds',
        description: 'Deducts wallet balance and stores cache reservation without refunding.',
        isRegressionCheck: true,
      },
      {
        id: 't2',
        title: 'Triggers compensating refund_balance when cache reservation fails',
        description: 'If store_reservation raises ConnectionError, execute_order must refund wallet and return False.',
      },
    ],
    harnessCode: 'SERVER_SIDE_HARNESS',
    solutionFiles: [
      {
        filename: 'order_saga.py',
        content: `import logging
from wallet_store import WalletStore
from cache_store import CacheStore

logger = logging.getLogger(__name__)

class OrderSaga:
    def __init__(self, wallet: WalletStore, cache: CacheStore):
        self.wallet = wallet
        self.cache = cache

    def execute_order(self, user_id: str, order_id: str, amount_cents: int) -> bool:
        tx_id = self.wallet.deduct_balance(user_id, amount_cents)

        try:
            self.cache.store_reservation(order_id, user_id, amount_cents)
            return True
        except Exception as e:
            logger.error(f"Failed to reserve order in cache: {e}")
            self.wallet.refund_balance(user_id, amount_cents, tx_id)
            return False
`,
      },
      {
        filename: 'wallet_store.py',
        content: `class WalletStore:
    def deduct_balance(self, user_id: str, amount: int) -> str:
        return f"tx_wallet_{user_id}_{amount}"

    def refund_balance(self, user_id: str, amount: int, orig_tx: str) -> None:
        pass
`,
      },
      {
        filename: 'cache_store.py',
        content: `class CacheStore:
    def store_reservation(self, order_id: str, user_id: str, amount: int) -> None:
        pass
`,
      },
    ],
  },

  'rev-013': {
    scenarioId: 'rev-013',
    executionMode: 'backend_container',
    runtimeLanguage: 'python',
    testCases: [
      {
        id: 't1',
        title: 'Permits valid public HTTPS webhook URLs',
        description: 'Public endpoints like https://hooks.example.com/events succeed with HTTP 200.',
        isRegressionCheck: true,
      },
      {
        id: 't2',
        title: 'Blocks AWS metadata IP and loopback SSRF targets',
        description: '169.254.169.254 and 127.0.0.1 / [::1] must be rejected with ValueError before any HTTP call.',
      },
      {
        id: 't3',
        title: 'Blocks private RFC1918 internal network IP ranges',
        description: '10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16 must be rejected cleanly.',
      },
    ],
    harnessCode: 'SERVER_SIDE_HARNESS',
    solutionFiles: [
      {
        filename: 'dispatcher.py',
        content: `import requests
from url_validator import is_safe_webhook_url

def dispatch_webhook(target_url: str, payload: dict) -> int:
    if not is_safe_webhook_url(target_url):
        raise ValueError("Target URL is not permitted")

    response = requests.post(target_url, json=payload, timeout=5, allow_redirects=False)
    return response.status_code
`,
      },
      {
        filename: 'url_validator.py',
        content: `import ipaddress
import socket
from urllib.parse import urlparse

def _is_forbidden_ip(ip_obj) -> bool:
    return (
        ip_obj.is_private
        or ip_obj.is_loopback
        or ip_obj.is_link_local
        or ip_obj.is_multicast
        or ip_obj.is_reserved
        or ip_obj.is_unspecified
    )

def is_safe_webhook_url(url: str) -> bool:
    parsed = urlparse(url)
    if parsed.scheme != "https" or not parsed.hostname:
        return False

    hostname = parsed.hostname.strip("[]").lower()
    if hostname in ("localhost", "metadata.google.internal"):
        return False

    try:
        ip_obj = ipaddress.ip_address(hostname)
        return not _is_forbidden_ip(ip_obj)
    except ValueError:
        pass

    try:
        addr_infos = socket.getaddrinfo(hostname, None)
        for info in addr_infos:
            resolved_ip = ipaddress.ip_address(info[4][0].split("%")[0])
            if _is_forbidden_ip(resolved_ip):
                return False
    except socket.gaierror:
        return False

    return True
`,
      },
    ],
  },

  'rev-016': {
    scenarioId: 'rev-016',
    executionMode: 'backend_container',
    runtimeLanguage: 'python',
    testCases: [
      {
        id: 't1',
        title: 'Returns properly serialized trending feed items',
        description: 'Output includes id, title, author_name, and badges for all posts.',
        isRegressionCheck: true,
      },
      {
        id: 't2',
        title: 'Eliminates N+1 query cascade (executes <= 5 total queries for 20 posts)',
        description: 'Use select_related("author") and prefetch_related("author__badges") to stay within O(1) queries.',
      },
    ],
    harnessCode: 'SERVER_SIDE_HARNESS',
    solutionFiles: [
      {
        filename: 'views.py',
        content: `from models import Post

def get_trending_feed():
    posts = (
        Post.objects.filter(is_published=True)
        .select_related('author')
        .prefetch_related('author__badges')
        .order_by('-view_count')[:100]
    )

    serialized = []
    for post in posts:
        serialized.append({
            "id": post.id,
            "title": post.title,
            "author_name": post.author.display_name,
            "badges": [b.name for b in post.author.badges.all()],
        })
    return serialized
`,
      },
    ],
  },
};
