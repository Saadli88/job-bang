const express = require('express');
const router = express.Router();
const employeurController = require('../controllers/employeurController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes for employers
router.post('/register', employeurController.register); // Register a new employer
router.post('/login', employeurController.login); // Employer login
router.get('/:id', authMiddleware, employeurController.getEmployeurById); // Get employer information
router.put('/:id', authMiddleware, employeurController.updateEmployeur); // Update employer information

module.exports = router;
