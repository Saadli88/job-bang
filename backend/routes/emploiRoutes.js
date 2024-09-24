const express = require('express');
const router = express.Router();
const emploiController = require('../controllers/emploiController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, emploiController.createEmploi);
router.get('/', authMiddleware, emploiController.getAllOffres);
router.get('/:id', authMiddleware, emploiController.getOffreById);//?filtrer
router.put('/:id', authMiddleware, emploiController.updateOffre);
router.delete('/:id', authMiddleware, emploiController.deleteOffre);

module.exports = router;
