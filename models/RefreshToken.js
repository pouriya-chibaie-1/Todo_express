const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const User = require('./User');

const RefreshToken = sequelize.define('refreshToken', {
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  }
});

RefreshToken.belongsTo(User, { foreignKey: 'user_id' });

module.exports = RefreshToken;