const mongoose = require('mongoose');

const EmploiSchema = new mongoose.Schema({
  nom_entreprise: { type: String, required: true },
  nom_poste: { type: String, required: true },
  salaire: { type: Number, required: true, min: 0 }, 
  emplacement: { type: String, required: true },
  categorie: { type: String, required: true },
  email_employeur: { type: String, required: true, lowercase: true, trim: true }, 
}); 

module.exports = mongoose.model('Emploi', EmploiSchema);
