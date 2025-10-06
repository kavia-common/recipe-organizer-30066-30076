import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createApiWithToken } from '../api/client';
import { endpoints } from '../api/endpoints';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function CreateEditRecipe({ mode = 'create' }) {
  /** Create or Edit recipe form */
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = mode === 'edit' || !!id;
  const { token } = useAuth();
  const api = createApiWithToken(() => token);

  const [form, setForm] = useState({
    title: '',
    description: '',
    instructions: '',
    ingredients: '',
    category_id: '',
    tag_ids: []
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      if (isEdit && id) {
        try {
          const data = await api.get(endpoints.recipes.byId(id));
          setForm({
            title: data.title || '',
            description: data.description || '',
            instructions: data.instructions || '',
            ingredients: data.ingredients || '',
            category_id: data?.category?.id || '',
            tag_ids: (data?.tags || []).map(t => t.id)
          });
        } catch {
          // fallback placeholder
          setForm({ title: 'Sample Recipe', description: 'Edit me', instructions: 'Do stuff', ingredients: 'Salt', category_id: '', tag_ids: [] });
        }
      }
    })();
  }, [isEdit, id]); // eslint-disable-line react-hooks/exhaustive-deps

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        description: form.description || null,
        instructions: form.instructions,
        ingredients: form.ingredients,
        category_id: form.category_id ? Number(form.category_id) : null,
        tag_ids: Array.isArray(form.tag_ids) ? form.tag_ids : []
      };
      if (isEdit) {
        await api.patch(endpoints.recipes.byId(id), payload);
      } else {
        await api.post(endpoints.recipes.base, payload);
      }
      navigate('/');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="container" onSubmit={onSubmit} style={{ padding: 24, maxWidth: 720, margin: '0 auto' }}>
      <h2 style={{ marginTop: 0 }}>{isEdit ? 'Edit Recipe' : 'Create Recipe'}</h2>

      <label>Title</label>
      <input className="input" name="title" value={form.title} onChange={onChange} required placeholder="e.g. Lemon Garlic Chicken" />

      <div style={{ height: 12 }} />

      <label>Description</label>
      <textarea className="textarea" name="description" value={form.description} onChange={onChange} rows={3} placeholder="Short description (optional)" />

      <div style={{ height: 12 }} />

      <label>Instructions</label>
      <textarea className="textarea" name="instructions" value={form.instructions} onChange={onChange} rows={6} required placeholder="Describe the steps..." />

      <div style={{ height: 12 }} />

      <label>Ingredients (one per line)</label>
      <textarea className="textarea" name="ingredients" value={form.ingredients} onChange={onChange} rows={5} required placeholder="e.g. 2 eggs&#10;1 tsp salt" />

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr', marginTop: 12 }}>
        <div>
          <label>Category ID (optional)</label>
          <input className="input" name="category_id" value={form.category_id} onChange={onChange} placeholder="e.g. 1" />
        </div>
        <div>
          <label>Tag IDs (comma separated, optional)</label>
          <input
            className="input"
            name="tag_ids"
            value={Array.isArray(form.tag_ids) ? form.tag_ids.join(',') : ''}
            onChange={(e) => {
              const val = e.target.value;
              const ids = val.split(',').map(s => s.trim()).filter(Boolean).map(n => Number(n)).filter(n => !Number.isNaN(n));
              setForm(prev => ({ ...prev, tag_ids: ids }));
            }}
            placeholder="e.g. 1,2,3"
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button className="button" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
}
