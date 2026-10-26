const Home = () => (
  <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1.5rem' }}>
    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Hi, I'm a Full-Stack Developer</h1>
    <p style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '2rem' }}>
      Welcome to my personal portfolio and blog. This is my Capstone Project for Web Data Management and Application.
      I build modern web applications using the MERN stack.
    </p>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <a href="/projects" style={btnStyle}>View Projects</a>
      <a href="/blog" style={{ ...btnStyle, background: '#0f172a' }}>Read Blog</a>
    </div>
  </div>
);

const btnStyle = {
  display: 'inline-block',
  background: '#0ea5e9',
  color: '#fff',
  padding: '0.75rem 1.5rem',
  borderRadius: 8,
  fontWeight: 600
};

export default Home;
