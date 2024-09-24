const HttpError = require('../handlers/error-handler');
const Employeur = require('../models/employeur');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  const { nom, email, motDePasse, phoneNumber, address } = req.body;

  try {
 
    const existingEmployeur = await Employeur.findOne({ email });
    if (existingEmployeur) {
      return next(new HttpError('Cet email est déjà utilisé.', 400));
    }


    const hashedPassword = await bcrypt.hash(motDePasse, 10);


    const employeur = new Employeur({
      nom,
      email,
      motDePasse: hashedPassword,
      phoneNumber,
      address,
    });

    await employeur.save();
    res.status(201).json({ message: 'Employeur créé avec succès', employeur });
  } catch (err) {
    const error = new HttpError("Échec de l'inscription, veuillez réessayer plus tard.", 500);
    return next(error);
  }
};


const login = async (req, res, next) => {
  const { email, motDePasse } = req.body;

  try {

    const employeur = await Employeur.findOne({ email });
    if (!employeur) {
      return next(new HttpError('Utilisateur non trouvé.', 400));
    }

  
    const isMatch = await bcrypt.compare(motDePasse, employeur.motDePasse);
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
  const { nom, email, motDePasse, phoneNumber, address } = req.body;

  try {
  
    const employeur = await Employeur.findById(id);
    if (!employeur) {
      return next(new HttpError('Employeur non trouvé.', 404));
    }

   
    if (nom) employeur.nom = nom;
    if (email) employeur.email = email;
    if (phoneNumber) employeur.phoneNumber = phoneNumber;
    if (address) employeur.address = address;

    
    if (motDePasse) {
      const hashedPassword = await bcrypt.hash(motDePasse, 10);
      employeur.motDePasse = hashedPassword;
    }

    await employeur.save();
    res.json({ message: 'Employeur mis à jour avec succès', employeur });
  } catch (err) {
    const error = new HttpError('Échec de la mise à jour, veuillez réessayer plus tard.', 500);
    return next(error);
  }
};


module.exports = {
  register,
  login,
  getEmployeurById,
  updateEmployeur,
};
