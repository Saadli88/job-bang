import React from "react";
import { useLocation } from "react-router-dom";
import MesAnnonces from '../MesAnnonces/MesAnnonces';
import "./MesAnnoncesPage.css"
import NavBarEnt from '../NavBarEnt/NavBarEnt';


const MesAnnoncesPage = () => {
  const location = useLocation();
  const connectedEmployerEmail = location.state?.connectedEmployerEmail; // Récupérer l'email de l'employeur

  return (
    <div>
      <NavBarEnt/>
      <h1>Mes Annonces</h1>
      <MesAnnonces connectedEmployerEmail={connectedEmployerEmail} />
    </div>
  );
};

export default MesAnnoncesPage;
