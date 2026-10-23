import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { RegisterFormData, RegisterFormErrors, FormStatus } from '../types/auth';
import './RegisterForm.css';

const INITIAL_FORM: RegisterFormData = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

function validate(form: RegisterFormData): RegisterFormErrors {
  const errors: RegisterFormErrors = {};

  if (!form.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  } else if (form.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!form.password) {
    errors.password = 'Password is required.';
  } else if (form.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status === 'error') {
      setStatus('idle');
      setServerMessage('');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return; 

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setServerMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setServerMessage('Account created successfully!');
      setForm(INITIAL_FORM);
    } catch {
      setStatus('error');
      setServerMessage('Something went wrong. Please try again.');
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <form className="register-form" onSubmit={handleSubmit} noValidate>
      {serverMessage && (
        <div
          className={`form-alert ${status === 'success' ? 'form-alert--success' : 'form-alert--error'}`}
          role="alert"
        >
          {serverMessage}
        </div>
      )}

      <div className="form-field">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          value={form.fullName}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          placeholder="Jane Doe"
        />
        {errors.fullName && (
          <span className="field-error" id="fullName-error" role="alert">
            {errors.fullName}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          placeholder="jane@example.com"
        />
        {errors.email && (
          <span className="field-error" id="email-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? 'password-error' : 'password-hint'}
          placeholder="At least 8 characters"
        />
        {!errors.password && (
          <span className="field-hint" id="password-hint">
            Must be at least {MIN_PASSWORD_LENGTH} characters.
          </span>
        )}
        {errors.password && (
          <span className="field-error" id="password-error" role="alert">
            {errors.password}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={handleChange}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.confirmPassword)}
          aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
          placeholder="Re-enter your password"
        />
        {errors.confirmPassword && (
          <span className="field-error" id="confirmPassword-error" role="alert">
            {errors.confirmPassword}
          </span>
        )}
      </div>

      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account…' : 'Create Account'}
      </button>

      <p className="form-footer">
        Already have an account? <span className="muted">Login (coming in Stage 9)</span>
      </p>
    </form>
  );
}