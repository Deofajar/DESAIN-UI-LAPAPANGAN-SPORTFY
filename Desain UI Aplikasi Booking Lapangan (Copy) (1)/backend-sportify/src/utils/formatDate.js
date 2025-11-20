const formatDate = (date) => {
  const instance = date instanceof Date ? date : new Date(date);
  return instance.toISOString();
};

module.exports = { formatDate };
