const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");


const trek  = sequelize.define("trek", {
    trekId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    region: {
        type: DataTypes.STRING,
        allowNull: false
    },
    difficulty: {
        type: DataTypes.ENUM('Easy', 'Moderate', 'Hard'),
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
   
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
});


(async () => {
    try {
      await trek.sync();
      console.log("Trek table has been created");
    } catch (error) {
      console.log("Error: ", error.message);
    }
  })();


  module.exports = trek;