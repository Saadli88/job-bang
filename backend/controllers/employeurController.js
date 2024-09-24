const Employeur = require('../models/employeur');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nom, email, motDePasse, phoneNumber, address } = req.body;
  try {
    const existingEmployeur = await Employeur.findOne({ email });
    if (existingEmployeur) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const employeur = new Employeur({ nom, email, motDePasse: hashedPassword, phoneNumber, address });
    await employeur.save();
    res.status(201).json({ message: 'Employeur créée avec succès', employeur });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.login = async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    const employeur = await Employeur.findOne({ email });
    if (!employeur) return res.status(400).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await bcrypt.compare(motDePasse, employeur.motDePasse);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: employeur._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, employeur: { id: employeur._id, nom: employeur.nom, email: employeur.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployeurById = async (req, res) => {
  const { id } = req.params;
  try {
    const employeur = await Employeur.findById(id).populate('offres'); // Populate offres field
    if (!employeur) return res.status(404).json({ message: 'Employeur non trouvée' });

    res.json(employeur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateEmployeur = async (req, res) => {
  const { id } = req.params;
  const { nom, email, motDePasse, phoneNumber, address } = req.body;

  try {
    const employeur = await Employeur.findById(id);
    if (!employeur) return res.status(404).json({ message: 'Employeur non trouvée' });

    if (nom) employeur.nom = nom;
    if (email) employeur.email = email;
    if (phoneNumber) employeur.phoneNumber = phoneNumber;
    if (address) employeur.address = address;

    if (motDePasse) {
      const hashedPassword = await bcrypt.hash(motDePasse, 10);
      employeur.motDePasse = hashedPassword;
    }

    await employeur.save();
    res.json({ message: 'Employeur mise à jour avec succès', employeur });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
