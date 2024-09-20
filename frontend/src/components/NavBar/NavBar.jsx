import React from 'react';
import './NavBar.css'; 
import Logo from '../../images/logo.jpg';

const NavBar = () => {
  const menuOptions = [
    { text: "Connexion", path: "./con" },

    { text: "Entreprise", path: "./conent" },
  ];

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo-and-link">
          <img src={Logo} alt="Logo" />
          <a href="/" className="navbar-link navbar-link-bold">Accueil</a>
        </div>
        <div className="navbar-links-container">
          {menuOptions.map((item, index) => (
            <a href={item.path} className="navbar-link" key={index}>{item.text}</a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
