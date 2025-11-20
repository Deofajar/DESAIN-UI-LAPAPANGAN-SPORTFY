const jwt = require('jsonwebtoken');
const { prisma } = require('../config/db');
const { buildErrorResponse } = require('../utils/responseBuilder');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json(buildErrorResponse('Missing authorization header'));
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json(buildErrorResponse('Invalid authorization header'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json(buildErrorResponse('User not found'));
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(buildErrorResponse('Unauthorized', error));
  }
};

module.exports = { authMiddleware };
