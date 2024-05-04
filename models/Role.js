// Role.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");
const Permission = require("./Permission");

const Role = sequelize.define("Role", {
  name: { type: DataTypes.STRING, allowNull: false },
  role_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});
module.exports = Role;