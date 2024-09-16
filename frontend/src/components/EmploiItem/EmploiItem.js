import React, { useState } from "react";
import "./EmploiItem.css";

export default function EmploiItem({
  sector,
  jobTitle,
  salary,
  description,
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
      <span className="jobTitle">{jobTitle}</span>
      <span className="jobSector">{sector}</span>
      <span className="jobSalary">{salary}</span> {/* Corrected salary display */}
    </div>
  );
}
