const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");
const Trek = require("./trekSchema");


const request = sequelize.define("requests", {


    requestId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    noOfPeople:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message:{   
        type: DataTypes.TEXT,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('Pending', 'Confirmed', 'Cancelled'),
        allowNull: false,
        defaultValue: "Pending"
    },
    
    trekId: {  // Adding trekId as a foreign key
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Trek, // Reference the Trek model
            key: "trekId"    // Foreign key references the id column in Treks table
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }
    
 }, {

});

(async () => {
    try {
      await request.sync();
      console.log("Request table has been created");
    } catch (error) {
      console.log("Error: ", error.message);
    }
  })();

module.exports = request;