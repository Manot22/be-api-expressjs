const prisma = require("../db");

class CarRepository {
  async findAll() {
    return await prisma.car.findMany({
      orderBy: {
        id: "desc",
      },
    });
  }

  async findById(id) {
    return await prisma.car.findUnique({
      where: { id },
    });
  }

  async createCar(data) {
    return await prisma.car.create({
      data,
    });
  }

  async updateCar(id, data) {
    return prisma.car.update({
      where: { id },
      data,
    });
  }

  async deleteCar(id) {
    return await prisma.car.delete({
      where: { id },
    });
  }
}

module.exports = new CarRepository();
