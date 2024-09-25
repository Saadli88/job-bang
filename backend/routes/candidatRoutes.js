const express = require('express');
const router = express.Router();
const candidatController = require('../controllers/candidatController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', candidatController.ajouterCandidat);
router.post('/login', candidatController.loginCandidat);
router.get('/:id', authMiddleware, candidatController.afficherCandidat);
router.put('/:id', authMiddleware, candidatController.modifierCandidat);
router.post('/:id/like', authMiddleware, candidatController.likeEmploi); 
router.delete('/:id/unlike', authMiddleware, candidatController.unlikeEmploi); 

module.exports = router;
