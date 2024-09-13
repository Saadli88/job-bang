import React, { useState } from "react";
import "./Connexion.css";

function Connexion() {
  const [userType, setUserType] = useState("candidat"); // Default to "candidat"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the login logic for candidate or entrepreneur
    console.log(`Logging in as ${userType} with email: ${email}`);
  };

  return (
    <div className="connexion-container">
      <h2>Connexion</h2>
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
        <div className="user-type">
          <label>
            <input
              type="radio"
              value="candidat"
              checked={userType === "candidat"}
              onChange={() => setUserType("candidat")}
            />
            Candidat
          </label>
          <label>
            <input
              type="radio"
              value="entrepreneur"
              checked={userType === "entrepreneur"}
              onChange={() => setUserType("entrepreneur")}
            />
            Entrepreneur
          </label>
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <div className="signup">
        <p>Pas encore de compte ?</p>
        <button className="signup-btn">Créer un compte</button>
      </div>
    </div>
  );
}

export default Connexion;
