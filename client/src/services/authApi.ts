import type {
  RegisterFormData,
  RegisteredUser,
  RegisterErrorResponse,
} from '../types/auth';

const API_BASE_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export class ApiRequestError extends Error {
  public readonly status: number;
  public readonly details?: Record<string, string>;

  constructor(status: number, message: string, details?: Record<string, string>) {
    super(message);
    this.status = status;
    this.details = details;
    this.name = 'ApiRequestError';
    Object.setPrototypeOf(this, ApiRequestError.prototype);
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export async function registerUser(payload: RegisterFormData): Promise<RegisteredUser> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new NetworkError('Could not reach the server. Check your connection and try again.');
  }

  let data: RegisterErrorResponse | { user: RegisteredUser } | null = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const errorBody = data as RegisterErrorResponse | null;
    const message = errorBody?.error ?? 'Something went wrong. Please try again.';
    throw new ApiRequestError(response.status, message, errorBody?.details);
  }

  const successBody = data as { user: RegisteredUser } | null;
  if (!successBody?.user) {
    throw new ApiRequestError(500, 'Unexpected server response.');
  }

  return successBody.user;
}