const express = require("express");
const RentalController = require("../rental/rentals.controller");
const router = express.Router();

router.post("/rentals", RentalController.createRental);
router.get("/rentals", RentalController.getAllRentals);
router.get("/rentals/:id", RentalController.getRentalById);
router.get("/users/:userId/rentals", RentalController.getUserRentals);
router.patch("/rentals/:id/status", RentalController.updateRentalStatus);
router.post("/rentals/:id/cancel", RentalController.cancelRental);

module.exports = router;
