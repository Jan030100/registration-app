import RegisterForm from '../components/RegisterForm';
import './RegisterPage.css';

export default function RegisterPage() {
  return (
    <main className="register-page">
      <div className="register-card">
        <header className="register-header">
          <h1>Create your account</h1>
          <p>Join us — it only takes a minute.</p>
        </header>
        <RegisterForm />
      </div>
    </main>
  );
}