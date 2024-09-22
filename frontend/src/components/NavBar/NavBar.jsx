import React from 'react';
import { Link } from 'react-router-dom';  // Importer Link de react-router-dom
import './NavBar.css'; 
import Logo from '../../images/logo.jpg';

const NavBar = () => {
  const menuOptions = [
    { text: "Connexion", path: "/con" },  // Routes mises à jour pour correspondre aux routes définies dans App.js
    { text: "Entreprise", path: "/conent" },
  ];

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo-and-link">
          <img src={Logo} alt="Logo" />
          <Link to="/" className="navbar-link navbar-link-bold">Accueil</Link>  {/* Utilisation de Link */}
        </div>
        <div className="navbar-links-container">
          {menuOptions.map((item, index) => (
            <Link to={item.path} className="navbar-link" key={index}>{item.text}</Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
