const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const { createRoleSchema, updateRoleSchema, deleteRoleSchema } = require('../schemas/roleSchema');
const { getAllRoles, createRole, getRoleById, updateRole, deleteRole } = require('../controllers/rolesController');

router.get('/', getAllRoles);
router.post('/', validate(createRoleSchema), createRole);
router.get('/:id', getRoleById);
router.put('/:id', validate(updateRoleSchema), updateRole);
router.delete('/:id', validate(deleteRoleSchema), deleteRole);

module.exports = router;