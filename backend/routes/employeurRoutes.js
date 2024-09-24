const express = require('express');
const router = express.Router();
const employeurController = require('../controllers/employeurController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', employeurController.register);
router.post('/login', employeurController.login);
router.get('/:id', authMiddleware, employeurController.getEmployeurById);//cherhcer info
router.put('/:id', authMiddleware, employeurController.updateEmployeur);


module.exports = router;
