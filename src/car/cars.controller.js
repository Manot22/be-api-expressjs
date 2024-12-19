const CarService = require("../car/cars.service");
const ResponseHandler = require("../utils/responseHandler");

class CarContoller {
  async getAllCar(req, res) {
    try {
      const cars = await CarService.getAllCar();

      ResponseHandler.success(res, 200, "Get all car successfully", cars);
    } catch (error) {
      ResponseHandler.error(res, 500, "Gagal Get All Car", error);
    }
  }

  async getCarByid(req, res) {
    try {
      const carId = parseInt(req.params.id);
      if (isNaN(carId)) {
        return ResponseHandler.notFound(res, 400, "Car id not found");
      }

      const car = await CarService.getCarById(carId);

      ResponseHandler.success(res, 200, "Get Car by id successfully", car);
    } catch (error) {
      ResponseHandler.error(res, 500, "Failed to get car by id");
    }
  }

  async createCar(req, res) {
    try {
      const { name, brand, model, plateNumber, dailyRate } = req.body;

      if (!name || !brand || !model || !plateNumber || !dailyRate) {
        return ResponseHandler.error(res, 400, "Missing required fields");
      }

      const newCar = await CarService.createCar(req.body, req.file);
      ResponseHandler.success(res, 200, "Create New Car Successfully", newCar);
    } catch (error) {
      ResponseHandler.error(
        res,
        500,
        "Error creating new Car, PlateNumber is already used",
        error
      );
    }
  }

  async updateCar(req, res) {
    try {
      const carId = parseInt(req.params.id);

      if (isNaN(carId)) {
        return ResponseHandler.error(res, 400, "Invalid id Car");
      }

      const updatedCar = await CarService.updateCar(carId, req.body, req.file);

      ResponseHandler.success(res, 200, "Update Car successfully", updatedCar);
    } catch (error) {
      ResponseHandler.error(res, 400, "failed updated car");
    }
  }

  async deleteCar(req, res) {
    try {
      const carId = parseInt(req.params.id);

      if (isNaN(carId)) {
        return ResponseHandler.error(res, 400, "Invalid Id format");
      }

      await CarService.deleteCar(carId);

      ResponseHandler.success(res, 200, "Car deleted successfully");
    } catch (error) {
      ResponseHandler.error(res, 500, "Failed to delete car", error);
    }
  }
}

module.exports = new CarContoller();
