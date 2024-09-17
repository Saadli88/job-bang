const express = require('express');
const router = express.Router();
const offreController = require('../controllers/offreController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, offreController.createOffre);

// Ajoute ici les routes pour modifier et voir les offres

module.exports = router;
