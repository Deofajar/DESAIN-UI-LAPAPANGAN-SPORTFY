const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { validationMiddleware } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post(
  '/register',
  [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })],
  validationMiddleware,
  authController.register,
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').notEmpty()],
  validationMiddleware,
  authController.login,
);

module.exports = router;
