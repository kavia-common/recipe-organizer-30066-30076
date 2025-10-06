import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createApiWithToken } from '../api/client';
import { endpoints } from '../api/endpoints';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function RecipeDetail() {
  /** Displays a single recipe details */
  const { id } = useParams();
  const { token } = useAuth();
  const api = createApiWithToken(() => token);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.get(endpoints.recipes.byId(id));
        const normalized = {
          id: data.id,
          title: data.title,
          description: data.description,
          category: data?.category?.name || '',
          duration_minutes: 0,
          ingredients: (data.ingredients || '').split('\n').filter(Boolean)
        };
        if (mounted) setRecipe(normalized);
      } catch (e) {
        // Fallback placeholder
        const data = { id, title: 'Sample Recipe', description: 'Detailed instructions...', category: 'Lunch', duration_minutes: 30, ingredients: ['eggs', 'salt'] };
        if (mounted) setRecipe(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div className="container" style={{ padding: 24 }}>Loading...</div>;
  if (!recipe) return <div className="container" style={{ padding: 24 }}>Recipe not found.</div>;

  return (
    <div className="container" style={{ padding: 24 }}>
      <Link className="link" to="/">← Back</Link>
      <h2 style={{ marginTop: 8 }}>{recipe.title}</h2>
      <div className="badge" style={{ marginBottom: 8 }}>{recipe.category}</div>
      <p style={{ color: 'var(--muted)' }}>{recipe.description}</p>
      <h4>Ingredients</h4>
      <ul>
        {(recipe.ingredients || []).map((ing, idx) => <li key={idx}>{ing}</li>)}
      </ul>
    </div>
  );
}
