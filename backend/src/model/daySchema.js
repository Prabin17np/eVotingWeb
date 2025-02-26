// const { DataTypes } = require("sequelize");
// const { sequelize } = require("../database/db");


// const day = sequelize.define("days", {

//     dayId: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },

//     description:{
//         type: DataTypes.STRING,
//         allowNull: false,
//     },



// });

// (async () => {
//     try {
//       await day.sync();
//       console.log("Days table has been created");
//     } catch (error) {
//       console.log("Error: ", error.message);
//     }
//   })();

//   module.exports = day;