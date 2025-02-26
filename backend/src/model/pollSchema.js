const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Polls = sequelize.define("polls", {
  pollId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull:false,
  },

  startdate: {
    type: DataTypes.DATE, // Change to DATE type
    allowNull: false,
  },
  enddate: {
    type: DataTypes.DATE, // Change to DATE type
    allowNull: false,
  },
  totalvote: {
    type: DataTypes.INTEGER, // Use INTEGER for numbers
    allowNull: false,
    defaultValue: 0, // Default to 0
  },
  status: {
    type: DataTypes.ENUM("active", "draft"),
    allowNull: false,
    defaultValue: "draft",
  },
});

(async () => {
  try {
    await Polls.sync({ alter: true }); // Use `alter: true` to update schema if needed
    console.log("Polls table has been created or updated");
  } catch (error) {
    console.log("Error: ", error.message);
  }
})();

module.exports = Polls;
