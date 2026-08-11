const { Company } = require('../models');

const getAllCompanies = async (req, res) => {
  try {
    const { page = 1, show = 10 } = req.query;
    const limit = parseInt(show);
    const offset = (parseInt(page) - 1) * limit;

    const [companies, totalItems] = await Promise.all([
      Company.findAll({
        limit: limit,
        offset: offset,
        attributes: ['id', 'name', 'created_at', 'updated_at'],
        order: [['created_at', 'DESC']]
      }),
      Company.count()
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return res.status(200).json({
      status: 'success',
      message: 'Get all data successfully.',
      data: companies,
      pagination: {
        show_item: companies.length,
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

const createCompany = async (req, res) => {
  try {
    const { name } = req.body;

    const companyExist = await Company.findOne({where: {name}});

    if (companyExist) {
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

    const company = await Company.create({ name });

    return res.status(201).json({
      status: 'success',
      message: 'Created data successfully.',
      data: {
        id: company.id,
        name: company.name,
      }
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id, {
      attributes: ['id', 'name', 'created_at', 'updated_at'],
    });

    if (!company) {
      return res.status(404).json({
        status: 'error',
        message: `Data id ${id} not found.`,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: `Get data id ${id} successfully.`,
      data: company
    });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({
        status: 'error',
        message: `Data id ${id} not found.`,
      });
    }

    company.name = name;
    await company.save();

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

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.destroy({
      where: {
        id: id,
      },
    });

    if (!company) {
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
  getAllCompanies,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany
};