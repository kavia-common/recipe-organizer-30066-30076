import { useEffect, useMemo, useState } from 'react';
import { createApiWithToken } from '../api/client';
import { endpoints } from '../api/endpoints';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export function useRecipes() {
  /** Fetches recipe list (prefers backend /search, falls back to mock) and exposes filters */
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
        // Map UI filters to backend query params
        const query = {};
        if (filters?.tag) query.q = String(filters.tag);
        // Note: backend expects category_id (numeric) and tag_ids (list[int]); our simple UI uses names
        // so we only pass q for now.
        const res = await api.get(endpoints.search, { query });
        const items = Array.isArray(res?.items) ? res.items : (Array.isArray(res) ? res : []);
        const normalized = items.map(r => ({
          id: r.id,
          title: r.title,
          description: r.description,
          category: r?.category?.name || '',
          duration_minutes: 0
        }));
        if (mounted) setRecipes(normalized);
      } catch (e) {
        // Fallback to mock data when backend not reachable or errors
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
        if (mounted) setError(e?.message || 'Failed to load from API, showing mock data');
        if (mounted) setRecipes(data);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [api, filters]);

  return { recipes, loading, error, setFilters };
}
