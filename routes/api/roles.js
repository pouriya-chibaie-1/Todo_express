const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/RoleController');

router.get('/', roleController.getAllRoles);
router.get('/:id', roleController.getRolePermissions);
router.post('/', roleController.createRole);
router.post('/assign_permissions', roleController.assignPermissionsToRole); 
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;
