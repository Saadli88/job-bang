const mongoose = require('mongoose');

const CandidatSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true }
});

module.exports = mongoose.model('Candidat', CandidatSchema);
