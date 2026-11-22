const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

let tokenGetter: (() => Promise<string | null>) | null = null;

export function setApiAuthTokenGetter(getter: (() => Promise<string | null>) | null) {
  tokenGetter = getter;
}

export interface ApiRequestOptions extends RequestInit {
  silent?: boolean;
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { silent, ...fetchOptions } = options;
  const headers = new Headers(fetchOptions.headers);
  if (fetchOptions.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // Attach Clerk JWT Bearer token if available
  if (tokenGetter && !headers.has('Authorization')) {
    try {
      const token = await tokenGetter();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    } catch {
      // Ignore token fetch errors and proceed with cookies/guest
    }
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...fetchOptions,
      headers,
      credentials: 'include',
    });
  } catch {
    // Only dispatch network error banner event for non-silent, active user requests
    // Routine background checks (e.g. /auth/me opportunistic probing) will not trigger the global alarm
    if (typeof window !== 'undefined' && !silent && path !== '/auth/me') {
      window.dispatchEvent(new CustomEvent('codearena:network-error', {
        detail: { path, timestamp: Date.now() },
      }));
    }
    throw new ApiError(
      'Cannot connect to PrismCode server. Check your connection and ensure the backend is running.',
      0,
      'NETWORK_ERROR',
    );
  }

  // Clear network error indicator when server responds
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('codearena:network-recovered'));
  }

  if (response.status === 204) {
    if (!response.ok) {
      throw new ApiError('Request failed.', response.status);
    }
    return undefined as T;
  }

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const body = payload as {
      error?: { message?: string; code?: string };
    } | null;

    // Trigger session expired event on 401 (excluding active login/register credential attempts)
    if (response.status === 401 && !path.includes('/login') && !path.includes('/register')) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('codearena:session-expired', {
          detail: {
            path,
            code: body?.error?.code || 'SESSION_EXPIRED',
            message: body?.error?.message || 'Your session has expired. Please sign in again to continue.',
          },
        }));
      }
    }

    throw new ApiError(
      body?.error?.message ?? 'Something went wrong. Please try again.',
      response.status,
      body?.error?.code,
    );
  }

  return payload as T;
}
