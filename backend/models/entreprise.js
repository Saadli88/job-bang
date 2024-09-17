const mongoose = require('mongoose');

const EntrepriseSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  offres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offre' }]
});

module.exports = mongoose.model('Entreprise', EntrepriseSchema);
