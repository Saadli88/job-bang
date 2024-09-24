const HttpError = require("../handlers/error-handler");
const Emploi = require("../models/emploi");

// Get all emplois
const afficherEmplois = async (req, res, next) => {
  try {
    const emplois = await Emploi.find({});
    res.json({
      emplois: emplois.map((emploi) => ({
        id: emploi._id,
        nom_entreprise: emploi.nom_entreprise,
        nom_poste: emploi.nom_poste,
        salaire: emploi.salaire,
        emplacement: emploi.emplacement,
        categorie: emploi.categorie,
        email_employeur: emploi.email_employeur,
      })),
    });
  } catch (err) {
    const error = new HttpError(
      "Échec lors de la récupération des emplois, veuillez réessayer plus tard.",
      500
    );
    return next(error);
  }
};

// Get emplois by a specific user (if applicable)
const getEmploisByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  try {
    const emploisForUser = await Emploi.find({ assignee: userId });
    if (emploisForUser.length === 0) {
      return next(new HttpError("Aucun emploi trouvé pour cet utilisateur.", 404));
    }
    res.json({
      emplois: emploisForUser.map((emploi) => emploi.toObject({ getters: true })),
    });
  } catch (err) {
    const error = new HttpError("Une erreur BD est survenue", 500);
    return next(error);
  }
};

// Add a new emploi
const ajouterEmploi = async (req, res, next) => {
  const { nom_entreprise, nom_poste, salaire, emplacement, categorie, email_employeur } = req.body;
  const nouvelEmploi = new Emploi({
    nom_entreprise,
    nom_poste,
    salaire,
    emplacement,
    categorie,
    email_employeur,
  });

  try {
    await nouvelEmploi.save();
    res.status(201).json({ message: "Emploi ajouté avec succès", emploi: nouvelEmploi });
  } catch (err) {
    const error = new HttpError("Création en base de données en erreur", 500);
    return next(error);
  }
};

// Update an existing emploi
const modifierEmploi = async (req, res, next) => {
  const emploiId = req.params.id;
  const nouvellesDonnees = req.body;

  try {
    const emploi = await Emploi.findByIdAndUpdate(emploiId, nouvellesDonnees, {
      new: true,
    });
    if (!emploi) {
      return res.status(404).json({ message: "Emploi non trouvé" });
    }
    res.json({ message: "Emploi modifié avec succès" });
  } catch (err) {
    const error = new HttpError("Erreur lors de la modification de l'emploi", 500);
    return next(error);
  }
};

// Delete an emploi
const suppEmploi = async (req, res, next) => {
  const emploiId = req.params.id;

  try {
    const deletedEmploi = await Emploi.findByIdAndDelete(emploiId);
    if (!deletedEmploi) {
      return res.status(404).json({ message: "Emploi non trouvé" });
    }
    res.json({ message: "Emploi supprimé avec succès" });
  } catch (err) {
    const error = new HttpError("Erreur lors de la suppression de l'emploi", 500);
    return next(error);
  }
};

module.exports = {
  afficherEmplois,
  getEmploisByUserId,
  ajouterEmploi,
  modifierEmploi,
  suppEmploi,
};
