// controllers/permissionController.js
const Permission = require('../models/Permission');

// Get all permissions
exports.getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.findAll();
        res.json(permissions);
    } catch (error) {
        console.error('Error fetching permissions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new permission
exports.createPermission = async (req, res) => {
    const { name } = req.body;
    try {
        if(name){

            const permission = await Permission.create({ name });
            res.status(201).json(permission);
        }
        else {
            res.status(400).json({ error: 'Name is required' }); 
        }
    } catch (error) {
        console.error('Error creating permission:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a permission by ID
exports.updatePermission = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }
        const permission = await Permission.findByPk(id);
        if (!permission) {
            return res.status(404).json({ error: 'Permission not found' });
        }
        await permission.update({ name });
        res.json(permission);
    } catch (error) {
        console.error('Error updating permission:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a permission by ID
exports.deletePermission = async (req, res) => {
    const { id } = req.params;
    try {
        const permission = await Permission.findByPk(id);
        if (!permission) {
            return res.status(404).json({ error: 'Permission not found' });
        }
        await permission.destroy();
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting permission:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
