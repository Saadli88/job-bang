const express = require('express');
const connectDB = require('./config/db');
const candidatRoutes = require('./routes/candidatRoutes');
const entrepriseRoutes = require('./routes/entrepriseRoutes');
const offreRoutes = require('./routes/offreRoutes');

const app = express();

// Connexion à la base de données
connectDB();

// Middleware
app.use(express.json());


// Routes
app.use('/api/entreprises', entrepriseRoutes);
app.use('/api/offres', offreRoutes);
app.use('/api/candidats', candidatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//Commande a faire dans le dossier backend
//npm install express mongoose bcryptjs jsonwebtoken
/** 
// ajoute data
app.post('/api/data', async (req, res) => {
    try {
      const existingEntries = await DataModel.find({ 
        name: { $in: req.body.map(entry => entry.name) }
      });
  
      const existingNames = existingEntries.map(entry => entry.name);
      const newDataEntries = req.body.filter(entry => !existingNames.includes(entry.name));
  
      if (newDataEntries.length > 0) {
        const savedEntries = await DataModel.insertMany(newDataEntries);
        return res.status(201).send(savedEntries);
      } else {
        return res.status(200).send({ message: 'No new data to add' });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  });
 */ 
