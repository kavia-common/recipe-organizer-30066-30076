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
    category: '',
    duration_minutes: 0
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      // Placeholder: fetch recipe by id
      setForm({ title: 'Sample Recipe', description: 'Edit me', category: 'Lunch', duration_minutes: 20 });
    }
  }, [isEdit, id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'duration_minutes' ? Number(value) : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        // await api.put(endpoints.recipes.byId(id), form);
      } else {
        // await api.post(endpoints.recipes.base, form);
      }
      navigate('/');
    } catch (err) {
      // handle error toast later
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
      <textarea className="textarea" name="description" value={form.description} onChange={onChange} rows={5} placeholder="Describe the steps..." />

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr', marginTop: 12 }}>
        <div>
          <label>Category</label>
          <select className="select" name="category" value={form.category} onChange={onChange}>
            <option value="">Select</option>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Dessert</option>
          </select>
        </div>
        <div>
          <label>Duration (minutes)</label>
          <input className="input" type="number" min="0" name="duration_minutes" value={form.duration_minutes} onChange={onChange} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button className="button" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
      </div>
    </form>
  );
}
