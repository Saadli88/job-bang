const express = require('express');
const router = express.Router();
const emploiController = require('../controllers/emploiController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, emploiController.ajouterEmploi); // Create a new job
router.get('/', authMiddleware, emploiController.afficherEmplois); // Get all jobs
router.get('/user/:id', authMiddleware, emploiController.getEmploisByUserId); // Get jobs by user ID
router.put('/:id', authMiddleware, emploiController.modifierEmploi); // Update a job
router.delete('/:id', authMiddleware, emploiController.suppEmploi); // Delete a job

module.exports = router;
