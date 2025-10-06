import { useEffect, useMemo, useState } from 'react';
import { createApiWithToken } from '../api/client';
import { endpoints } from '../api/endpoints';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export function useRecipes() {
  /** Fetches recipe list (mock for now) and exposes filters */
  const { token } = useAuth();
  const api = useMemo(() => createApiWithToken(() => token), [token]);

  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        // const data = await api.get(endpoints.recipes.base, { query: filters });
        // Placeholder mock:
        const data = [
          { id: '1', title: 'Ocean Salad', description: 'Fresh greens with citrus dressing', category: 'Lunch', duration_minutes: 10 },
          { id: '2', title: 'Amber Curry', description: 'Warm, spicy, and comforting', category: 'Dinner', duration_minutes: 45 },
          { id: '3', title: 'Blueberry Muffins', description: 'Sweet breakfast treat', category: 'Breakfast', duration_minutes: 25 }
        ].filter(r => {
          if (filters?.category && r.category !== filters.category) return false;
          if (filters?.tag) {
            const t = String(filters.tag).toLowerCase();
            return r.title.toLowerCase().includes(t) || r.description.toLowerCase().includes(t);
          }
          return true;
        });
        if (mounted) setRecipes(data);
      } catch (e) {
        if (mounted) setError(e?.message || 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [api, filters]);

  return { recipes, loading, error, setFilters };
}
