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

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body && !headers.has('Content-Type')) {
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
      ...options,
      headers,
      credentials: 'include',
    });
  } catch {
    throw new ApiError(
      'Cannot connect to CodeArena server. Check your connection and ensure the backend is running.',
      0,
      'NETWORK_ERROR',
    );
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

    throw new ApiError(
      body?.error?.message ?? 'Something went wrong. Please try again.',
      response.status,
      body?.error?.code,
    );
  }

  return payload as T;
}
