const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const { createRoleSchema, updateRoleSchema } = require('../schemas/roleSchema');
const { getAllRoles, createRole, getRoleById, updateRole } = require('../controllers/rolesController');

// localhost:3000/api/v1/role/ --> [GET] all-roles
router.get('/', getAllRoles);
router.post('/', validate(createRoleSchema), createRole);
router.get('/:id', getRoleById);
router.put('/:id', validate(updateRoleSchema), updateRole);

module.exports = router;