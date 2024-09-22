import React, { useState } from "react";
import "./Inscription.css";
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom'; // Pour naviguer après la soumission

function Inscription() {
  const [userType] = useState("candidat");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Pour rediriger vers la page candidat

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("*Les mots de passe ne correspondent pas. Veuillez réessayer.");
      return;
    }
    setError("");
    console.log(`Registering as ${userType} with name: ${name}, email: ${email}`);
    navigate('/cand'); // Rediriger après l'inscription réussie
  };

  return (
    <div>
      <NavBar />
      <div className="inscription-container">
        <h2>Inscription</h2>
        <p>Candidat</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {error && <div className="error-message">{error}</div>}
          </div>
          <button type="submit" className="submit-btn">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}

export default Inscription;
