const express = require('express');
const fieldController = require('../controllers/fieldController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', fieldController.listFields);
router.get('/:id', fieldController.getField);
router.post('/', authMiddleware, fieldController.createField);

module.exports = router;
