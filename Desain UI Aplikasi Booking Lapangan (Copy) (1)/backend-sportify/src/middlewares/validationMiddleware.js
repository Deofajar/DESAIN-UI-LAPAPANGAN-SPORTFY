const { validationResult } = require('express-validator');
const { buildErrorResponse } = require('../utils/responseBuilder');

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(buildErrorResponse('Validation failed', errors.array()));
  }
  next();
};

module.exports = { validationMiddleware };
