const express = require('express');
const connectDB = require('./config/db');
const candidatRoutes = require('./routes/candidatRoutes');
const employeurRoutes = require('./routes/employeurRoutes');
const emploiRoutes = require('./routes/emploiRoutes');

const app = express();

// Connexion à la base de données
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/employeurs', employeurRoutes);
app.use('/api/emplois', emploiRoutes);
app.use('/api/candidats', candidatRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend" });
});

// Middleware to handle not found routes
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

// Middleware to handle errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message || "An unknown error occurred." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
