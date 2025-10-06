import SidebarFilters from '../components/SidebarFilters';
import RecipeGrid from '../components/RecipeGrid';
import { useRecipes } from '../hooks/useRecipes';

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page with search, filters, and recipe list */
  const { recipes, loading, error, setFilters } = useRecipes();

  return (
    <div className="layout" role="region" aria-label="Recipe browser">
      <div>
        <SidebarFilters onChange={setFilters} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {loading && <div className="container" style={{ padding: 24 }}>Loading recipes...</div>}
        {error && <div className="container" style={{ padding: 24, color: 'var(--error)' }}>{String(error)}</div>}
        {!loading && !error && <RecipeGrid recipes={recipes} />}
      </div>
    </div>
  );
}
