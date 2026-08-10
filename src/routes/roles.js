const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const { createRoleSchema } = require('../schemas/roleSchema');
const { getAllRoles, createRole } = require('../controllers/rolesController');

// localhost:3000/api/v1/role/ --> [GET] all-roles
router.get('/', getAllRoles);
router.post('/', validate(createRoleSchema), createRole);

module.exports = router;