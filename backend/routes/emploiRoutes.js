const express = require('express');
const router = express.Router();
const emploiController = require('../controllers/emploiController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, emploiController.ajouterEmploi);
router.get('/', authMiddleware, emploiController.afficherEmplois);
router.get('/:id', authMiddleware, emploiController.getEmploisByUserId);//?filtrer
router.put('/:id', authMiddleware, emploiController.modifierEmploi);
router.delete('/:id', authMiddleware, emploiController.suppEmploi);

module.exports = router;
