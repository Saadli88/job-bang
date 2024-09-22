import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';  
import Acceuil from './components/Acceuil/Acceuil'; 
import Connexion from './components/Connexion/Connexion'; 
import Inscription from './components/Inscription/Inscription'; 
import { Entreprise } from "./components/Entreprise/Entreprise";
import ConnexionEnt from './components/ConnexionEnt/ConnexionEnt'; 
import InscriptionEnt from './components/InscriptionEnt/InscriptionEnt'; 
import Candidat from './components/Candidat/Candidat'; 
import OffreEmploi from './components/OffreEmploi/OffreEmploi'; 
import EmploiItem from './components/EmploiItem/EmploiItem'; 
import MesAnnonces from './components/MesAnnonces/MesAnnonces'; 
import MesAnnoncesPage from './components/MesAnnoncesPage/MesAnnoncesPage'; 
import PostesLiker from './components/PostesLiker/PostesLiker'; 

import './App.css';

function App() {
  const [likedJobs, setLikedJobs] = useState(new Set());

  return (
    <Routes>
      <Route path="/" element={<Acceuil />} />
      <Route path="/con" element={<Connexion />} />
      <Route path="/ins" element={<Inscription />} />
      <Route path="/ent" element={<Entreprise />} />
      <Route path="/inscent" element={<InscriptionEnt />} />
      <Route path="/conent" element={<ConnexionEnt />} />
      <Route 
        path="/cand" 
        element={<Candidat likedJobs={likedJobs} setLikedJobs={setLikedJobs} />} 
      />
      <Route 
        path="/off" 
        element={<OffreEmploi />} 
      />
      <Route 
        path="/emp" 
        element={<EmploiItem likedJobs={likedJobs} setLikedJobs={setLikedJobs} />} 
      />
      <Route 
        path="/like" 
        element={<PostesLiker likedJobs={likedJobs} />} 
      />
      <Route path="/ann" element={<MesAnnonces />} />
      <Route path="/annp" element={<MesAnnoncesPage />} />
    </Routes>
  );
}

export default App;
