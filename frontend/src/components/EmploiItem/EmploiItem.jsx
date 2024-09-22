import React, { useState } from "react";
import { EmploiList } from "../../data/emploi";
import "./EmploiItem.css";

const EmploiItem = ({ searchTerm, location }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [selectedEmploi, setSelectedEmploi] = useState(null);
  const [likedJobs, setLikedJobs] = useState(new Set()); // État pour les postes likés

  // Fonction pour filtrer les emplois en fonction des critères
  const filterEmplois = (emplois) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const lowerLocation = location.toLowerCase();

    console.log(`Filtrage : recherche "${lowerSearchTerm}" à "${lowerLocation}"`); // Ajoute ce log
    
    return emplois.filter((emploi) => 
      (emploi.nom_poste.toLowerCase().includes(lowerSearchTerm) ||
      emploi.nom_entreprise.toLowerCase().includes(lowerSearchTerm) ||
      emploi.categorie.toLowerCase().includes(lowerSearchTerm) ||
      (emploi.description && emploi.description.toLowerCase().includes(lowerSearchTerm))) &&
      (location === '' || emploi.emplacement.toLowerCase().includes(lowerLocation))
    );
  };

  // Définition de la fonction toggleDescription
  const toggleDescription = (emploi) => {
    setSelectedEmploi(emploi);
    setShowDescription(!showDescription);
  };

  // Fonction pour gérer les likes
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

  // Filtrer les emplois en fonction de la recherche
  const filteredEmplois = filterEmplois(EmploiList);

  // Fonction pour diviser la liste en groupes de 3
  const groupByThree = (array) => {
    const groups = [];
    for (let i = 0; i < array.length; i += 3) {
      groups.push(array.slice(i, i + 3));
    }
    return groups;
  };

  const groupedEmplois = groupByThree(filteredEmplois); // Créer des groupes de 3

  return (
    <div>
      <ul className="lmj-emploi-list">
        {groupedEmplois.length > 0 ? (
          groupedEmplois.map((group, groupIndex) => (
            <div className="emploi-group" key={groupIndex}>
              {group.map((emploi) => (
                <div className="emploi-container" key={emploi.nom_poste}>
                  <h3 className="jobTitle">{emploi.nom_poste}</h3>
                  <span className="jobEntreprise"><span className="label">Entreprise:</span> {emploi.nom_entreprise}</span>
                  <span className="jobSector"><span className="label">Secteur:</span> {emploi.categorie}</span>
                  <span className="jobSalary"><span className="label">Salaire:</span> {emploi.salaire}</span>
                  <span className="jobLocation"><span className="label">Emplacement:</span> {emploi.emplacement}</span>
                  <button className="buttonP" onClick={() => toggleDescription(emploi)}>Postuler</button>
                  <button onClick={() => toggleLike(emploi.nom_poste)}>
                    {likedJobs.has(emploi.nom_poste) ? 'Unlike' : 'Like'}
                  </button>
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
