import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(form.username, form.email, form.password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '3rem auto', padding: '0 1.5rem' }}>
      <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Register</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required style={inputStyle} />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required style={inputStyle} />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password (min 6)" required minLength={6} style={inputStyle} />
        <button type="submit" disabled={loading} style={btnStyle}>{loading ? 'Registering...' : 'Register'}</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
      <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        Already have an account? <Link to="/login" style={{ color: '#0ea5e9' }}>Login</Link>
      </p>
    </div>
  );
};

const inputStyle = { padding: '0.8rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '1rem' };
const btnStyle = { background: '#0ea5e9', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: 8, fontWeight: 600 };

export default Register;
