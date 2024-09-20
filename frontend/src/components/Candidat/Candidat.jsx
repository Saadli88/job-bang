import React, { useState } from 'react'; 
import "./Candidat.css";
import NavBarCand from '../NavBarCand/NavBarCand';
import { locations } from '../../data/locations'; // Import des villes

export const Candidat = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Recherche: ${searchTerm}, Lieu: ${location}`);
  };

  return (
    <div className="candidat-container">
      <NavBarCand />
      <form className="search-bar" onSubmit={handleSubmit}>
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
        <button type="submit">Rechercher</button>
      </form>
    </div>
  );
};

export default Candidat;
