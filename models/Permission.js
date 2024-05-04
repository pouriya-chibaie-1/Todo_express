// Permission.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const Role = require('./Role');

const Permission = sequelize.define('Permission', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  permission_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  }
});
module.exports = Permission;
