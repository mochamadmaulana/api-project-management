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
    const name = req.body.name;

    const role = await Role.create({
      name: name
    });

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

module.exports = { 
  getAllRoles,
  createRole
};