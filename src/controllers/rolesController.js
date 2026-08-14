const { Role } = require('../models');

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      attributes: { exclude: ['deleted_at'] },
      order: [['created_at', 'DESC']]
    })

    return res.status(200).json({
      message: 'All data fetched successfully.',
      data: roles,
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    const roleExist = await Role.findOne({ where: { name } });

    if (roleExist) {
      return res.status(422).json({
        message: 'Unprocessable Entity.',
        errors: {
          name: "The name has already been taken."
        }
      });
    }

    const role = await Role.create({ name });

    return res.status(201).json({
      message: 'Created successfully.',
      data: {
        id: role.id,
        name: role.name,
      }
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id, {
      attributes: { exclude: ['deleted_at'] },
    });

    if (!role) {
      return res.status(404).json({
        message: 'Not Found.',
        errors: `Role with ID ${id} does not exist.`,
      });
    }

    return res.status(200).json({
      message: `Role with ID ${id} founded.`,
      data: role
    });
  } catch (error) {
    return res.status(500).json({ 
      message: 'Internal Server Error', 
      error: error.message 
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({
        message: 'Not Found.',
        errors: `Role with ID ${id} does not exist.`,
      });
    }

    await role.update({ name });

    return res.status(200).json({
      message: 'Updated successfully.',
      data: {
        id: role.id,
        name: role.name
      }
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({
        message: 'Unprocessable Entity',
        errors: {
          name: 'The name has already been taken.'
        }
      });
    }

    return res.status(500).json({ 
      message: 'Internal Server Error',
      error: error.message 
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Role.destroy({
      where: { id }
    });

    if (!deletedCount) {
      return res.status(404).json({
        message: 'Not Found.',
        errors: {
          id: `Role with ID ${id} does not exist.`
        }
      });
    }

    return res.status(200).json({
      message: 'Deleted successfully.'
    });
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(409).json({
        message: 'Conflict',
        errors: {
          id: 'Cannot delete this role because it is still in use by another record.'
        }
      });
    }

    return res.status(500).json({ 
      message: 'Internal Server Error',
      error: error.message 
    });
  }
}

module.exports = {
  getAllRoles,
  createRole,
  getRoleById,
  updateRole,
  deleteRole
};