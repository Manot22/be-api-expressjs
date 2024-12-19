const jwt = require("jsonwebtoken");
const ResponseHandler = require("../utils/responseHandler");

class AuthMiddleware {
  authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return ResponseHandler.error(res, 401, "No token provided");
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return ResponseHandler.error(res, 401, "Token error");
    }

    const token = parts[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return ResponseHandler.error(res, 401, "Token expired");
      }
      return ResponseHandler.error(res, 401, "Invalid token");
    }
  }

  authorize(roles) {
    return (req, res, next) => {
      if (!req.user) {
        return ResponseHandler.error(res, 401, "Unauthorized");
      }

      if (!roles.includes(req.user.role)) {
        return ResponseHandler.error(
          res,
          403,
          "Forbidden: Insufficient permissions"
        );
      }

      next();
    };
  }
}

module.exports = new AuthMiddleware();
