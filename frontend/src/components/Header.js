import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>MyPortfolio</Link>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/projects" style={styles.link}>Projects</Link>
          <Link to="/blog" style={styles.link}>Blog</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
          {user ? (
            <>
              <Link to="/admin" style={styles.link}>Admin</Link>
              <button onClick={handleLogout} style={styles.btn}>Logout ({user.username})</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.link}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

const styles = {
  header: { background: '#0f172a', color: '#fff', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 100 },
  container: { maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { fontSize: '1.4rem', fontWeight: 700, color: '#38bdf8' },
  nav: { display: 'flex', gap: '1.2rem', alignItems: 'center', flexWrap: 'wrap' },
  link: { color: '#e2e8f0', fontSize: '0.95rem' },
  btn: { background: '#ef4444', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 6, fontSize: '0.9rem' }
};

export default Header;
