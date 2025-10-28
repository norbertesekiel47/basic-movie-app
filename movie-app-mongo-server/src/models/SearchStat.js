import mongoose from 'mongoose';

const SearchStatSchema = new mongoose.Schema({
  searchTerm: { type: String, index: true },
  movieId: { type: Number, index: true },
  title: { type: String },
  posterPath: { type: String },
  count: { type: Number, default: 0 },
}, { timestamps: true });

// Ensure one record per movie+searchTerm (or just per movie if that's your logic)
SearchStatSchema.index({ movieId: 1, searchTerm: 1 }, { unique: true, sparse: true });

export default mongoose.model('SearchStat', SearchStatSchema);
