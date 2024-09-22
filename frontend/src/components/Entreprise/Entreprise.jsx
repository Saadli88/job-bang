import React from 'react';
import NavBarEnt2 from '../NavBarEnt2/NavBarEnt2';
import './Entreprise.css';
import { useNavigate } from 'react-router-dom';

export const Entreprise = () => {
  const navigate = useNavigate();
  const connectedEmployerEmail = localStorage.getItem('connectedEmployerEmail');

  const handleMesAnnoncesClick = () => {
    navigate('/annp', { state: { connectedEmployerEmail } }); // Passer l'email à la nouvelle page
  };

  return (
    <div className="entreprise-container">
      <NavBarEnt2 />
      <div className="content">
        <aside className="sidebar">
          <ul>
            <li>Tableau de bord</li>
            <li>
              <a href="./off" className="sidebar-link">Créer un poste</a>
            </li>
            <li onClick={handleMesAnnoncesClick} className="sidebar-link">
              Mes annonces
            </li>
          </ul>
        </aside>
        <div className="main-content2">
          <h1>Bienvenue dans l'espace entreprise !</h1>
        </div>
      </div>
    </div>
  );
};

export default Entreprise;
