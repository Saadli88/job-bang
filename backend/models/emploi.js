const mongoose = require('mongoose');

const EmploisSchema = new mongoose.Schema({
  nom_entreprise: { type: String, required: true },
  nom_poste: { type: String, required: true },
  salaire: { type: String, required: true },
  emplacement: { type: String, required: true },
  categorie: { type: String, required: true },
  email_employeur: { type: String, required: true }
});

module.exports = mongoose.model('Emploi', EmploiSchema);
