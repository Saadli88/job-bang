import React from 'react';
import NavBar from '../NavBar/NavBar';
import './Acceuil.css'; 
import Deco from '../../images/deco.jpg'; // Importation correcte de l'image

const Acceuil = () => {
  return (
    <div className="home-container">
      <NavBar />
      <div className="main-content">
        <div className="background-container">
        <div className="image-container">
          <img src={Deco} alt="Décoration" className="decor-image" />
        </div>
        </div>
          <div className="steps-container">
            <div className="step-container" data-tooltip="Inscrivez-vous pour créer un compte et connectez-vous pour accéder à toutes les fonctionnalités.">
              <div className="step-number">①</div>
              <div className="step-text">
                <h2>Inscrivez-vous<br />ou<br />connectez-vous</h2>
              </div>
            </div>
            <div className="step-container" data-tooltip="Utilisez la barre de recherche pour trouver les offres d'emploi qui vous intéressent.">
              <div className="step-number">②</div>
              <div className="step-text">
                <h2>Recherchez</h2>
              </div>
            </div>
            
            <div className="step-container" data-tooltip="Postulez aux offres d'emploi que vous avez trouvées en envoyant votre CV et lettre de motivation.">
              <div className="step-number">③</div>
              <div className="step-text">
                <h2>Postulez !</h2>
                <h2>Postulez2 !</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Acceuil;
