const Candidat = require('../models/candidat');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
  const { nom, email, motDePasse } = req.body;
  try {

    const existingCandidat = await Candidat.findOne({ email });
    if (existingCandidat) {
      return res.status(400).json({ message: 'Candidat déjà existant' });
    }

  
    const hashedPassword = await bcrypt.hash(motDePasse, 10);


    const candidat = new Candidat({ nom, email, motDePasse: hashedPassword });
    await candidat.save();

    res.status(201).json({ message: 'Candidat créé avec succès', candidat });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.login = async (req, res) => {
  const { email, motDePasse } = req.body;
  try {

    const candidat = await Candidat.findOne({ email });
    if (!candidat) {
      return res.status(400).json({ message: 'Candidat non trouvé' });
    }

    const isMatch = await bcrypt.compare(motDePasse, candidat.motDePasse);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }


    const token = jwt.sign({ id: candidat._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, candidat: { id: candidat._id, email: candidat.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCandidatById = async (req, res) => {
  const { id } = req.params;
  try {
    const candidat = await Candidat.findById(id);
    if (!candidat) {
      return res.status(404).json({ message: 'Candidat non trouvé' });
    }
    res.json(candidat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCandidat = async (req, res) => {
  const { id } = req.params;
  const { email, motDePasse } = req.body;
  try {
    const candidat = await Candidat.findById(id);
    if (!candidat) {
      return res.status(404).json({ message: 'Candidat non trouvé' });
    }

    if (email) candidat.email = email;

    if (motDePasse) {
      const hashedPassword = await bcrypt.hash(motDePasse, 10);
      candidat.motDePasse = hashedPassword;
    }

    await candidat.save();
    res.json({ message: 'Candidat mis à jour avec succès', candidat });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
