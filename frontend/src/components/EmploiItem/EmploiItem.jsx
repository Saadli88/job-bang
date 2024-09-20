import React, { useState } from "react";
import { EmploiList } from "../../data/emploi"; // Assurez-vous que le chemin est correct
import "./EmploiItem.css"; // Assurez-vous que ce fichier existe

const EmploiItem = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [selectedEmploi, setSelectedEmploi] = useState(null);

  const toggleDescription = (emploi) => {
    setSelectedEmploi(emploi);
    setShowDescription(!showDescription);
  };

  return (
    <div>
      <ul className="lmj-emploi-list">
        {EmploiList && EmploiList.length > 0 ? (
          EmploiList.map((emploi) => (
            <div className="emploi-container" key={emploi.nom_poste}>
              <h3 className="jobTitle">{emploi.nom_poste}</h3>
              <span className="jobEntreprise">{emploi.nom_entreprise}</span>
              <span className="jobSector">{emploi.categorie}</span>
              <span className="jobSalary">{emploi.salaire}</span>
              <span className="jobLocation">{emploi.emplacement}</span>
              <button onClick={() => toggleDescription(emploi)}>Postuler</button>
              {showDescription && selectedEmploi === emploi && (
                <div className="popup">
                  <div className="popup-content">
                    <span className="close" onClick={() => setShowDescription(false)}>&times;</span>
                    <p>Email: <a href={`mailto:${emploi.email_employeur}`}>{emploi.email_employeur}</a></p>

                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <li>Aucune offre d'emploi disponible.</li>
        )}
      </ul>
    </div>
  );
};

export default EmploiItem;
