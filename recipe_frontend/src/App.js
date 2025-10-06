import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import CreateEditRecipe from './pages/CreateEditRecipe';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// PUBLIC_INTERFACE
export default function App() {
  /** App shell with Ocean Professional theme and app routes */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-root">
      <Navbar onToggleTheme={handleToggleTheme} theme={theme} />
      <main className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/create" element={<CreateEditRecipe mode="create" />} />
          <Route path="/edit/:id" element={<CreateEditRecipe mode="edit" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <span>Recipe Organizer</span>
      </footer>
    </div>
  );
}
