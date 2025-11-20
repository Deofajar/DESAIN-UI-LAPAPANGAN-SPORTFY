const paymentService = require('../services/paymentService');
const bookingRepository = require('../repositories/bookingRepository');
const { buildSuccessResponse, buildErrorResponse } = require('../utils/responseBuilder');

const createPayment = async (req, res, next) => {
  try {
    const { bookingId, method } = req.body;
    const bookingIdNum = Number(bookingId);
    const booking = await bookingRepository.listBookings().then((list) =>
      list.find((item) => item.id === bookingIdNum),
    );
    if (!booking) {
      return res.status(404).json(buildErrorResponse('Booking not found'));
    }

    const payment = await paymentService.charge(booking, method);
    return res.status(201).json(buildSuccessResponse('Payment initiated', payment));
  } catch (error) {
    next(error);
  }
};

const handleWebhook = async (req, res, next) => {
  try {
    const payload = req.body;
    const result = await paymentService.handleWebhook(payload);
    return res.json(buildSuccessResponse('Webhook processed', result));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPayment,
  handleWebhook,
};
