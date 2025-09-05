import { Link } from 'react-router-dom'
import { getImageUrl } from '../api/tmdb'
import useLocalStorage from '../hooks/useLocalStorage'

export default function MovieCard({ movie }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const isFav = favorites.some(f => String(f.id) === String(movie.id));

  function toggleFav() {
    if (isFav) {
      setFavorites(favorites.filter(f => String(f.id) !== String(movie.id)));
    } else {
      const min = { id: movie.id, title: movie.title, poster_path: movie.poster_path, release_date: movie.release_date };
      setFavorites([ ...favorites, min ]);
    }
  }

  const poster = getImageUrl(movie.poster_path, 'w342');

  return (
    <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
      <div className="w-full h-56 bg-gray-100 flex items-center justify-center">
        {poster ? (
          <img src={poster} alt={movie.title} className="poster-img" />
        ) : (
          <div className="text-gray-500">Sem imagem</div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold leading-tight">{movie.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{movie.release_date ? movie.release_date.slice(0,4) : '—'}</p>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Link
            to={`/movie/${movie.id}`}
            className="inline-block px-3 py-2 text-sm bg-primary-500 text-white rounded-md hover:bg-primary-600"
          >
            Detalhes
          </Link>
          <button
            onClick={toggleFav}
            className={`inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md ${isFav ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-800'} hover:opacity-95`}
            aria-pressed={isFav}
          >
            {isFav ? 'Remover' : 'Favoritar'}
          </button>
        </div>
      </div>
    </article>
  )
}
