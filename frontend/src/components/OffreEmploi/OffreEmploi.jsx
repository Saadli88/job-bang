import React, { useState } from "react"; 
import NavBarEnt from "../NavBarEnt/NavBarEnt";
import { locations } from '../../data/locations'; // Importer la liste des lieux
import "./OffreEmploi.css";

function OffreEmploi() {
  const [showForm, setShowForm] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState(locations[0]);  // Utiliser la première location par défaut
  const [category, setCategory] = useState("Technologie");
  const [employerEmail, setEmployerEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      nom_entreprise: companyName,
      nom_poste: jobTitle,
      salaire: salary,
      emplacement: location,
      categorie: category,
      email_employeur: employerEmail,
    });
    setCompanyName("");
    setJobTitle("");
    setSalary("");
    setLocation(locations[0]);  // Réinitialiser l'emplacement
    setCategory("Technologie");
    setEmployerEmail("");
    setShowForm(true);
  };

  return (
    <div className="entreprise-container">
      <NavBarEnt />
      <div className="content">
        <aside className="sidebar">
          <ul>
            <li>Tableau de bord</li>
            <li>
              <a href="#" className="sidebar-link" onClick={() => setShowForm(true)}>
                Créer un poste
              </a>
            </li>
            <li>Mes annonces</li>
          </ul>
        </aside>
        {showForm ? (
          <div className="offre-emploi-container">
            <h2>Offre d'emploi</h2>
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
                <label>Nom du poste</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Salaire</label>
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[0-9]*[.,]?[0-9]*$/.test(value) || value === "") {
                      setSalary(value);
                    }
                  }}
                  required
                />
              </div>

              <div className="input-group">
                <label>Emplacement</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  {locations.map((loc, index) => (
                    <option key={index} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="input-group">
                <label>Catégorie</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="Technologie">Technologie</option>
                  <option value="Santé">Santé</option>
                  <option value="Environnement">Environnement</option>
                  <option value="Design">Design</option>
                  <option value="Management">Management</option>
                  <option value="Média">Média</option>
                  <option value="Finance">Finance</option>
                  <option value="Biologie">Biologie</option>
                  <option value="Énergie">Énergie</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              
              <div className="input-group">
                <label>Email de l'employeur</label>
                <input
                  type="email"
                  value={employerEmail}
                  onChange={(e) => setEmployerEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Soumettre l'offre d'emploi</button>
            </form>
          </div>
        ) : (
          <p>Veuillez sélectionner une option dans le menu.</p>
        )}
      </div>
    </div>
  );
}

export default OffreEmploi;
