export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    profile: '/users/me'
  },
  recipes: {
    base: '/recipes',
    byId: (id) => `/recipes/${id}`,
    search: '/recipes/search',
    my: '/recipes/mine'
  },
  health: '/'
};

// PUBLIC_INTERFACE
export function buildUrl(base, path) {
  /** Joins base and path into a valid URL without double slashes */
  const a = base?.replace(/\/+$/, '') ?? '';
  const b = path?.replace(/^\/+/, '') ?? '';
  return `${a}/${b}`;
}
