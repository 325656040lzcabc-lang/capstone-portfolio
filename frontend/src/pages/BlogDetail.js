import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchPost = async () => {
    try {
      const { data } = await api.get(`/blog/${id}`);
      setPost(data);
    } catch (err) {
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true);
    try {
      await api.post(`/blog/${id}/comments`, { body: comment });
      setComment('');
      fetchPost();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading...</div>;
  if (error) return <div style={{ padding: '3rem', textAlign: 'center', color: 'red' }}>{error}</div>;
  if (!post) return null;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>{post.title}</h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        By {post.author?.username} · {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div style={{ whiteSpace: 'pre-wrap', marginBottom: '3rem', lineHeight: 1.8 }}>{post.content}</div>

      <h3 style={{ marginBottom: '1rem' }}>Comments ({post.comments?.length || 0})</h3>

      {user ? (
        <form onSubmit={handleComment} style={{ marginBottom: '2rem' }}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            rows={3}
            style={{ width: '100%', padding: '0.8rem', borderRadius: 8, border: '1px solid #cbd5e1', marginBottom: '0.8rem' }}
          />
          <button type="submit" disabled={submitting} style={{ background: '#0ea5e9', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: 8 }}>
            {submitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <p style={{ marginBottom: '1.5rem', color: '#64748b' }}>Please <a href="/login" style={{ color: '#0ea5e9' }}>login</a> to comment.</p>
      )}

      {post.comments?.map((c) => (
        <div key={c._id} style={{ background: '#f1f5f9', padding: '1rem', borderRadius: 8, marginBottom: '0.8rem' }}>
          <strong>{c.author?.username}</strong>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem', marginLeft: '0.5rem' }}>
            {new Date(c.createdAt).toLocaleDateString()}
          </span>
          <p style={{ marginTop: '0.4rem' }}>{c.body}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogDetail;
