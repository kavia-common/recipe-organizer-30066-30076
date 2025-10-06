import { useState } from 'react';

// PUBLIC_INTERFACE
export default function SidebarFilters({ onChange }) {
  /** Sidebar with placeholder filters for categories and tags. */
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');

  const apply = () => {
    onChange?.({ category, tag });
  };

  return (
    <aside className="sidebar container">
      <h3 style={{ marginTop: 0 }}>Filters</h3>

      <label style={{ display: 'block', marginBottom: 8, color: 'var(--muted)' }}>
        Category
      </label>
      <select className="select" value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">All</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dessert">Dessert</option>
      </select>

      <label style={{ display: 'block', margin: '16px 0 8px', color: 'var(--muted)' }}>
        Tag
      </label>
      <input className="input" placeholder="e.g. quick, vegan" value={tag} onChange={e => setTag(e.target.value)} />

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button className="button" onClick={apply}>Apply</button>
        <button className="button ghost" onClick={() => { setCategory(''); setTag(''); onChange?.({}); }}>Reset</button>
      </div>
    </aside>
  );
}
