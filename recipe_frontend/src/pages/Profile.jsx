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
        // const data = await api.get(endpoints.auth.profile);
        const data = { id: 'me', name: 'Ocean User', email: 'ocean@example.com' };
        setProfile(data);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    })();
  }, [api]);

  if (!profile) return <div className="container" style={{ padding: 24 }}>Loading profile...</div>;

  return (
    <div className="container" style={{ padding: 24, maxWidth: 720, margin: '0 auto' }}>
      <h2 style={{ marginTop: 0 }}>Your Profile</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
        <div className="badge">Name</div>
        <div>{profile.name}</div>
        <div className="badge">Email</div>
        <div>{profile.email}</div>
      </div>
    </div>
  );
}
