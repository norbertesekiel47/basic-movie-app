import SearchStat from '../models/SearchStat.js';

/**
 * Increment (or create) a search stat document.
 * Body: { searchTerm?: string, movie: { id: number, title: string, poster_path?: string } }
 */
export const increment = async (req, res) => {
  try {
    const { searchTerm = null, movie } = req.body || {};
    if (!movie || typeof movie.id !== 'number') {
      return res.status(400).json({ error: 'Missing or invalid movie { id }' });
    }
    const query = { movieId: movie.id };
    if (searchTerm) query.searchTerm = searchTerm;

    const update = {
      $setOnInsert: {
        movieId: movie.id,
        title: movie.title || movie.name || '',
        posterPath: movie.poster_path || null,
        searchTerm: searchTerm || null,
      },
      $inc: { count: 1 },
    };

    const doc = await SearchStat.findOneAndUpdate(query, update, { new: true, upsert: true });
    return res.json(doc);
  } catch (err) {
    console.error('increment error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * GET /api/search-stats/trending?limit=5
 * Returns top docs sorted by count desc
 */
export const trending = async (req, res) => {
  try {
    const limit = Math.max(1, Math.min(50, Number(req.query.limit) || 5));
    const docs = await SearchStat.find({}).sort({ count: -1, updatedAt: -1 }).limit(limit).lean();
    return res.json(docs);
  } catch (err) {
    console.error('trending error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
