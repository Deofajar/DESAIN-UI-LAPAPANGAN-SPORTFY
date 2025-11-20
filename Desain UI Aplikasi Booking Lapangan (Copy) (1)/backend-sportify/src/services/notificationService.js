const sendNotification = async (userId, message) => {
  // Replace with push notification provider integration
  return { delivered: true, userId, message };
};

module.exports = { sendNotification };
