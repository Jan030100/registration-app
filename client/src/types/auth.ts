export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type RegisterFormErrors = Partial<Record<keyof RegisterFormData, string>>;

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface RegisteredUser {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterSuccessResponse {
  user: RegisteredUser;
}

export interface RegisterErrorResponse {
  error: string;
  details?: Record<string, string>;
}