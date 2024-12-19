const express = require("express");
const router = express.Router();
const AuthContoller = require("../auth/auth.controller");
const AuthMiddleware = require("../middleware/authMiddleware");

router.post("/register", AuthContoller.register);
router.post("/login", AuthContoller.login);

router.get("/profile", AuthMiddleware.authenticate, AuthContoller.getProfile);

module.exports = router;
