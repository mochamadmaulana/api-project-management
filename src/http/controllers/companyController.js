const CompanyService = require('../../services/companyService');
const { handleSuccess } = require('../../utils/handleSuccess');

class CompanyController {
  async index(req, res, next) {
    try {
      const { page, show, search} = req.query;
      const { data, pagination } = await CompanyService.getPaginatedCompanies(page, show, search);

      return handleSuccess(res, {
        message: 'Fetch all companies successfully',
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
      const user = await CompanyService.getCompanyById(id);

      return handleSuccess(res, {
        message: `Get company ID ${id} successfully`,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      const newUser = await CompanyService.createCompany(req.body);

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
      const updatedUser = await CompanyService.updateCompany(req.params.id, req.body);

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
      await CompanyService.deleteCompany(req.params.id);

      return handleSuccess(res, {
        message: 'Deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async forceDestroy(req, res, next) {
    try {
      await CompanyService.forceDeleteCompany(req.params.id);

      return handleSuccess(res, {
        message: 'Deleted permanent successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CompanyController();