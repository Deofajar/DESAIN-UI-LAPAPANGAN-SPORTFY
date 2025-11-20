const bookingRepository = require('../repositories/bookingRepository');
const fieldRepository = require('../repositories/fieldRepository');
const { buildSuccessResponse, buildErrorResponse } = require('../utils/responseBuilder');

const listBookings = async (_req, res, next) => {
  try {
    const bookings = await bookingRepository.listBookings();
    return res.json(buildSuccessResponse('Bookings fetched', bookings));
  } catch (error) {
    next(error);
  }
};

const listMyBookings = async (req, res, next) => {
  try {
    const bookings = await bookingRepository.listUserBookings(req.user.id);
    return res.json(buildSuccessResponse('My bookings fetched', bookings));
  } catch (error) {
    next(error);
  }
};

const createBooking = async (req, res, next) => {
  try {
    const { fieldId, startTime, endTime } = req.body;
    const field = await fieldRepository.findFieldById(Number(fieldId));
    if (!field) {
      return res.status(404).json(buildErrorResponse('Field not found'));
    }

    const booking = await bookingRepository.createBooking({
      userId: req.user.id,
      fieldId: Number(fieldId),
      bookingDate: new Date(),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      status: 'PENDING',
    });

    return res.status(201).json(buildSuccessResponse('Booking created', booking));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listBookings,
  listMyBookings,
  createBooking,
};
