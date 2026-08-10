const { Role } = require('../models');

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      attributes: ['id', 'name', 'created_at', 'updated_at'],
      order: [['created_at', 'DESC']]
    });

    return res.status(200).json({
      status: 'success',
      message: 'Get all data successfully.',
      total: roles.length,
      data: roles
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    const role = await Role.create({ name });

    return res.status(201).json({
      status: 'success',
      message: 'Created data successfully.',
      data: {
        id: role.id,
        name: role.name,
      }
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        status: 'error',
        errors: [
          {
            field: 'name',
            message: 'Input is already exist.'
          }
        ]
      });
    }

    return res.status(500).json({ status: 'error', message: error.message });
  }
}

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id, {
      attributes: ['id', 'name', 'created_at', 'updated_at'],
    });

    return res.status(200).json({
      status: 'success',
      message: `Get data id ${id} successfully.`,
      data: role
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({
        status: 'error',
        message: 'Data id ${id} not found.',
        data: role
      });
    }

    const updatedRole = await Role.update({ name },
      {
        where: {
          id: id,
        }
      }
    )

    return res.status(200).json({
      status: 'success',
      message: `Updated data id ${id} successfully.`,
      data: {
        id: id
      }
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        status: 'error',
        errors: [
          {
            field: 'name',
            message: 'Input is already exist.'
          }
        ]
      });
    }
    
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  getAllRoles,
  createRole,
  getRoleById,
  updateRole
};