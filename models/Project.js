const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const User = require('./User');

const Project = sequelize.define('Project', {
    projectId: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

Project.belongsTo(User, { foreignKey: 'userId' });

module.exports = Project;