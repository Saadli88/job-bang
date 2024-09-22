import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Importer useNavigate
import "./Connexion.css";
import NavBar from '../NavBar/NavBar';
import { CandidatsList } from '../../data/candidats'; // Importer la liste des candidats

function Connexion() {
  const [userType] = useState("candidat"); // Default to "candidat"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // État pour le message d'erreur
  const navigate = useNavigate();  // Utiliser useNavigate pour rediriger

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifiez si l'email et le mot de passe sont corrects
    const candidat = CandidatsList.find(c => c.email === email && c.mot_de_passe === password);
    
    if (candidat) {
      console.log(`Logging in as ${userType} with email: ${email}`);
      // Rediriger vers la page candidat après connexion réussie
      navigate("/cand");
    } else {
      setErrorMessage("Email ou mot de passe incorrect."); // Définir le message d'erreur
    }
  };

  return (
    <div>
      <NavBar />
      <div className="connexion-container">
        <h2>Connexion</h2>
        <p>Candidat</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Entrez votre email"
            />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <button type="submit" className="login-btn">Se connecter</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Afficher le message d'erreur */}
        </form>
       
        <div className="signup">
          <p>Pas de compte avec nous ?</p>
          <br />
          <a href="./ins">
            <button className="signup-btn">Créer un compte</button>
          </a> 
        </div>
        
      </div>
    </div>
  );
}

export default Connexion;
