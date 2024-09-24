const express = require('express');
const router = express.Router();
const candidatController = require('../controllers/candidatController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', candidatController.ajouterCandidat);
router.post('/login', candidatController.loginCandidat);
router.get('/:id', authMiddleware, candidatController.afficherCandidat);//cherhcer info
router.put('/:id', authMiddleware, candidatController.modifierCandidat);

module.exports = router;
