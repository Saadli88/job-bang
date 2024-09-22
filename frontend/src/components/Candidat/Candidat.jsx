import React, { useState } from 'react'; 
import "./Candidat.css";
import NavBarCand from '../NavBarCand/NavBarCand';
import { locations } from '../../data/locations';
import EmploiItem from '../EmploiItem/EmploiItem';

export const Candidat = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [likedJobs, setLikedJobs] = useState(new Set()); // État pour les postes likés

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearchClick = () => {
    setIsSearched(true);
    console.log(`Recherche: ${searchTerm}, Lieu: ${location}`);
  };

  const handleReset = () => {
    setSearchTerm('');
    setLocation('');
    setIsSearched(false);
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

  return (
    <div className="candidat-container">
      <NavBarCand />
      <div className="candidat-titre">Recherchez un emploi</div>
      <br />
      
      <div className="search-bar">
        <div className="input-groupp">
          <input 
            type="text" 
            placeholder="Titre de poste, mots-clés ou entreprise" 
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
        <div className="input-groupp">
          <select value={location} onChange={handleLocationChange}>
            <option value="">Sélectionnez une ville</option>
            {locations.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <button type="button" onClick={handleSearchClick}>Rechercher</button>
        {isSearched && (
          <button className="reset-button" type="button" onClick={handleReset}>Retour</button>
        )}
      </div>

      <div className="emploi-results">
        {isSearched && <EmploiItem searchTerm={searchTerm} location={location} toggleLike={toggleLike} likedJobs={likedJobs} />}
      </div>
    </div>
  );
};

export default Candidat;
