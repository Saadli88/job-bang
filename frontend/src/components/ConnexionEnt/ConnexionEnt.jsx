import React, { useState } from "react";
import "./ConnexionEnt.css";
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom'; // Pour naviguer après la connexion
import { EmployersList } from '../../data/employers'; // Assurez-vous que le chemin est correct

function ConnexionEnt() {
  const [userType] = useState("Employeur");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // État pour le message d'erreur
  const navigate = useNavigate(); // Pour rediriger après la connexion réussie

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Vérifiez si l'email est dans la liste des employeurs
    const employer = EmployersList.find(emp => emp.email === email && emp.password === password);

    
    if (employer) {
      console.log(`Logging in as ${userType} with email: ${email}`);
      // Ici vous pouvez ajouter la vérification du mot de passe si nécessaire
      // Si vous avez un mot de passe à vérifier, faites-le ici
      navigate('/ent'); // Rediriger vers la page entreprise après connexion réussie
    } else {
      setErrorMessage("Email ou mot de passe incorrect."); // Définir le message d'erreur
    }
  };

  return (
    <div>
      <NavBar />
      <div className="connexion-container">
        <h2>Connexion</h2>
        <p>Employeur</p>
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
          <button className="login-btn"type="submit">Se connecter</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Afficher le message d'erreur */}
        </form>
        
        <div className="signup">
          <p>Pas de compte avec nous ?</p>
          <br />
          <a href="./inscent">
            <button className="signup-btn">Créer un compte</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ConnexionEnt;
