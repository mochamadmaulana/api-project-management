const { Role } = require('../models');

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      attributes: ['id', 'name', 'created_at', 'updated_at'],
      order: [['created_at', 'DESC']]
    });

    return res.status(200).json({
      status: 'success',
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

    const role = await Role.create({name});

    return res.status(201).json({
      status: 'success',
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
      attributes: ['id', 'name', 'created_at', 'updated_at'],
    });

    return res.status(200).json({
      status: 'success',
      data: role
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = { 
  getAllRoles,
  createRole,
  getRoleById
};