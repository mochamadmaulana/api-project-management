const db = require('../config/database');

class UserRepository {
  async findAll() {
    return await db('users')
      .whereNull('deleted_at')
      .select('id', 'name', 'email', 'avatar', 'role_id', 'company_id', 'created_at', 'updated_at');
  }

  async findById(id) {
    return await db('users')
      .where({ id })
      .whereNull('deleted_at')
      .select('id', 'name', 'email', 'avatar', 'role_id', 'company_id', 'created_at', 'updated_at').first();
  }

  async create(data) {
    const [id] = await db('users').insert(data);
    return this.findById(id);
  }

  async update(id, data) {
    await db('users')
      .where({ id })
      .whereNull('deleted_at')
      .update(data);
    return this.findById(id);
  }

  async delete(id) {
    return await db('users')
      .where({ id })
      .whereNotNull('deleted_at')
      .update({
        deleted_at: null,
      });
  }

  async forceDelete(id) {
    return await db('users')
      .where({ id })
      .del();
  }
}

module.exports = new UserRepository();