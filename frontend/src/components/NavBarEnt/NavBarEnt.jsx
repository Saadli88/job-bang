import React from 'react';
import './NavBarEnt.css'; 
import Logo from '../../images/logo.jpg';

const NavBarEnt = () => {
  const menuOptions = [
    { text: "Acceuil", path: "./ent" },

   
  ];

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo-and-link">
          <img src={Logo} alt="Logo" />
          <a href="/ent" className="navbar-link navbar-link-bold">Accueil</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBarEnt;
