import React, { useState } from "react";
import Acceuil from './components/Acceuil/Acceuil'; 
import Connexion from './components/Connexion/Connexion'; 
import Inscription from './components/Inscription/Inscription'; 
import { Entreprise } from "./components/Entreprise/Entreprise";
import ConnexionEnt from './components/ConnexionEnt/ConnexionEnt'; 
import InscriptionEnt from './components/InscriptionEnt/InscriptionEnt'; 
import Candidat from './components/Candidat/Candidat'; 
import OffreEmploi from './components/OffreEmploi/OffreEmploi'; 
import EmploiItem from './components/EmploiItem/EmploiItem'; 
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
      {route === "/ent" && <Entreprise />}
      {route === "/inscent" && <InscriptionEnt/>}
      {route === "/conent" && <ConnexionEnt/>}
      {route === "/cand" && <Candidat/>}
      {route === "/off" && <OffreEmploi/>}
      {route === "/emp" && <EmploiItem/>}
    </div>
  );
}

export default App;