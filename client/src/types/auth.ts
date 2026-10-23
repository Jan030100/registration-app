export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type RegisterFormErrors = Partial<Record<keyof RegisterFormData, string>>;

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';