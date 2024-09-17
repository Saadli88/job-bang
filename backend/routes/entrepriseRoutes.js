const express = require('express');
const router = express.Router();
const entrepriseController = require('../controllers/entrepriseController');

router.post('/register', entrepriseController.register);
router.post('/login', entrepriseController.login);

module.exports = router;
