const mongoose = require('mongoose');

const EmployeurSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: {type: String, required: true},
  offres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Emploi' }]
});

module.exports = mongoose.model('Employeur', EmployeurSchema);
