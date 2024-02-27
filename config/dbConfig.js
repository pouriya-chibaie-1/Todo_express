// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.DATABASE_URI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports = connectDB;
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize( {
  host: 'localhost',
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  dialect: 'mysql', // Change this to your database dialect if necessary
  logging: false, // Set to true to log SQL queries 
  password: process.env.DB_PASSWORD,
  // define: {
  //   timestamps: true // Disable sequelize's default timestamp fields (createdAt and updatedAt)
  // }
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, testConnection };