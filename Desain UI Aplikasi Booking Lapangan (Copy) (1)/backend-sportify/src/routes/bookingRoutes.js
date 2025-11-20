const express = require('express');
const bookingController = require('../controllers/bookingController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, bookingController.listBookings);
router.get('/me', authMiddleware, bookingController.listMyBookings);
router.post('/', authMiddleware, bookingController.createBooking);

module.exports = router;
