import React, { useState } from "react";
import { EmploiList } from "../../data/emploi";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import "./EmploiItem.css";

const EmploiItem = ({ searchTerm, location, likedJobs, setLikedJobs, emploi }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [selectedEmploi, setSelectedEmploi] = useState(null);

  // Si on a un emploi, on l'affiche
  if (emploi) {
    return (
      <div className="emploi-container">
        <div 
          className="like-icon" 
          onClick={() => {
            const newLikes = new Set(likedJobs);
            if (newLikes.has(emploi.nom_poste)) {
              newLikes.delete(emploi.nom_poste);
            } else {
              newLikes.add(emploi.nom_poste);
            }
            setLikedJobs(newLikes);
          }}
          style={{ cursor: 'pointer' }}
        >
          {likedJobs.has(emploi.nom_poste) ? (
            <FaHeart color="black" />
          ) : (
            <FaRegHeart color="black" />
          )}
        </div>
        <h3 className="jobTitle">{emploi.nom_poste}</h3>
        <span className="jobEntreprise"><span className="label">Entreprise:</span> {emploi.nom_entreprise}</span>
        <span className="jobSector"><span className="label">Secteur:</span> {emploi.categorie}</span>
        <span className="jobSalary"><span className="label">Salaire:</span> {emploi.salaire}</span>
        <span className="jobLocation"><span className="label">Emplacement:</span> {emploi.emplacement}</span>
        <button className="buttonP" onClick={() => setShowDescription(!showDescription)}>Postuler</button>
        {showDescription && (
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={() => setShowDescription(false)}>&times;</span>
              <p>Email: <a href={`mailto:${emploi.email_employeur}`}>{emploi.email_employeur}</a></p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Filtrage des emplois
  const filterEmplois = (emplois) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const lowerLocation = location.toLowerCase();

    return emplois.filter((emploi) => 
      (emploi.nom_poste.toLowerCase().includes(lowerSearchTerm) ||
      emploi.nom_entreprise.toLowerCase().includes(lowerSearchTerm) ||
      emploi.categorie.toLowerCase().includes(lowerSearchTerm) ||
      (emploi.description && emploi.description.toLowerCase().includes(lowerSearchTerm))) &&
      (location === '' || emploi.emplacement.toLowerCase().includes(lowerLocation))
    );
  };

  const groupByThree = (array) => {
    const groups = [];
    for (let i = 0; i < array.length; i += 3) {
      groups.push(array.slice(i, i + 3));
    }
    return groups;
  };

  const toggleDescription = (emploi) => {
    setSelectedEmploi(emploi);
    setShowDescription(!showDescription);
  };

  const toggleLike = (jobTitle) => {
    setLikedJobs(prevLikes => {
      const newLikes = new Set(prevLikes);
      if (newLikes.has(jobTitle)) {
        newLikes.delete(jobTitle);
      } else {
        newLikes.add(jobTitle);
      }
      return newLikes;
    });
  };

  const filteredEmplois = filterEmplois(EmploiList);
  const groupedEmplois = groupByThree(filteredEmplois);

  return (
    <div>
      <ul className="lmj-emploi-list">
        {groupedEmplois.length > 0 ? (
          groupedEmplois.map((group, groupIndex) => (
            <div className="emploi-group" key={groupIndex}>
              {group.map((emploi) => (
                <div className="emploi-container" key={emploi.nom_poste}>
                  <div 
                    className="like-icon" 
                    onClick={() => toggleLike(emploi.nom_poste)}
                    style={{ cursor: 'pointer' }}
                  >
                    {likedJobs.has(emploi.nom_poste) ? (
                      <FaHeart color="black" />
                    ) : (
                      <FaRegHeart color="black" />
                    )}
                  </div>
                  <h3 className="jobTitle">{emploi.nom_poste}</h3>
                  <span className="jobEntreprise"><span className="label">Entreprise:</span> {emploi.nom_entreprise}</span>
                  <span className="jobSector"><span className="label">Secteur:</span> {emploi.categorie}</span>
                  <span className="jobSalary"><span className="label">Salaire:</span> {emploi.salaire}</span>
                  <span className="jobLocation"><span className="label">Emplacement:</span> {emploi.emplacement}</span>
                  <button className="buttonP" onClick={() => toggleDescription(emploi)}>Postuler</button>
                  {showDescription && selectedEmploi === emploi && (
                    <div className="popup">
                      <div className="popup-content">
                        <span className="close" onClick={() => setShowDescription(false)}>&times;</span>
                        <p>Email: <a href={`mailto:${emploi.email_employeur}`}>{emploi.email_employeur}</a></p>
                      </div>
                    </div>
                  )}
                </div>
              ))} 
            </div>
          ))
        ) : (
          <li>Aucune offre d'emploi trouvée.</li>
        )}
      </ul>
    </div>
  );
};

export default EmploiItem;
