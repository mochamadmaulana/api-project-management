const RoleService = require('../../services/roleService');
const { handleSuccess } = require('../../utils/handleSuccess');

class RoleController {
  async index(req, res, next) {
    try {
      const { page, show, search} = req.query;
      const { data, pagination } = await RoleService.getPaginatedRoles(page, show, search);

      return handleSuccess(res, {
        message: 'Fetch all roles successfully',
        data,
        pagination
      });
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const id = req.params.id
      const user = await RoleService.getRoleById(id);

      return handleSuccess(res, {
        message: `Get role ID ${id} successfully`,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      const newUser = await RoleService.createRole(req.body);

      return handleSuccess(res, {
        statusCode: 201,
        message: 'Created successfully',
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const updatedUser = await RoleService.updateRole(req.params.id, req.body);

      return handleSuccess(res, {
        message: 'Updated successfully',
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      await RoleService.deleteRole(req.params.id);

      return handleSuccess(res, {
        message: 'Deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async forceDestroy(req, res, next) {
    try {
      await RoleService.forceDeleteRole(req.params.id);

      return handleSuccess(res, {
        message: 'Deleted permanent successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RoleController();