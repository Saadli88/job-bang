const express = require('express');
const router = express.Router();
const candidatController = require('../controllers/candidatController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', candidatController.register);
router.post('/login', candidatController.login);
router.get('/:id', authMiddleware, candidatController.getCandidatById);//cherhcer info
router.put('/:id', authMiddleware, candidatController.updateCandidat);

module.exports = router;
