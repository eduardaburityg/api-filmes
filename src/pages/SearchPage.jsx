import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const API_KEY = 'abeaa3f339209d1cd0a549761e3fe4c3';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Buscar filmes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 rounded bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 bg-primary-500 rounded hover:bg-primary-600 transition"
        >
          Buscar
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="group">
            <div className="bg-gray-800 rounded overflow-hidden shadow hover:scale-105 transform transition">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=Sem+Imagem'
                }
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-2">
                <h2 className="text-sm font-bold group-hover:text-primary-500">{movie.title}</h2>
                <p className="text-xs text-gray-400">
                  {movie.release_date || 'Data desconhecida'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
