const HttpError = require("../handlers/error-handler");
const Emploi = require("../models/emploi");
const Employeur = require("../models/employeur"); // Ensure you import the Employer model

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
  const { nom_entreprise, nom_poste, salaire, emplacement, categorie, email_employeur, employeurId } = req.body;

  const nouvelEmploi = new Emploi({
    nom_entreprise,
    nom_poste,
    salaire,
    emplacement,
    categorie,
    email_employeur,
    assignee: employeurId, // Link to the employer
  });

  try {
    // Save the new job
    const savedEmploi = await nouvelEmploi.save();

    // Update the employer's document to add the new job to their list
    await Employeur.findByIdAndUpdate(
      employeurId,
      { $push: { emplois: savedEmploi._id } }, // Add the new emploi ID to the employer's jobs list
      { new: true }
    );

    res.status(201).json({ message: "Emploi ajouté avec succès", emploi: savedEmploi });
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
    const emploi = await Emploi.findByIdAndUpdate(emploiId, nouvellesDonnees, { new: true });
    if (!emploi) {
      return res.status(404).json({ message: "Emploi non trouvé" });
    }
    res.json({ message: "Emploi modifié avec succès", emploi });
  } catch (err) {
    const error = new HttpError("Erreur lors de la modification de l'emploi", 500);
    return next(error);
  }
};

// Delete an emploi
// Delete an emploi
const suppEmploi = async (req, res, next) => {
  const emploiId = req.params.id;

  try {
    const deletedEmploi = await Emploi.findByIdAndDelete(emploiId);
    if (!deletedEmploi) {
      return res.status(404).json({ message: "Emploi non trouvé" });
    }

    const result = await Employeur.updateMany(
      { emplois: emploiId },
      { $pull: { emplois: emploiId } }
    );

    console.log(`Removed emploi from employeur: ${result.modifiedCount} employeur(s) updated.`);

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
