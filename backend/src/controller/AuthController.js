const User = require("../model/userSchema");
const { generateToken } = require("../security/jwt-util");

const login = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body; // Capture isAdmin from frontend

    // Validate inputs
    if (!email) return res.status(400).send({ message: "Email is required" });
    if (!password) return res.status(400).send({ message: "Password is required" });

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).send({ message: "User not found" });

    // Check if password is correct
    if (user.password !== password) {
      return res.status(401).send({ message: "Incorrect credentials" });
    }

    // Role-based login restriction
    if (isAdmin && user.role !== "admin") {
      return res.status(403).send({ message: "Access denied. Not an admin account" });
    }

    if (!isAdmin && user.role === "admin") {
      return res.status(403).send({ message: "Please log in as an admin" });
    }

    // Generate JWT Token
    const token = generateToken({ user: user.toJSON() });

    return res.status(200).send({
      data: { access_token: token, role: user.role, userId: user.userId },
      message: "Successfully logged in",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to login" });
  }
};

const init = async (req, res) => {
  try {
    const user = req.user.user;
    delete user.password;
    res
      .status(201)
      .send({ data: user, message: "successfully fetched current  user" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

module.exports = { login, init };
