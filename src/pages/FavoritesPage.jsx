import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_KEY = 'abeaa3f339209d1cd0a549761e3fe4c3';
const API_URL = 'https://api.themoviedb.org/3/movie';

export default function FavoritesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
      const results = [];

      for (const id of favoriteIds) {
        try {
          const res = await fetch(`${API_URL}/${id}?api_key=${API_KEY}&language=pt-BR`);
          const data = await res.json();
          results.push(data);
        } catch (error) {
          console.error('Erro ao buscar favorito:', error);
        }
      }

      setMovies(results);
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  if (loading) return <p>Carregando favoritos...</p>;
  if (movies.length === 0) return <p>Nenhum favorito adicionado ainda.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Meus Favoritos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="bg-white rounded-md shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/500x750?text=Sem+Imagem'
              }
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-3">
              <h3 className="font-bold text-gray-800">{movie.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
