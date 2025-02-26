const User = require("../model/userSchema");

const create = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if all required fields are present
    if (!username || !email || !password) {
      return res.status(400).send({ message: "Invalid input, all fields are required." });
    }

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).send({ message: "User already exists with this email." });
      }

  // Create the new user
  const user = await User.create({
    username,
    email,
    password, // In a real-world scenario, don't forget to hash the password
    role: role || 'user', // Default role to 'user' if not provided
  });

     res.status(201).send({ data: user, message: "Successfully created user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

//Delete a user by ID

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

//Find the user by ID and delete
    const result = await User.destroy({
      where: { id: userId },//Use 'id' if it's the primary key in your model
    });

    if (result === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to delete user" });
  }
};

//Get all users

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },//Exculde the password field from the response
    });

    if (users.length === 0) {
      return res.status(404).send({ message: "No users found" });
    }

    res.status(200).send({ data: users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch users" });
  }
};

module.exports = { create, deleteUser, getAllUsers };
