import { API_BASE_URL } from './config';

type ApiErrorContext = {
  status: number;
  message: string;
  url: string;
};

export class ApiError extends Error {
  status: number;
  url: string;

  constructor({ status, message, url }: ApiErrorContext) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.url = url;
  }
}

type ApiResponse<T> = {
  is_success: boolean;
  message: string;
  data: T;
  errors?: string[] | null;
};

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${path}`;

  const method = (init?.method ?? 'GET').toString().toUpperCase();
  const maxAttempts = method === 'GET' ? 3 : 1;
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  let lastError: unknown;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          ...(init?.headers ?? {}),
        },
        ...init,
      });

      const rawText = await response.text();
      let body: ApiResponse<T> | undefined;

      try {
        body = rawText ? (JSON.parse(rawText) as ApiResponse<T>) : undefined;
      } catch (error) {
        const err = new ApiError({
          status: response.status,
          message: rawText
            ? `Invalid JSON response: ${rawText}`
            : 'Invalid JSON response from API.',
          url,
        });
        if (process.env.NODE_ENV === 'development') {
          console.error('[apiFetch] invalid JSON', {
            url,
            status: response.status,
            rawText,
            error,
          });
        }
        throw err;
      }

      if (!response.ok) {
        const err = new ApiError({
          status: response.status,
          message: body?.message ?? 'API request failed.',
          url,
        });
        if (process.env.NODE_ENV === 'development') {
          console.error('[apiFetch] API error', { url, status: response.status, body });
        }
        throw err;
      }

      if (body && 'is_success' in body && body.is_success === false) {
        const err = new ApiError({
          status: response.status,
          message: body?.message ?? 'API request failed.',
          url,
        });
        if (process.env.NODE_ENV === 'development') {
          console.error('[apiFetch] API error', { url, status: response.status, body });
        }
        throw err;
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('[apiFetch] success', { url, status: response.status });
      }

      return (body ?? {
        is_success: true,
        message: 'OK',
        data: null as unknown as T,
      }) as ApiResponse<T>;
    } catch (error) {
      lastError = error;
      const isLast = attempt === maxAttempts - 1;
      const isGet = method === 'GET';
      if (!isGet || isLast) {
        throw error;
      }
      // backoff: 150ms, 300ms
      await wait(150 * (attempt + 1));
    }
  }

  // Should not reach here
  throw lastError;
}

export type { ApiResponse };
