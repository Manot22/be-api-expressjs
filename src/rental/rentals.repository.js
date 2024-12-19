const prisma = require("../db");

class RentalRepository {
  async create(data) {
    return await prisma.rental.create({
      data: {
        userId: data.userId,
        carId: data.carId,
        pickupDate: new Date(data.pickupDate),
        returnDate: new Date(data.returnDate),
        totalCost: data.totalCost,
        status: data.status || "PENDING",
      },
      include: {
        user: true,
        car: true,
      },
    });
  }

  async findAll() {
    return await prisma.rental.findMany({
      include: {
        user: true,
        car: true,
        payment: true,
      },
    });
  }

  async findById(id) {
    return await prisma.rental.findUnique({
      where: { id },
      include: {
        user: true,
        car: true,
        payment: true,
      },
    });
  }

  async findByUser(userId) {
    return await prisma.rental.findMany({
      where: { userId },
      include: {
        car: true,
        payment: true,
      },
    });
  }

  async update(id, data) {
    return await prisma.rental.update({
      where: { id },
      data,
      include: {
        user: true,
        car: true,
        payment: true,
      },
    });
  }

  async delete(id) {
    return await prisma.rental.delete({
      where: { id },
    });
  }
}

module.exports = new RentalRepository();
