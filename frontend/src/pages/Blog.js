import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/blog');
        setPosts(data);
      } catch (err) {
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading posts...</div>;
  if (error) return <div style={{ padding: '3rem', textAlign: 'center', color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>Blog</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <Link to={`/blog/${post._id}`}>
              <h2 style={{ marginBottom: '0.4rem', color: '#0f172a' }}>{post.title}</h2>
            </Link>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.6rem' }}>
              By {post.author?.username || 'Unknown'} · {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p style={{ color: '#475569' }}>{post.content.substring(0, 150)}...</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Blog;
