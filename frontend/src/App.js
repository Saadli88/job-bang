import React, { useState } from "react";
import Acceuil from './components/Acceuil/Acceuil'; // Créez ce composant
import Connexion from './components/Connexion/Connexion'; // Créez ce composant
import Inscription from './components/Inscription/Inscription'; // Créez ce composant
import Entreprise from './components/Entreprise/Entreprise'; // Créez ce composant
import "./App.css"

function App() {
  const [route, setRoute] = useState(window.location.pathname);

  const handleRouteChange = (newRoute) => {
    setRoute(newRoute);
    window.history.pushState({}, "", newRoute);
  };

  return (
    <div>
      {route === "/" && <Acceuil onRouteChange={handleRouteChange} />}
      {route === "/con" && <Connexion />}
      {route === "/ins" && <Inscription />}
      {route === "/Ent" && <Entreprise />}
    </div>
  );
}

export default App;