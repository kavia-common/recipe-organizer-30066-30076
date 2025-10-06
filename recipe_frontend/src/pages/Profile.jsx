import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createApiWithToken } from '../api/client';
import { endpoints } from '../api/endpoints';

// PUBLIC_INTERFACE
export default function Profile() {
  /** User profile page */
  const { token } = useAuth();
  const api = createApiWithToken(() => token);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (token) {
          const data = await api.get(endpoints.auth.profile);
          setProfile({
            id: data.id,
            name: data.full_name || '',
            email: data.email
          });
        } else {
          setProfile({ id: 'guest', name: 'Guest', email: 'guest@example.com' });
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        setProfile({ id: 'guest', name: 'Guest', email: 'guest@example.com' });
      }
    })();
  }, [api, token]);

  if (!profile) return <div className="container" style={{ padding: 24 }}>Loading profile...</div>;

  return (
    <div className="container" style={{ padding: 24, maxWidth: 720, margin: '0 auto' }}>
      <h2 style={{ marginTop: 0 }}>Your Profile</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
        <div className="badge">Name</div>
        <div>{profile.name || '—'}</div>
        <div className="badge">Email</div>
        <div>{profile.email}</div>
      </div>
    </div>
  );
}
