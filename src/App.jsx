import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SearchPage from './pages/SearchPage.jsx';
import DetailsPage from './pages/DetailsPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-dark text-gray-100 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-gray-900 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-md text-white text-lg font-bold">
              🎬
            </div>
            <h1 className="text-xl font-bold text-white">MovieStream</h1>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="hover:text-primary-500 transition">Buscar</Link>
            <Link to="/favorites" className="hover:text-primary-500 transition">Favoritos</Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:id" element={<DetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="mt-10 py-6 bg-gray-900 text-gray-400 text-center">
        Projeto MovieStream • Consumo TMDB • Feito por Eduarda Gonçalves ❤️
      </footer>
    </div>
  );
}
