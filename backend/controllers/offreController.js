const Offre = require('../models/offre');
const Entreprise = require('../models/entreprise');


exports.createOffre = async (req, res) => {
  const { titre, description, sector, salaire, entrepriseId } = req.body;
  try {
    const offre = new Offre({ titre, description, sector, salaire, entreprise: entrepriseId });
    await offre.save();
    await Entreprise.findByIdAndUpdate(entrepriseId, { $push: { offres: offre._id } });
    res.status(201).json({ message: 'Offre créée avec succès', offre });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllOffres = async (req, res) => {
  try {
    const offres = await Offre.find().populate('entreprise', 'name'); // Populating entreprise details (e.g., 'name')
    res.status(200).json(offres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getOffreById = async (req, res) => {
  const { id } = req.params;
  try {
    const offre = await Offre.findById(id).populate('entreprise', 'name'); // Populating entreprise details
    if (!offre) {
      return res.status(404).json({ message: "Offre non trouvée" });
    }
    res.status(200).json(offre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateOffre = async (req, res) => {
  const { id } = req.params;
  const { titre, description, sector, salaire } = req.body;
  try {
    const offre = await Offre.findByIdAndUpdate(
      id,
      { titre, description, sector, salaire },
      { new: true, runValidators: true }
    );
    if (!offre) {
      return res.status(404).json({ message: "Offre non trouvée" });
    }
    res.status(200).json({ message: "Offre mise à jour avec succès", offre });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteOffre = async (req, res) => {
  const { id } = req.params;
  try {
    const offre = await Offre.findByIdAndDelete(id);
    if (!offre) {
      return res.status(404).json({ message: "Offre non trouvée" });
    }
    
    await Entreprise.findByIdAndUpdate(offre.entreprise, { $pull: { offres: offre._id } });
    res.status(200).json({ message: "Offre supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
