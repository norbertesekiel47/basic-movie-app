const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

/**
 * Increment search count (or create it) for a given movie and optional searchTerm.
 * Kept the original (typo'd) name to avoid breaking imports: updateSearachCount
 */
export const updateSearachCount = async (searchTerm, movie) => {
  try {
    const res = await fetch(`${API_BASE}/api/search-stats`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchTerm, movie }),
    });
    if (!res.ok) throw new Error(`Bad response: ${res.status}`);
    const doc = await res.json();
    return doc; // { movieId, title, posterPath, count, ... }
  } catch (err) {
    console.error('updateSearachCount failed:', err);
    return null;
  }
};

/**
 * Fetch top-N trending movies. We map the fields so MovieCard keeps working:
 *   - id           -> doc.movieId
 *   - poster_path  -> doc.posterPath
 *   - title        -> doc.title
 *   - vote_average / release_date / original_language are optional in your UI,
 *     so we provide safe defaults.
 */
export const getTrendingMovies = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/search-stats/trending?limit=5`);
    if (!res.ok) throw new Error(`Bad response: ${res.status}`);
    const docs = await res.json(); // [{ movieId, title, posterPath, count, ...}, ...]

    return docs.map(d => ({
      _id: d._id || d.movieId,  // for React key prop
      id: d.movieId,
      title: d.title ?? 'Unknown',
      poster_path: d.posterPath ?? null,
      vote_average: 0,            // default
      release_date: '',           // default
      original_language: 'en',    // default
    }));
  } catch (err) {
    console.error('getTrendingMovies failed:', err);
    return [];
  }
};