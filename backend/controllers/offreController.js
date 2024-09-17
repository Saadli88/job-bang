const Offre = require('../models/offre');
const Entreprise = require('../models/entreprise');

exports.createOffre = async (req, res) => {
  const { titre, description, entrepriseId } = req.body;
  try {
    const offre = new Offre({ titre, description, entreprise: entrepriseId });
    await offre.save();
    await Entreprise.findByIdAndUpdate(entrepriseId, { $push: { offres: offre._id } });
    res.status(201).json({ message: 'Offre créée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Ajoute ici les fonctions pour modifier et voir les offres
