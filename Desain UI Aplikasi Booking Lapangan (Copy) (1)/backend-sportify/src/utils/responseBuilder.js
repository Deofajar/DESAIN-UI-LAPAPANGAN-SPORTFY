const buildSuccessResponse = (message, data = null) => ({
  status: 'success',
  message,
  data,
});

const buildErrorResponse = (message, errors = null) => ({
  status: 'error',
  message,
  errors,
});

module.exports = { buildSuccessResponse, buildErrorResponse };
