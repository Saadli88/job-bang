const express = require('express');
const router = express.Router();
const entrepriseController = require('../controllers/entrepriseController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', entrepriseController.register);
router.post('/login', entrepriseController.login);
router.get('/:id', authMiddleware, entrepriseController.getEntrepriseById);//cherhcer info
router.put('/:id', authMiddleware, entrepriseController.updateEntreprise);


module.exports = router;
