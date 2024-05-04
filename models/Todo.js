const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const User = require('./User');

const Todo = sequelize.define('Todo', {
    todo_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    todoName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    todoStatus:{
        type:DataTypes.ENUM('Pending', 'InProgress', 'Completed'),
        defaultValue:"Pending"
    }
  });
  Todo.belongsTo(User, { foreignKey: 'userId' });
  module.exports=Todo