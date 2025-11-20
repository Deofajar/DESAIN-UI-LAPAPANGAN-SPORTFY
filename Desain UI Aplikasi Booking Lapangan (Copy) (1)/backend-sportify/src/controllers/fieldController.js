const fieldRepository = require('../repositories/fieldRepository');
const { buildSuccessResponse, buildErrorResponse } = require('../utils/responseBuilder');

const listFields = async (_req, res, next) => {
  try {
    const fields = await fieldRepository.listFields();
    return res.json(buildSuccessResponse('Fields fetched', fields));
  } catch (error) {
    next(error);
  }
};

const getField = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const field = await fieldRepository.findFieldById(id);
    if (!field) {
      return res.status(404).json(buildErrorResponse('Field not found'));
    }
    return res.json(buildSuccessResponse('Field fetched', field));
  } catch (error) {
    next(error);
  }
};

const createField = async (req, res, next) => {
  try {
    const { name, location, pricePerHour } = req.body;
    const field = await fieldRepository.createField({ name, location, pricePerHour: Number(pricePerHour) });
    return res.status(201).json(buildSuccessResponse('Field created', field));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listFields,
  getField,
  createField,
};
