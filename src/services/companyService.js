const CompanyRepository = require('../repositories/companyRepository');
const { NotFoundError } = require('../utils/appError');

class CompanyService {
  async getPaginatedCompanies(page, limit, search) {
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);

    const { data, total } = await CompanyRepository.findPaginated(pageNum, limitNum, search);
    const totalPages = Math.ceil(total / limitNum);

    return {
      data,
      pagination: {
        current_page: pageNum,
        show_item: data.length,
        total_item: total,
        total_page: totalPages,
        has_next_page: pageNum < totalPages,
        has_prev_page: pageNum > 1,
      },
    };
  }

  async getAllCompanies() {
    return await CompanyRepository.findAll();
  }

  async getCompanyById(id) {
    const company = await CompanyRepository.findById(id);
    if (!company) throw new NotFoundError(`Resource company ID ${id} not found`);
    return company;
  }

  async createCompany(data) {
    return await CompanyRepository.create(data);
  }

  async updateCompany(id, data) {
    await this.getCompanyById(id);
    return await CompanyRepository.update(id, data);
  }

  async deleteCompany(id) {
    await this.getCompanyById(id);
    return await CompanyRepository.delete(id);
  }
}

module.exports = new CompanyService();