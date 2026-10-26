import { useState, useEffect } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Project form
  const [pForm, setPForm] = useState({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
  const [editProjectId, setEditProjectId] = useState(null);

  // Blog form
  const [bForm, setBForm] = useState({ title: '', content: '' });
  const [editPostId, setEditPostId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pRes, bRes] = await Promise.all([api.get('/projects'), api.get('/blog')]);
      setProjects(pRes.data);
      setPosts(bRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // ===== Projects =====
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProjectId) {
        await api.put(`/projects/${editProjectId}`, pForm);
      } else {
        await api.post('/projects', pForm);
      }
      setPForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
      setEditProjectId(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  const editProject = (p) => {
    setPForm({ title: p.title, description: p.description, imageUrl: p.imageUrl || '', repoUrl: p.repoUrl || '', liveUrl: p.liveUrl || '' });
    setEditProjectId(p._id);
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  // ===== Blog =====
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editPostId) {
        await api.put(`/blog/${editPostId}`, bForm);
      } else {
        await api.post('/blog', bForm);
      }
      setBForm({ title: '', content: '' });
      setEditPostId(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  const editPost = (p) => {
    setBForm({ title: p.title, content: p.content });
    setEditPostId(p._id);
  };

  const deletePost = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await api.delete(`/blog/${id}`);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading dashboard...</div>;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Admin Dashboard</h1>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => setTab('projects')} style={tab === 'projects' ? activeTab : tabStyle}>Projects</button>
        <button onClick={() => setTab('blog')} style={tab === 'blog' ? activeTab : tabStyle}>Blog Posts</button>
      </div>

      {tab === 'projects' && (
        <div>
          <h2 style={{ marginBottom: '1rem' }}>{editProjectId ? 'Edit Project' : 'Create Project'}</h2>
          <form onSubmit={handleProjectSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem', maxWidth: 500 }}>
            <input placeholder="Title" value={pForm.title} onChange={(e) => setPForm({ ...pForm, title: e.target.value })} required style={inputStyle} />
            <textarea placeholder="Description" value={pForm.description} onChange={(e) => setPForm({ ...pForm, description: e.target.value })} required rows={3} style={inputStyle} />
            <input placeholder="Image URL" value={pForm.imageUrl} onChange={(e) => setPForm({ ...pForm, imageUrl: e.target.value })} style={inputStyle} />
            <input placeholder="Repo URL" value={pForm.repoUrl} onChange={(e) => setPForm({ ...pForm, repoUrl: e.target.value })} style={inputStyle} />
            <input placeholder="Live URL" value={pForm.liveUrl} onChange={(e) => setPForm({ ...pForm, liveUrl: e.target.value })} style={inputStyle} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" style={btnStyle}>{editProjectId ? 'Update' : 'Create'}</button>
              {editProjectId && <button type="button" onClick={() => { setEditProjectId(null); setPForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' }); }} style={{ ...btnStyle, background: '#64748b' }}>Cancel</button>}
            </div>
          </form>

          <h3 style={{ marginBottom: '1rem' }}>All Projects</h3>
          {projects.map((p) => (
            <div key={p._id} style={cardStyle}>
              <strong>{p.title}</strong>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button onClick={() => editProject(p)} style={smallBtn}>Edit</button>
                <button onClick={() => deleteProject(p._id)} style={{ ...smallBtn, background: '#ef4444' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'blog' && (
        <div>
          <h2 style={{ marginBottom: '1rem' }}>{editPostId ? 'Edit Post' : 'Create Post'}</h2>
          <form onSubmit={handlePostSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem', maxWidth: 600 }}>
            <input placeholder="Title" value={bForm.title} onChange={(e) => setBForm({ ...bForm, title: e.target.value })} required style={inputStyle} />
            <textarea placeholder="Content" value={bForm.content} onChange={(e) => setBForm({ ...bForm, content: e.target.value })} required rows={6} style={inputStyle} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" style={btnStyle}>{editPostId ? 'Update' : 'Create'}</button>
              {editPostId && <button type="button" onClick={() => { setEditPostId(null); setBForm({ title: '', content: '' }); }} style={{ ...btnStyle, background: '#64748b' }}>Cancel</button>}
            </div>
          </form>

          <h3 style={{ marginBottom: '1rem' }}>All Posts</h3>
          {posts.map((p) => (
            <div key={p._id} style={cardStyle}>
              <strong>{p.title}</strong>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button onClick={() => editPost(p)} style={smallBtn}>Edit</button>
                <button onClick={() => deletePost(p._id)} style={{ ...smallBtn, background: '#ef4444' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const inputStyle = { padding: '0.7rem', borderRadius: 8, border: '1px solid #cbd5e1' };
const btnStyle = { background: '#0ea5e9', color: '#fff', border: 'none', padding: '0.7rem 1.2rem', borderRadius: 8, fontWeight: 600 };
const smallBtn = { background: '#0ea5e9', color: '#fff', border: 'none', padding: '0.3rem 0.7rem', borderRadius: 6, fontSize: '0.85rem' };
const tabStyle = { padding: '0.5rem 1.2rem', border: '1px solid #cbd5e1', borderRadius: 8, background: '#fff' };
const activeTab = { ...tabStyle, background: '#0ea5e9', color: '#fff', borderColor: '#0ea5e9' };
const cardStyle = { background: '#fff', padding: '1rem', borderRadius: 8, marginBottom: '0.8rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' };

export default AdminDashboard;
