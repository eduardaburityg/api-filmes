const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/';

if (!API_KEY) {
  console.warn('VITE_TMDB_KEY não encontrado. Defina a chave em .env (VITE_TMDB_KEY)');
}

async function request(path, params = {}) {
  if (!API_KEY) throw new Error('TMDB API key missing. Add VITE_TMDB_KEY to .env');
  const url = new URL(BASE + path);
  url.searchParams.set('api_key', API_KEY);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  });
  const res = await fetch(url.toString());
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TMDB error ${res.status}: ${text}`);
  }
  return res.json();
}

export const searchMovies = (query, page = 1) =>
  request('/search/movie', { query, page, include_adult: false });

export const getMovieDetails = (id) =>
  request(`/movie/${id}`, { append_to_response: 'credits' });

export const getImageUrl = (path, size = 'w342') =>
  path ? `${IMG_BASE}${size}${path}` : null;
