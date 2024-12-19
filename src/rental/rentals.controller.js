const RentalService = require("../rental/rentals.service");
const ResponseHandler = require("../utils/responseHandler");

class RentalController {
  // Backend rental controller
  createRental = async (req, res) => {
    try {
      console.log("Received data:", req.body); // Log data yang diterima

      // Validasi data
      const { userId, carId, pickupDate, returnDate } = req.body;
      if (!userId || !carId || !pickupDate || !returnDate) {
        return res.status(400).json({
          message: "Missing required fields",
        });
      }

      // Proses create rental
      const rental = await RentalService.createRental(req.body);

      return res.status(201).json({
        message: "Rental created successfully",
        data: rental,
      });
    } catch (error) {
      console.error("Backend error:", error);
      return res.status(500).json({
        message: error.message || "Failed to create rental",
      });
    }
  };

  async getAllRentals(req, res) {
    try {
      const rentals = await RentalService.getAllRentals();
      ResponseHandler.success(
        res,
        200,
        "Get all rentals successfully",
        rentals
      );
    } catch (error) {
      ResponseHandler.error(res, 500, "Filed to Get All Rentals", error);
    }
  }

  async getRentalById(req, res) {
    try {
      const rental = await RentalService.getRentalById(parseInt(req.params.id));
      ResponseHandler.success(
        res,
        200,
        "Get rental by id successfully",
        rental
      );
    } catch (error) {
      ResponseHandler.error(res, 500, "Filed to Get Rental by Id", error);
    }
  }

  async getUserRentals(req, res) {
    try {
      const rentals = await RentalService.getUserRentals(
        parseInt(req.params.userId)
      );
      ResponseHandler.success(
        res,
        200,
        "Get User rental by id Successfully",
        rentals
      );
    } catch (error) {
      ResponseHandler.error(res, 500, "Filed to Get User Rental", error);
    }
  }

  async updateRentalStatus(req, res) {
    try {
      const rental = await RentalService.updateRentalStatus(
        parseInt(req.params.id),
        req.body.status
      );
      ResponseHandler.success(
        res,
        200,
        "Updated Rental Status Successfully",
        rental
      );
    } catch (error) {
      ResponseHandler.error(res, 500, "Filed Updating Status Rental", error);
    }
  }

  async cancelRental(req, res) {
    try {
      const rental = await RentalService.cancelRental(parseInt(req.params.id));
      ResponseHandler.success(res, 200, "Cancle rental successfully", rental);
    } catch (error) {
      ResponseHandler.error(res, 500, "Filed to cancle rental", error);
    }
  }
}

module.exports = new RentalController();
