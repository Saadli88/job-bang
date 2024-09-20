import React, { useState } from "react";
import "./ConnexionEnt.css";
import NavBar from '../NavBar/NavBar';

function ConnexionEnt() {
  const [userType] = useState("Employeur"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Logging in as ${userType} with email: ${email}`);
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
          </form>
          <a href="./ent">
          <button type="submit">Se connecter</button>
          </a>
        
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
