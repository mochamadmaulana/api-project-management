const RoleRepository = require('../repositories/roleRepository');
const { NotFoundError } = require('../utils/appError');

class RoleService {
  async getPaginatedRoles(page, limit, search) {
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);

    const { data, total } = await RoleRepository.findPaginated(pageNum, limitNum, search);
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

  async getAllRoles() {
    return await RoleRepository.findAll();
  }

  async getRoleById(id) {
    const role = await RoleRepository.findById(id);
    if (!role) throw new NotFoundError(`Resource role ID ${id} not found`);
    return role;
  }

  async createRole(data) {
    return await RoleRepository.create(data);
  }

  async updateRole(id, data) {
    await this.getRoleById(id);
    return await RoleRepository.update(id, data);
  }

  async deleteRole(id) {
    await this.getRoleById(id);
    return await RoleRepository.delete(id);
  }

  async forceDeleteRole(id) {
    await this.getRoleById(id);
    return await RoleRepository.forceDelete(id);
  }
}

module.exports = new RoleService();