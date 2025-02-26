const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { sequelize } = require("./database/db"); // Assuming sequelize is exported here
const userRouter = require("./routes/userRoute");
const pollRouter = require("./routes/pollRoute");
const authRouter = require("./routes/authRoute");
const { authenticateToken } = require("./middleware/token-middleware");

dotenv.config();  // Load environment variables

// Initialize the app
const app = express();

// Define the port
const PORT = process.env.PORT || 5000; // Default to 5000 if not defined in .env

// Middleware
app.use(cors()); // To allow cross-origin requests from your React app
app.use(bodyParser.json()); // To parse JSON bodies
app.use(authenticateToken); // Token authentication middleware

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/poll", pollRouter);

// Define a 404 route for unhandled paths
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Start the server
(async () => {
  try {
    // Test the database connection
    await sequelize.authenticate(); 
    console.log("Database connected successfully");

    // Sync models with DB
    await sequelize.sync(); 
    console.log("Models synced successfully");

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();
