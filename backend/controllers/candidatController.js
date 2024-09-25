const Candidat = require('../models/candidat');
const HttpError = require('../handlers/error-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const ajouterCandidat = async (req, res, next) => {
  const { nom, email, motDePasse } = req.body;

  try {
    const existingCandidat = await Candidat.findOne({ email });
    if (existingCandidat) {
      return next(new HttpError('Candidat déjà existant', 400));
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10);
    const nouveauCandidat = new Candidat({ nom, email, motDePasse: hashedPassword });
    
    const savedCandidat = await nouveauCandidat.save();
    res.status(201).json({ message: 'Candidat créé avec succès', candidat: savedCandidat });
  } catch (err) {
    const error = new HttpError('Erreur lors de la création du candidat', 500);
    return next(error);
  }
};

const loginCandidat = async (req, res, next) => {
  const { email, motDePasse } = req.body;

  try {
    const candidat = await Candidat.findOne({ email });
    if (!candidat) {
      return next(new HttpError('Candidat non trouvé', 400));
    }

    const isMatch = await bcrypt.compare(motDePasse, candidat.motDePasse);
    if (!isMatch) {
      return next(new HttpError('Mot de passe incorrect', 400));
    }

    const token = jwt.sign({ id: candidat._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, candidat: { id: candidat._id, email: candidat.email } });
  } catch (err) {
    const error = new HttpError('Erreur lors de la connexion', 500);
    return next(error);
  }
};


const afficherCandidat = async (req, res, next) => {
  const candidatId = req.params.id;

  try {
    const candidat = await Candidat.findById(candidatId);
    if (!candidat) {
      return next(new HttpError('Candidat non trouvé', 404));
    }
    res.json(candidat);
  } catch (err) {
    const error = new HttpError('Une erreur est survenue lors de la récupération du candidat', 500);
    return next(error);
  }
};


const modifierCandidat = async (req, res, next) => {
  const candidatId = req.params.id;
  const { email, motDePasse } = req.body;

  try {
    const candidat = await Candidat.findById(candidatId);
    if (!candidat) {
      return next(new HttpError('Candidat non trouvé', 404));
    }


    if (email) {
      const existingEmail = await Candidat.findOne({ email });
      if (existingEmail) {
        return next(new HttpError('Cet email est déjà utilisé', 400));
      }
      candidat.email = email;
    }

 
    if (motDePasse) {
      const hashedPassword = await bcrypt.hash(motDePasse, 10);
      candidat.motDePasse = hashedPassword;
    }

    const updatedCandidat = await candidat.save();
    res.json({ message: 'Candidat mis à jour avec succès', candidat: updatedCandidat });
  } catch (err) {
    const error = new HttpError('Erreur lors de la mise à jour du candidat', 500);
    return next(error);
  }
};

module.exports = {
  ajouterCandidat,
  loginCandidat,
  afficherCandidat,
  modifierCandidat,
};
