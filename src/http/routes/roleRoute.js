const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/roleController');
const { createRoleValidator, updateRoleValidator } = require('../validators/roleValidator');

router.get('/', RoleController.index);
router.get('/:id', RoleController.show);
router.post('/', createRoleValidator, RoleController.store);
router.put('/:id', updateRoleValidator, RoleController.update);
router.delete('/:id', RoleController.destroy);

module.exports = router;