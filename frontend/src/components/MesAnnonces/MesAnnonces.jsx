import React, { useState } from "react";
import { EmploiList } from "../../data/emploi"; // Assurez-vous que le chemin est correct
import "./MesAnnonces.css"; // Assurez-vous que ce fichier existe

const MesAnnonces = ({ connectedEmployerEmail }) => {
  const [emplois, setEmplois] = useState(EmploiList); // État pour gérer la liste des emplois

  const handleDelete = (emploiToDelete) => {
    setEmplois(emplois.filter(emploi => emploi !== emploiToDelete)); // Supprime l'emploi de la liste
  };

  // Filtrer les emplois selon l'employeur connecté
  const filteredEmploiList = emplois.filter(emploi => emploi.email_employeur === connectedEmployerEmail);

  return (
    <div> 
      <ul className="lmj-emploi-list">
        {filteredEmploiList.length > 0 ? (
          filteredEmploiList.map((emploi) => (
            <div className="emploi-container" key={emploi.nom_poste}>
              <h3 className="jobTitle">{emploi.nom_poste}</h3>
              <span className="jobEntreprise">{emploi.nom_entreprise}</span>
              <span className="jobSector">{emploi.categorie}</span>
              <span className="jobSalary">{emploi.salaire}</span>
              <span className="jobLocation">{emploi.emplacement}</span>
              <div className="button-container">
                <button className="buttonx" onClick={() => handleDelete(emploi)}>Supprimer</button>
              </div>
            </div>
          ))
        ) : (
          <li>Aucune offre d'emploi disponible.</li>
        )}
      </ul>
    </div>
  );
};

export default MesAnnonces;
