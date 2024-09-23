const Entreprise = require('../models/entreprise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nom, email, motDePasse, phoneNumber, address } = req.body;
  try {
    const existingEntreprise = await Entreprise.findOne({ email });
    if (existingEntreprise) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const entreprise = new Entreprise({ nom, email, motDePasse: hashedPassword, phoneNumber, address });
    await entreprise.save();
    res.status(201).json({ message: 'Entreprise créée avec succès', entreprise });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.login = async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    const entreprise = await Entreprise.findOne({ email });
    if (!entreprise) return res.status(400).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(motDePasse, entreprise.motDePasse);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: entreprise._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, entreprise: { id: entreprise._id, nom: entreprise.nom, email: entreprise.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEntrepriseById = async (req, res) => {
  const { id } = req.params;
  try {
    const entreprise = await Entreprise.findById(id).populate('offres'); // Populate offres field
    if (!entreprise) return res.status(404).json({ message: 'Entreprise non trouvée' });

    res.json(entreprise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateEntreprise = async (req, res) => {
  const { id } = req.params;
  const { nom, email, motDePasse, phoneNumber, address } = req.body;

  try {
    const entreprise = await Entreprise.findById(id);
    if (!entreprise) return res.status(404).json({ message: 'Entreprise non trouvée' });

    if (nom) entreprise.nom = nom;
    if (email) entreprise.email = email;
    if (phoneNumber) entreprise.phoneNumber = phoneNumber;
    if (address) entreprise.address = address;

    if (motDePasse) {
      const hashedPassword = await bcrypt.hash(motDePasse, 10);
      entreprise.motDePasse = hashedPassword;
    }

    await entreprise.save();
    res.json({ message: 'Entreprise mise à jour avec succès', entreprise });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
