const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRepository = require("../auth/auth.repository");

class AuthService {
  generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || " 1d",
      }
    );
  }

  async userRegister(userData) {
    const { name, email, phone, password } = userData;

    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserRepository.createUser({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    delete newUser.password;
    return newUser;
  }

  async loginUser(loginData) {
    const { email, password } = loginData;

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invallid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
    const token = this.generateToken(user);

    delete user.password;

    return {
      user,
      token,
    };
  }

  async getUserProfile(userId) {
    return await UserRepository.findById(userId);
  }
}

module.exports = new AuthService();
