const buildPaymentPayload = (booking, method) => ({
  bookingId: booking.id,
  amount: booking.field.pricePerHour,
  method,
  description: `Payment for booking #${booking.id}`,
});

module.exports = { buildPaymentPayload };
