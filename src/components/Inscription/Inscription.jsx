import React, { useState } from "react";
import "./Inscription.css";

function Inscription() {
  const [userType, setUserType] = useState("candidat"); // Default to "candidat"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the registration logic for candidate or entrepreneur
    console.log(`Registering as ${userType} with name: ${name}, email: ${email}`);
  };

  return (
    <div className="inscription-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Inscription;
