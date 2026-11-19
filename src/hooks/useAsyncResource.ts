import { useCallback, useEffect, useRef, useState } from 'react';
import type { AsyncResource, ResourceStatus } from '../services/types';

/**
 * Generic async resource hook backed by an AbortController so repository calls
 * expose a consistent `{ data, status: 'loading' | 'ready' | 'error', error, retry }` contract.
 */
export function useAsyncResource<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  initialData: T,
  deps: readonly unknown[] = [],
): AsyncResource<T> {
  const [data, setData] = useState<T>(initialData);
  const [status, setStatus] = useState<ResourceStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const retry = useCallback(() => {
    setAttempt((current) => current + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    setError(null);

    fetcherRef.current(controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return;
        setData(result);
        setStatus('ready');
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Unable to load data.');
        setStatus('error');
      });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt, ...deps]);

  return { data, status, error, retry };
}
