import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function Login() {
  /** Login form page */
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="container" onSubmit={onSubmit} style={{ padding: 24, maxWidth: 480, margin: '0 auto' }}>
      <h2 style={{ marginTop: 0 }}>Login</h2>
      <label>Email</label>
      <input className="input" name="email" type="email" value={form.email} onChange={onChange} required />
      <div style={{ height: 12 }} />
      <label>Password</label>
      <input className="input" name="password" type="password" value={form.password} onChange={onChange} required />
      <div style={{ display: 'flex', gap: 8, marginTop: 16, alignItems: 'center' }}>
        <button className="button" type="submit" disabled={submitting}>{submitting ? 'Logging in...' : 'Login'}</button>
        <Link className="link" to="/register">Create account</Link>
      </div>
    </form>
  );
}
