const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { buildSuccessResponse, buildErrorResponse } = require('../utils/responseBuilder');
const userRepository = require('../repositories/userRepository');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return res.status(409).json(buildErrorResponse('Email already registered'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser({ name, email, password: hashedPassword });
    return res
      .status(201)
      .json(buildSuccessResponse('User registered', { id: user.id, email: user.email }));
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return res.status(401).json(buildErrorResponse('Invalid credentials'));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json(buildErrorResponse('Invalid credentials'));
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    return res.json(buildSuccessResponse('Login successful', { token }));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
