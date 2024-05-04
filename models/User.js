const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const User = sequelize.define('User', {
  user_id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('User', 'Editor', 'Admin'),
    allowNull: false,
    defaultValue: 'User'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;