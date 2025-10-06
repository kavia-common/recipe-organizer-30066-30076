import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function Register() {
  /** Registration form page */
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await registerUser(form.name, form.email, form.password);
      navigate('/login');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="container" onSubmit={onSubmit} style={{ padding: 24, maxWidth: 520, margin: '0 auto' }}>
      <h2 style={{ marginTop: 0 }}>Create account</h2>
      <label>Name</label>
      <input className="input" name="name" value={form.name} onChange={onChange} required />
      <div style={{ height: 12 }} />
      <label>Email</label>
      <input className="input" name="email" type="email" value={form.email} onChange={onChange} required />
      <div style={{ height: 12 }} />
      <label>Password</label>
      <input className="input" name="password" type="password" value={form.password} onChange={onChange} required />
      <div style={{ display: 'flex', gap: 8, marginTop: 16, alignItems: 'center' }}>
        <button className="button secondary" type="submit" disabled={submitting}>{submitting ? 'Registering...' : 'Register'}</button>
        <Link className="link" to="/login">Already have an account?</Link>
      </div>
    </form>
  );
}
