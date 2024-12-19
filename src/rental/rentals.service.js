const RentalRepository = require("../rental/rentals.repository");
const prisma = require("../db");

class RentalService {
  async createRental(rentalData) {
    try {
      const car = await prisma.car.findUnique({
        where: { id: rentalData.carId },
      });

      if (!car || car.status !== "AVAILABLE") {
        throw new Error("Car is not available for rental");
      }

      const pickupDate = new Date(rentalData.pickupDate);
      const returnDate = new Date(rentalData.returnDate);
      const days = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24));
      const totalCost = car.dailyRate * days;

      const rental = await RentalRepository.create({
        ...rentalData,
        totalCost,
      });

      await prisma.car.update({
        where: { id: rentalData.carId },
        data: { status: "RENTED" },
      });

      return rental;
    } catch (error) {
      throw new Error(`Failed to create rental: ${error.message}`);
    }
  }

  async getAllRentals() {
    return await RentalRepository.findAll();
  }

  async getRentalById(id) {
    const rental = await RentalRepository.findById(id);
    if (!rental) {
      throw new Error("Rental not found");
    }
    return rental;
  }

  async getUserRentals(userId) {
    return await RentalRepository.findByUser(userId);
  }

  async updateRentalStatus(id, status) {
    const rental = await this.getRentalById(id);

    if (status === "COMPLETED") {
      await prisma.car.update({
        where: { id: rental.carId },
        data: { status: "AVAILABLE" },
      });
    }

    return await RentalRepository.update(id, { status });
  }

  async cancelRental(id) {
    const rental = await this.getRentalById(id);

    if (rental.status !== "PENDING") {
      throw new Error("Only pending rentals can be cancelled");
    }

    await prisma.car.update({
      where: { id: rental.carId },
      data: { status: "AVAILABLE" },
    });

    return await RentalRepository.update(id, { status: "CANCELLED" });
  }
}

module.exports = new RentalService();
