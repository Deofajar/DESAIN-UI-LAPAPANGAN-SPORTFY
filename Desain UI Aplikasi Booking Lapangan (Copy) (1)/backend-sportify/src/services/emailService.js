const sendWelcomeEmail = async (email, name) => {
  // Replace with provider integration (SendGrid/Mailgun/etc)
  return { delivered: true, to: email, template: 'welcome', name };
};

module.exports = { sendWelcomeEmail };
