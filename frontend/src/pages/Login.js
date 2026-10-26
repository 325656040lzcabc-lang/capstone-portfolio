import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '3rem auto', padding: '0 1.5rem' }}>
      <h1 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required style={inputStyle} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required style={inputStyle} />
        <button type="submit" disabled={loading} style={btnStyle}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
      <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        Don't have an account? <Link to="/register" style={{ color: '#0ea5e9' }}>Register</Link>
      </p>
    </div>
  );
};

const inputStyle = { padding: '0.8rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '1rem' };
const btnStyle = { background: '#0ea5e9', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: 8, fontWeight: 600 };

export default Login;
