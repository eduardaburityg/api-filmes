import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function DetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const API_KEY = 'abeaa3f339209d1cd0a549761e3fe4c3';

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR`
      );
      const data = await response.json();
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchSimilar = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=pt-BR&page=1`
      );
      const data = await response.json();
      setSimilar(data.results || []);
    };
    fetchSimilar();
  }, [id]);

  if (!movie) return <p className="text-center mt-10 text-white">Carregando...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-6 text-gray-100">
      {/* Detalhes do filme */}
      <div className="bg-gray-900 shadow-md rounded-md overflow-hidden flex flex-col md:flex-row">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=Sem+Imagem'
          }
          alt={movie.title}
          className="w-full md:w-64 h-auto object-cover"
        />
        <div className="p-4 flex-1">
          <h1 className="text-3xl font-bold mb-2 text-white">{movie.title}</h1>
          <p className="text-sm text-gray-400 mb-2">Lançamento: {movie.release_date}</p>
          <p className="text-sm text-yellow-500 mb-4">Avaliação: {movie.vote_average} / 10</p>
          <p className="text-gray-200 mb-4">{movie.overview}</p>
          <Link
            to="/"
            className="inline-block px-4 py-2 bg-primary-500 rounded hover:bg-primary-600 transition"
          >
            Voltar
          </Link>
        </div>
      </div>

      {/* Filmes similares */}
      {similar.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Filmes similares</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {similar.map((s) => (
              <Link key={s.id} to={`/movie/${s.id}`} className="group">
                <div className="bg-gray-800 rounded overflow-hidden shadow hover:scale-105 transform transition">
                  <img
                    src={
                      s.poster_path
                        ? `https://image.tmdb.org/t/p/w500${s.poster_path}`
                        : 'https://via.placeholder.com/500x750?text=Sem+Imagem'
                    }
                    alt={s.title}
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-sm font-bold group-hover:text-primary-500">{s.title}</h3>
                    <p className="text-xs text-gray-400">{s.release_date || 'Data desconhecida'}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
