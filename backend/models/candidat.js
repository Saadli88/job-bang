const mongoose = require('mongoose');

const CandidatSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  mot_de_passe: { type: String, required: true, minlength: 6 }, 
  liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Emploi' }]
}); 

module.exports = mongoose.model('Candidat', CandidatSchema);
