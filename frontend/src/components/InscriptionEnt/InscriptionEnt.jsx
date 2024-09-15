import React, { useState } from "react";
import "./InscriptionEnt.css";
import NavBar from '../NavBar/NavBar';

function InscriptionEnt() {
  const [userType] = useState("Employeur");
  const [companyName, setCompanyName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("*Les mots de passe ne correspondent pas.Veuillez réessayez.");
      return;
    }
    setError("");
    console.log(`Registering as ${userType} with company name: ${companyName}, name: ${name}, email: ${email}, phone: ${phone}, address: ${address}`);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
 
    const cleanedValue = value.replace(/\D/g, '');
    setPhone(cleanedValue);
  };

  return (
    <div>
      <NavBar />
      <div className="inscriptionEnt-container">
        <h2>Inscription</h2>
        <p>Employeur</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nom de l'entreprise</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
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
  <label>Téléphone</label>
  <input
    type="tel"
    value={phone}
    onChange={handlePhoneChange}
    required
    pattern="\d{10}" 
    title="Veuillez entrer un numéro de téléphone valide (10 chiffres)"
  />
          </div>
          <div className="input-group">
            <label>Adresse</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
          <button type="submit">S'inscrire</button>
        </form>
      </div>
    </div>
  );
}

export default InscriptionEnt;
