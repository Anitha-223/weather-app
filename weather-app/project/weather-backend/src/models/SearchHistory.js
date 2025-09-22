const mongoose = require('mongoose');

const SearchHistorySchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String },
  searchedAt: { type: Date, default: Date.now },
  summary: { type: Object },
  raw: { type: Object }
});

module.exports = mongoose.model('SearchHistory', SearchHistorySchema);
