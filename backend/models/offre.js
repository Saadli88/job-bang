const mongoose = require('mongoose');

const OffreSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  entreprise: { type: mongoose.Schema.Types.ObjectId, ref: 'Entreprise', required: true }
});

module.exports = mongoose.model('Offre', OffreSchema);
