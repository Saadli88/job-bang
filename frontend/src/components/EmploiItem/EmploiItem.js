import React, { useState } from "react";
import "./EmploiItem.css";

export default function EmploiItem({
  sector,
  titre,
  salaire,
  description,
  entreprise
}) {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="EmploiItem">
      <button onClick={toggleDescription}>Description</button>
      {showDescription && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={toggleDescription}>
              &times;
            </span>
            <p className="description">{description}</p>
          </div>
        </div>
      )}
      <span className="jobTitle">{titre}</span>
      <span className="jobEntreprise">{entreprise}</span>
      <span className="jobSector">{sector}</span>
      <span className="jobSalary">{salaire}</span> {}
    </div>
  );
}
