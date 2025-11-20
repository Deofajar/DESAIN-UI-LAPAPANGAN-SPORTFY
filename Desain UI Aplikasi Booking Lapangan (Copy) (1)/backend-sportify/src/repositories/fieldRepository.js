const { prisma } = require('../config/db');

const listFields = () => prisma.field.findMany({ include: { bookings: true } });
const findFieldById = (id) => prisma.field.findUnique({ where: { id }, include: { bookings: true } });
const createField = (data) => prisma.field.create({ data });
const updateField = (id, data) => prisma.field.update({ where: { id }, data });

module.exports = {
  listFields,
  findFieldById,
  createField,
  updateField,
};
