const Candidat = require('../models/candidat');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inscription d'un candidat
exports.register = async (req, res) => {
  const { nom, email, motDePasse } = req.body;
  try {
    // Vérifier si le candidat existe déjà
    const existingCandidat = await Candidat.findOne({ email });
    if (existingCandidat) {
      return res.status(400).json({ message: 'Candidat déjà existant' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    // Créer un nouveau candidat
    const candidat = new Candidat({ nom, email, motDePasse: hashedPassword });
    await candidat.save();

    res.status(201).json({ message: 'Candidat créé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Connexion d'un candidat
exports.login = async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    // Trouver le candidat
    const candidat = await Candidat.findOne({ email });
    if (!candidat) {
      return res.status(400).json({ message: 'Candidat non trouvé' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(motDePasse, candidat.motDePasse);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: candidat._id }, 'tonSecret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fonctionnalités supplémentaires pour les candidats peuvent être ajoutées ici

