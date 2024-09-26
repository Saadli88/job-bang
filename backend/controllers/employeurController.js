const HttpError = require('../handlers/error-handler');
const Employeur = require('../models/employeur');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  const { nom, email, mot_de_passe} = req.body;

  try {
    const existingEmployeur = await Employeur.findOne({ email });
    if (existingEmployeur) {
      return next(new HttpError('Cet email est déjà utilisé.', 400));
    }

    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    const employeur = new Employeur({
      nom,
      email,
      mot_de_passe: hashedPassword,
    });

    await employeur.save();
    res.status(201).json({ message: 'Employeur créé avec succès', employeur });
  } catch (err) {
    const error = new HttpError("Échec de l'inscription, veuillez réessayer plus tard.", 500);
    return next(error);
  }
};

const login = async (req, res, next) => {
  const { email, mot_de_passe } = req.body;

  try {
    const employeur = await Employeur.findOne({ email });
    if (!employeur) {
      return next(new HttpError('Utilisateur non trouvé.', 400));
    }

    const isMatch = await bcrypt.compare(mot_de_passe, employeur.mot_de_passe);
    if (!isMatch) {
      return next(new HttpError('Mot de passe incorrect.', 400));
    }

    const token = jwt.sign({ id: employeur._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, employeur: { id: employeur._id, nom: employeur.nom, email: employeur.email } });
  } catch (err) {
    const error = new HttpError('Connexion échouée, veuillez réessayer plus tard.', 500);
    return next(error);
  }
};

const getEmployeurById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const employeur = await Employeur.findById(id).populate('offres');
    if (!employeur) {
      return next(new HttpError('Employeur non trouvé.', 404));
    }

    res.json(employeur);
  } catch (err) {
    const error = new HttpError('Impossible de récupérer les informations de cet employeur.', 500);
    return next(error);
  }
};

const updateEmployeur = async (req, res, next) => {
  const { id } = req.params;
  const { nom, email, mot_de_passe} = req.body;

  try {
    const employeur = await Employeur.findById(id);
    if (!employeur) {
      return next(new HttpError('Employeur non trouvé.', 404));
    }

  
    if (nom) employeur.nom = nom;
    if (email) employeur.email = email;

    if (mot_de_passe) {
      const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
      employeur.mot_de_passe = hashedPassword;
    }

    const updatedEmployeur = await employeur.save();
    res.json({ message: 'Employeur mis à jour avec succès', employeur: updatedEmployeur });
  } catch (err) {
    const error = new HttpError('Échec de la mise à jour, veuillez réessayer plus tard.', 500);
    return next(error);
  }
};

const getAllEmploi = async (req, res, next) => {
  const { id } = req.params;

  try {
    
    const employeur = await Employeur.findById(id).populate('offres');

    if (!employeur) {
      return next(new HttpError('Employeur non trouvé.', 404));
    }

    res.json({ offres: employeur.offres });
  } catch (err) {
    const error = new HttpError("Impossible de récupérer la liste des offres d'emploi.", 500);
    return next(error);
  }
};

module.exports = {
  register,
  login,
  getEmployeurById,
  updateEmployeur,
  getAllEmploi,
};
