import RecipeCard from './RecipeCard';

// PUBLIC_INTERFACE
export default function RecipeGrid({ recipes = [] }) {
  /** Responsive grid for displaying recipe cards. */
  if (!recipes.length) {
    return (
      <div className="container" style={{ padding: 24, textAlign: 'center' }}>
        <p style={{ margin: 0, color: 'var(--muted)' }}>No recipes found.</p>
      </div>
    );
  }

  return (
    <div className="card-grid">
      {recipes.map(r => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}
