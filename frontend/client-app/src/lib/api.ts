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

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch with timeout to prevent hanging requests
async function fetchWithTimeout(
  url: string,
  init: RequestInit | undefined,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Check if error is retryable (network errors, timeouts, 5xx server errors)
function isRetryableError(error: unknown, status?: number): boolean {
  // Network errors or aborted requests
  if (error instanceof Error) {
    if (error.name === 'AbortError') return true;
    if (error.message.includes('fetch failed')) return true;
    if (error.message.includes('network')) return true;
  }
  // Server errors (5xx) are retryable
  if (status && status >= 500 && status < 600) return true;
  return false;
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${path}`;

  const method = (init?.method ?? 'GET').toString().toUpperCase();
  // More retries for GET requests, and also retry POST for AI endpoints
  const isAIEndpoint = path.includes('/shop/search') || path.includes('/insights') || path.includes('/recommendations');
  const maxAttempts = method === 'GET' ? 5 : isAIEndpoint ? 3 : 1;
  // Longer timeout for AI endpoints (60s), normal timeout (30s)
  const timeoutMs = isAIEndpoint ? 60000 : 30000;

  let lastError: unknown;
  let lastStatus: number | undefined;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      if (attempt > 0 && process.env.NODE_ENV === 'development') {
        console.log(`[apiFetch] Retry attempt ${attempt + 1}/${maxAttempts} for ${url}`);
      }

      const response = await fetchWithTimeout(
        url,
        {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            ...(init?.headers ?? {}),
          },
          ...init,
        },
        timeoutMs
      );

      lastStatus = response.status;
      const rawText = await response.text();
      let body: ApiResponse<T> | undefined;

      try {
        body = rawText ? (JSON.parse(rawText) as ApiResponse<T>) : undefined;
      } catch (parseError) {
        const err = new ApiError({
          status: response.status,
          message: rawText
            ? `Invalid JSON response: ${rawText.slice(0, 200)}`
            : 'Invalid JSON response from API.',
          url,
        });
        if (process.env.NODE_ENV === 'development') {
          console.error('[apiFetch] invalid JSON', {
            url,
            status: response.status,
            rawText: rawText.slice(0, 500),
            parseError,
          });
        }
        throw err;
      }

      // Handle server errors (5xx) - these are retryable
      if (response.status >= 500) {
        const err = new ApiError({
          status: response.status,
          message: body?.message ?? `Server error (${response.status})`,
          url,
        });
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

      // Check if we should retry
      const shouldRetry =
        !isLast &&
        (method === 'GET' || isAIEndpoint) &&
        isRetryableError(error, lastStatus);

      if (!shouldRetry) {
        // Only log on final failure to reduce noise
        if (process.env.NODE_ENV === 'development' && !(error instanceof ApiError)) {
          console.error('[apiFetch] Request failed', { url, attempt: attempt + 1, error });
        }
        throw error;
      }

      // Exponential backoff: 500ms, 1s, 2s, 4s, 8s
      const backoffMs = Math.min(500 * Math.pow(2, attempt), 8000);
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[apiFetch] Request failed, retrying in ${backoffMs}ms...`, {
          url,
          attempt: attempt + 1,
          error: error instanceof Error ? error.message : error,
        });
      }
      await wait(backoffMs);
    }
  }

  // Should not reach here
  throw lastError;
}

export type { ApiResponse };
