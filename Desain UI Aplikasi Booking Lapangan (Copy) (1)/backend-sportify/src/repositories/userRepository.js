const { prisma } = require('../config/db');

const findByEmail = (email) => prisma.user.findUnique({ where: { email } });
const findById = (id) => prisma.user.findUnique({ where: { id } });
const createUser = (data) => prisma.user.create({ data });
const updateUser = (id, data) => prisma.user.update({ where: { id }, data });

module.exports = {
  findByEmail,
  findById,
  createUser,
  updateUser,
};
