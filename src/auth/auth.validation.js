const Joi = require("joi");

class AuthValidation {
  static registerValidation(data) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required().messages({
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name cannot be more than 50 characters",
        "any.required": "Name is required",
      }),
      email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
      }),
      password: Joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters",
        "any.required": "Password is required",
      }),
      confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .required()
        .messages({
          "any.only": "Passwords must match",
          "any.required": "Confirm password is required",
        }),

      phone: Joi.string().required(),
    }).with("password", "confirmPassword");

    return schema.validate(data);
  }

  // Validasi untuk login
  static loginValidation(data) {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
      }),
      password: Joi.string().required().messages({
        "any.required": "Password is required",
      }),
    });

    return schema.validate(data);
  }
}

module.exports = AuthValidation;
