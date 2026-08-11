const { Role } = require('../models');

const getAllRoles = async (req, res) => {
  try {
    const { page = 1, show = 10 } = req.query;
    const limit = parseInt(show);
    const offset = (parseInt(page) - 1) * limit;

    const [roles, totalItems] = await Promise.all([
      Role.findAll({
        limit: limit,
        offset: offset,
        attributes: ['id', 'name', 'created_at', 'updated_at'],
        order: [['created_at', 'DESC']]
      }),
      Role.count()
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return res.status(200).json({
      status: 'success',
      message: 'Get all data successfully.',
      data: roles,
      pagination: {
        show_item: roles.length,
        current_page: parseInt(page),
        total_item: totalItems,
        total_page: totalPages,
        has_next_page: page < totalPages 
      }
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    const roleExist = await Role.findOne({where: {name}});

    if (roleExist) {
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
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id, {
      attributes: ['id', 'name', 'created_at', 'updated_at'],
    });

    if (!role) {
      return res.status(404).json({
        status: 'error',
        message: `Data id ${id} not found.`,
      });
    }

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
        message: `Data id ${id} not found.`,
      });
    }

    role.name = name;
    await role.save();
    
    return res.status(200).json({
      status: 'success',
      message: `Updated data id ${id} successfully.`
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

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.destroy({
      where: {
        id: id,
      },
    });

    if (!role) {
      return res.status(404).json({
        status: 'error',
        message: `Data id ${id} not found.`,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: `Deleted data id ${id} successfully.`
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = {
  getAllRoles,
  createRole,
  getRoleById,
  updateRole,
  deleteRole
};