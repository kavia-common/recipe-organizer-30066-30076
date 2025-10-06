# API Configuration

- Set REACT_APP_API_BASE_URL in .env (default used: http://localhost:3001).
- Backend CORS must allow http://localhost:3000. The backend reads FRONTEND_ORIGIN or SITE_URL from its .env.

Example .env:
REACT_APP_API_BASE_URL=http://localhost:3001

The app will attach Authorization: Bearer <token> when available. Ensure you register/login first to obtain a token.
