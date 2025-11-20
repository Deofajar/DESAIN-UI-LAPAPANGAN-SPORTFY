const userRepository = require('../repositories/userRepository');
const { buildSuccessResponse, buildErrorResponse } = require('../utils/responseBuilder');

const getProfile = async (req, res, next) => {
  try {
    return res.json(buildSuccessResponse('Profile fetched', req.user));
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    const updated = await userRepository.updateUser(req.user.id, { name });
    return res.json(buildSuccessResponse('Profile updated', updated));
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = await userRepository.findById(id);
    if (!user) {
      return res.status(404).json(buildErrorResponse('User not found'));
    }
    return res.json(buildSuccessResponse('User fetched', user));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getUserById,
};
