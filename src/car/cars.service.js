const CarRepository = require("../car/cars.repository");
const fs = require("fs");
const path = require("path");

const UPLOAD_PATH = path.join(__dirname, "../uploads");
const BASE_URL =
  process.env.BASE_URL ||
  `http://localhost:${process.env.PORT || 3033}/uploads`;
class CarService {
  async getAllCar() {
    const response = await CarRepository.findAll();
    return response.map((car) => ({
      ...car,
      image: car.image ? `${BASE_URL}/${car.image}` : null,
    }));
  }

  async getCarById(id) {
    const response = await CarRepository.findById(id);
    if (!response) {
      throw new Error("Car not found");
    }
    return {
      ...response,
      image: response.image ? `${BASE_URL}/${response.image}` : null,
    };
  }

  async createCar(carData, file) {
    const image = file ? file.filename : null;

    const newCar = await CarRepository.createCar({
      name: carData.name,
      brand: carData.brand,
      model: carData.model,
      plateNumber: carData.plateNumber,
      dailyRate: carData.dailyRate,
      status: carData.status,
      image,
    });

    return {
      ...newCar,
      image: image ? `${BASE_URL}/${image}` : null,
    };
  }

  async updateCar(id, carData, file) {
    const existingCar = await CarRepository.findById(id);
    if (!existingCar) {
      throw new Error("Car not Found");
    }
    const updateDataCar = {
      ...(carData.name && { name: carData.name }),
      ...(carData.brand && { brand: carData.brand }),
      ...(carData.model && { model: carData.model }),
      ...(carData.plateNumber && { plateNumber: carData.plateNumber }),
      ...(carData.dailyRate && { dailyRate: carData.dailyRate }),
      ...(carData.status && { status: carData.status }),
    };

    if (file) {
      if (existingCar.image) {
        const oldImagePath = path.join(UPLOAD_PATH, existingCar.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateDataCar.image = file.filename;
    }
    const updatedCar = await CarRepository.updateCar(id, updateDataCar);

    return {
      ...updatedCar,
      image: updatedCar.image ? `${BASE_URL}/${updatedCar.image}` : null,
    };
  }

  async deleteCar(id) {
    const existingCar = await CarRepository.findById(id);
    if (!existingCar) {
      throw new Error("Car Not Found");
    }

    if (existingCar.image) {
      const imagePath = path.join(UPLOAD_PATH, existingCar.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    await CarRepository.deleteCar(id);
  }
}

module.exports = new CarService();
