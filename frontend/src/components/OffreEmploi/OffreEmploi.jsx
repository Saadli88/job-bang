import React, { useState } from "react";
import "./OffreEmploi.css";

function OffreEmploi() {
  const [sector, setSector] = useState("Technology"); // Default sector
  const [jobTitle, setJobTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log(`Job Title: ${jobTitle}, Sector: ${sector}, Salary: ${salary}`);
  };

  return (
    <div className="offre-emploi-container">
      <h2>Job Offer</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Sector</label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            required
          >
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Finance">Finance</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="input-group">
          <label>Salary</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit Job Offer</button>
      </form>
    </div>
  );
}

export default OffreEmploi;
