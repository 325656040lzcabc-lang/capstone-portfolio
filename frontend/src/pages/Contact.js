import { useState } from 'react';
import api from '../services/api';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      await api.post('/contact', form);
      setStatus('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus(err.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Contact Me</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required style={inputStyle} />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your Email" required style={inputStyle} />
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" rows={5} required style={inputStyle} />
        <button type="submit" disabled={loading} style={{ background: '#0ea5e9', color: '#fff', border: 'none', padding: '0.8rem', borderRadius: 8, fontWeight: 600 }}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {status && <p style={{ marginTop: '1rem', color: status.includes('success') ? 'green' : 'red' }}>{status}</p>}
    </div>
  );
};

const inputStyle = { padding: '0.8rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '1rem' };

export default Contact;
