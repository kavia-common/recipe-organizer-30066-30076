import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function Navbar({ onToggleTheme, theme }) {
  /** Top navigation with branding, search, links, and auth actions */
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onCreate = () => navigate('/create');

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" aria-label="Recipe Organizer Home">
          <div className="brand-badge" />
          <span>Recipe Organizer</span>
          <span className="badge">Ocean</span>
        </Link>

        <nav className="nav-links">
          <Link className="button ghost" to="/">Home</Link>
          <button className="button ghost" onClick={onCreate}>New Recipe</button>
        </nav>

        <div className="nav-spacer" />

        {location.pathname === '/' ? (
          <div className="searchbar" role="search">
            <span aria-hidden>🔎</span>
            <input aria-label="Search recipes" placeholder="Search recipes..." onChange={() => {}} />
          </div>
        ) : null}

        <div style={{ display: 'flex', gap: 8, marginLeft: 12 }}>
          <button className="button ghost" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {token ? (
            <>
              <Link className="button ghost" to="/profile">Profile</Link>
              <button className="button" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="button ghost" to="/login">Login</Link>
              <Link className="button secondary" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
