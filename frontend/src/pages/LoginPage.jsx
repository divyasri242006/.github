import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 to-slate-100">
      <form className="card w-full max-w-md space-y-4" onSubmit={submit}>
        <h1 className="text-2xl font-bold">Hospital Secure Login</h1>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input className="input" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn-primary w-full" type="submit">Sign In</button>
        <p className="text-sm text-slate-600">No account? <Link to="/signup" className="text-teal-700">Sign up</Link></p>
      </form>
    </div>
  );
}
