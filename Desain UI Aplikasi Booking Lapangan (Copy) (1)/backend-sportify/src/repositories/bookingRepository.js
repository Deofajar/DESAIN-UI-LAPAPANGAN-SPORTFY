const { prisma } = require('../config/db');

const listBookings = () =>
  prisma.booking.findMany({ include: { user: true, field: true, payment: true } });

const listUserBookings = (userId) =>
  prisma.booking.findMany({ where: { userId }, include: { field: true, payment: true } });

const createBooking = (data) =>
  prisma.booking.create({ data, include: { field: true, payment: true } });

const updateBookingStatus = (id, status) =>
  prisma.booking.update({ where: { id }, data: { status } });

module.exports = {
  listBookings,
  listUserBookings,
  createBooking,
  updateBookingStatus,
};
