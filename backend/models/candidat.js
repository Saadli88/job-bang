const mongoose = require('mongoose');

const CandidatSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  motDePasse: { type: String, required: true, minlength: 6 }, 
}); 

module.exports = mongoose.model('Candidat', CandidatSchema);
