const { body, param } = require('express-validator');

const emailRule = body('email').isEmail().withMessage('Email is invalid');
const passwordRule = body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters');
const idParamRule = param('id').isInt().withMessage('Id must be an integer');

module.exports = {
  emailRule,
  passwordRule,
  idParamRule,
};
