const { buildPaymentPayload } = require('./paymentUtils');

const charge = async (booking, method) => {
  const payload = buildPaymentPayload(booking, method);
  // Mock external payment integration
  return {
    id: `pay_${Date.now()}`,
    status: 'PENDING',
    amount: booking.field.pricePerHour,
    method,
    payload,
  };
};

const handleWebhook = async (payload) => {
  // Validate webhook signature here in real integration
  return {
    received: true,
    reference: payload.reference || null,
  };
};

const paymentService = { charge, handleWebhook };

module.exports = paymentService;
