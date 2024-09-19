const express = require('express');
const router = express.Router();
const offreController = require('../controllers/offreController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, offreController.createOffre);
router.get('/', authMiddleware, offreController.getAllOffres);
router.get('/:id', authMiddleware, offreController.getOffreById);//?filtrer
router.put('/:id', authMiddleware, offreController.updateOffre);
router.delete('/:id', authMiddleware, offreController.deleteOffre);

module.exports = router;
