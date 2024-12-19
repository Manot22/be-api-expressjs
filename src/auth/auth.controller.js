const AuthService = require("../auth/auth.service");
const AuthValidation = require("../auth/auth.validation");
const ResponseHandler = require("../utils/responseHandler");

class AuthContoller {
  async register(req, res) {
    try {
      const { error } = AuthValidation.registerValidation(req.body);
      if (error) {
        return ResponseHandler.validationError(res, error.details);
      }

      const user = await AuthService.userRegister(req.body);

      ResponseHandler.success(res, 200, "User registered succesfully", user);
    } catch (error) {
      if (error.message === "Email already exssts") {
        return ResponseHandler.error(res, 409, error.message);
      }
      ResponseHandler.error(res, 500, "Registration failed", error.message);
    }
  }

  async login(req, res) {
    try {
      const { error } = AuthValidation.loginValidation(req.body);
      if (error) {
        return ResponseHandler.validationError(res, error.details);
      }

      const { user, token } = await AuthService.loginUser(req.body);

      ResponseHandler.success(res, 200, "Login successful", { user, token });
    } catch (error) {
      if (error.message === "Invalid email or password") {
        return ResponseHandler.error(res, 401, error.message);
      }
      ResponseHandler.error(res, 500, "Login failed", error.message);
    }
  }

  async getProfile(req, res) {
    try {
      const userId = parseInt(req.user.id);

      if (isNaN(userId)) {
        return ResponseHandler.notFound(res, 400, "user id not found");
      }
      const profile = await AuthService.getUserProfile(userId);

      ResponseHandler.success(
        res,
        200,
        "Profile retrieved successfully",
        profile
      );
    } catch (error) {
      ResponseHandler.error(
        res,
        500,
        "Failed to retrieve profile",
        error.message
      );
    }
  }
}

module.exports = new AuthContoller();
