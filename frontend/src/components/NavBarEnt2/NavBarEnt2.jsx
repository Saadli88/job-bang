import React from 'react';
import './NavBarEnt2.css'; 
import Logo from '../../images/logo.jpg';

const NavBarEnt2 = () => {
  const menuOptions = [
    { text: "Acceuil", path: "./" },

   
  ];

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo-and-link">
          <img src={Logo} alt="Logo" />
          <a href="/" className="navbar-link navbar-link-bold">Accueil</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBarEnt2;
