import React from 'react';
import './NavBar.css'; // Assurez-vous que le chemin est correct
import Logo from '../../images/logo.jpg';

const NavBar = () => {
  const menuOptions = [
    { text: "Connexion" },
    { text: "Inscription" },
    { text: "Entreprise" },
  ];

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo-and-link">
          <img src={Logo} alt="Logo" />
          <a href="#" className="navbar-link navbar-link-bold">Acceuil</a>
        </div>
        <div className="navbar-links-container">
          {menuOptions.map((item, index) => (
            <a href="#" className="navbar-link" key={index}>{item.text}</a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
