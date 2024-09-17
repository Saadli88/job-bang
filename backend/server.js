const express = require('express');
const connectDB = require('./config/db');
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//Commande a faire dans le dossier backend
//npm install express mongoose bcryptjs jsonwebtoken
