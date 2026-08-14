const { Company } = require('../models');

const getAllCompanies = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, parseInt(req.query.show, 10) || 10);
    const offset = (page - 1) * limit;

    const { rows: companies, count: totalItems } = await Company.findAndCountAll({
      limit,
      offset,
      attributes: { exclude: ['deleted_at'] },
      order: [['created_at', 'DESC']],
      distinct: true
    });

    const totalPages = Math.ceil(totalItems / limit);

    return res.status(200).json({
      message: 'All data fetched successfully.',
      data: companies,
      pagination: {
        current_page: page,
        show_item: companies.length,
        total_item: totalItems,
        total_page: totalPages,
        has_next_page: page < totalPages,
        has_prev_page: page > 1
      }
    });
  } catch (error) {
    return res.status(500).json({ 
      message: 'Internal Server Error', 
      error: error.message 
    });
  }
};

const createCompany = async (req, res) => {
  try {
    const { name } = req.body;

    const companyExist = await Company.findOne({ where: { name } });

    if (companyExist) {
      return res.status(422).json({
        message: 'Unprocessable Entity.',
        errors: {
          name: 'The name has already been taken.'
        }
      });
    }

    const company = await Company.create({ name });

    return res.status(201).json({
      message: 'Created successfully.',
      data: {
        id: company.id,
        name: company.name
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
}

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id, {
      attributes: { exclude: ['deleted_at']},
    });

    if (!company) {
      return res.status(404).json({
        message: 'Not Found.',
        errors: `Company with ID ${id} does not exist.`,
      });
    }

    return res.status(200).json({
      message: `Company with ID ${id} founded.`,
      data: company
    });
  } catch (error) {
    return res.status(500).json({ 
      message: 'Internal Server Error', 
      error: error.message 
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({
        message: 'Not Found.',
        errors: `Company with ID ${id} does not exist.`,
      });
    }

    await company.update({ name });

    return res.status(200).json({
      message: 'Updated successfully.',
      data: {
        id: company.id,
        name: company.name
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

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await Company.destroy({
      where: { id }
    });

    if (!deletedCount) {
      return res.status(404).json({
        message: 'Not Found.',
        errors: {
          id: `Company with ID ${id} does not exist.`
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
          id: 'Cannot delete this company because it is still in use by another record.'
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
  getAllCompanies,
  createCompany,
  getCompanyById,
  updateCompany,
  deleteCompany
};