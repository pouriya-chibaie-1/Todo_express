// controllers/roleController.js
const {Permission} = require('../models/associations');
const {Role} = require('../models/associations');

// Get all roles
exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new role
exports.createRole = async (req, res) => {
    const { name } = req.body;
    console.log("name = ",req.body)
    try {
        const role = await Role.create({ name:name });
        res.status(201).json(role);
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a role by ID
exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        await role.update({ name });
        res.json(role);
    } catch (error) {
        console.error('Error updating role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a role by ID
exports.deleteRole = async (req, res) => {
    const { id } = req.params;
    try {
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
        await role.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.assignPermissionsToRole = async (req, res) => {
    const { roleId :role_id, permissionIds } = req.body;
    try {
        // console.log("roleId = ",role_id)
        // console.log("permissionIds = ",permissionIds)
        // Assuming you have a Role model and a Permission model
        const role = await Role.findByPk(role_id);
        if (!role) { 
            return res.status(404).json({ error: 'Role not found' });
        }
console.log("role",role)
        // Assuming you have a Many-to-Many relationship between Role and Permission
        // and a junction table RolePermission
        // You would typically add the permissions to the role
        await role.setPermissions(permissionIds);

        res.status(200).json({ message: 'Permissions assigned successfully' });
    } catch (error) {
        console.error('Error assigning permissions to role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getRolePermissions = async (req, res) => {
    const {id: roleId } = req.params; // Assuming roleId is part of the URL params
  console.log("roleId = ",roleId)
    try {
        // Assuming you have a Role model and a Permission model
        const role = await Role.findByPk(roleId, { include: Permission });
        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }
                  console.log("role",role.Permissions)
        // Extract permissions from the role object
        const permissions = role.Permissions .map(permission => ({
            id: permission._id,
            name: permission.name,
            // Add other fields you want to include
        }));

        res.status(200).json({ permissions });
    } catch (error) {
        console.error('Error getting role permissions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};