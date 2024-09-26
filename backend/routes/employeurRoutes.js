const express = require('express');
const router = express.Router();
const employeurController = require('../controllers/employeurController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/ins', employeurController.register); 
router.post('/con', employeurController.login); 
router.get('/:id', authMiddleware, employeurController.getEmployeurById); 
router.put('/:id', authMiddleware, employeurController.updateEmployeur); 
router.get('/ann', authMiddleware, employeurController.getAllEmploi);
module.exports = router;
