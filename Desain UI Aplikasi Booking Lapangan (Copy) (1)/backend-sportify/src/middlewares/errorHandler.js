const { buildErrorResponse } = require('../utils/responseBuilder');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';
  const details = err.details || undefined;
  return res.status(status).json(buildErrorResponse(message, details));
};

module.exports = { errorHandler };
