const Permission = require('./Permission');
const Role = require('./Role');

// Define the many-to-many relationship
Permission.belongsToMany(Role, { through: 'RolePermission' });
Role.belongsToMany(Permission, { through: 'RolePermission' });

module.exports = {
  Permission,
  Role
};