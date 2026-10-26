import { useState, useEffect } from 'react';
import api from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        setProjects(data);
      } catch (err) {
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading projects...</div>;
  if (error) return <div style={{ padding: '3rem', textAlign: 'center', color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>My Projects</h1>
      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {projects.map((p) => (
            <div key={p._id} style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>{p.title}</h3>
              <p style={{ color: '#64748b', marginBottom: '1rem', fontSize: '0.95rem' }}>{p.description}</p>
              <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.9rem' }}>
                {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ color: '#0ea5e9' }}>Live Demo</a>}
                {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noreferrer" style={{ color: '#0ea5e9' }}>GitHub</a>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
