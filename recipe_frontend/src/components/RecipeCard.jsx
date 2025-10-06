import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe }) {
  /** Displays a single recipe summary as a card. */
  const { id, title, description, category, duration_minutes = 0 } = recipe || {};
  return (
    <article className="card">
      <div className="card-media" />
      <div className="card-body">
        <h3 className="card-title">{title || 'Untitled recipe'}</h3>
        <div className="card-meta">
          {category ? <span className="badge">{category}</span> : null}
          <span className="badge" title="Duration">{duration_minutes}m</span>
        </div>
        <p style={{ margin: 0, color: 'var(--muted)', minHeight: 38 }}>
          {description || 'No description provided.'}
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <Link to={`/recipes/${id}`} className="button">View</Link>
          <Link to={`/edit/${id}`} className="button ghost">Edit</Link>
        </div>
      </div>
    </article>
  );
}
