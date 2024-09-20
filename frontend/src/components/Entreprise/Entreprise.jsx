import React from 'react';
import NavBarCand from '../NavBarCand/NavBarCand';
import './Entreprise.css';

export const Entreprise = () => {
  return (
    <div className="entreprise-container">
      <NavBarCand />
      <div className="content">
        <aside className="sidebar">
          <ul>
            <li>Tableau de bord</li>
            <li>
              <a href="./off" className="sidebar-link">Créer un poste</a>
            </li>
            <li>Mes annonces</li>
          </ul>
        </aside>
        <div className="main-content2">
          <h1>Bienvenue dans l'espace entreprise</h1>
        </div>
      </div>
    </div>
  );
};

export default Entreprise;
