import React, { useState } from 'react';
import Logo from '../../images/logo.jpg';

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const menuOptions = [
    { text: "Acceuil" },
    { text: "Connexion" },
    { text: "Inscription" },
    { text: "Entreprise" },
  ];

  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="navbar-links-container">
        {menuOptions.map((item, index) => (
          <a href="#" key={index}>{item.text}</a>
        ))}
        <button className="primary-button">Bookings Now</button>
      </div>
      {/* Optionally add a simple toggle button for the menu */}
      <button onClick={() => setOpenMenu(!openMenu)}>
        {openMenu ? 'Close Menu' : 'Open Menu'}
      </button>
      {openMenu && (
        <div className="navbar-menu-container">
          {menuOptions.map((item, index) => (
            <a href="#" key={index} onClick={() => setOpenMenu(false)}>
              {item.text}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
