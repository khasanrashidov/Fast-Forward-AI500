import { API_BASE_URL } from "./config";

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
    this.name = "ApiError";
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

export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  let body: ApiResponse<T> | undefined;

  try {
    body = await response.json();
  } catch (error) {
    throw new ApiError({
      status: response.status,
      message: "Invalid JSON response from API.",
      url,
    });
  }

  if (!response.ok || !body?.is_success) {
    throw new ApiError({
      status: response.status,
      message: body?.message ?? "API request failed.",
      url,
    });
  }

  return body;
}

export type { ApiResponse };
