const express = require("express");
const router = express.Router();
const CarContoller = require("../car/cars.controller");
const upload = require("../utils/fileUpload");
const AuthMiddleware = require("../middleware/authMiddleware");

router.get("/car", AuthMiddleware.authenticate, CarContoller.getAllCar);
router.get("/car/:id", CarContoller.getCarByid);
router.post("/car", upload.single("image"), CarContoller.createCar);
router.put("/car/:id", upload.single("image"), CarContoller.updateCar);
router.delete("/car/:id", CarContoller.deleteCar);

module.exports = router;
