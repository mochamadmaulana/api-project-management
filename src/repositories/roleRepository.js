const db = require('../config/database');

class RoleRepository {
  async findPaginated(page = 1, limit = 10, search = null) {
    const offset = (page - 1) * limit;

    const baseQuery = db('roles');

    if (search) {
      baseQuery.where('name', 'like', `%${search}%`);
    }

    const [{ total }] = await baseQuery.clone().count('* as total');

    const data = await baseQuery
      .clone()
      .select('id', 'name', 'created_at', 'updated_at')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);

    return {
      data,
      total: Number(total),
    };
  }

  async findAll() {
    return await db('roles')
      .select('id', 'name', 'created_at', 'updated_at')
      .orderBy('created_at', 'desc');
  }

  async findById(id) {
    return await db('roles')
      .where({ id })
      .select('id', 'name', 'created_at', 'updated_at').first();
  }

  async create(data) {
    const [id] = await db('roles').insert(data);
    return this.findById(id);
  }

  async update(id, data) {
    await db('roles')
      .where({ id })
      .update(data);
    return this.findById(id);
  }

  async delete(id) {
    return await db('roles')
      .where({ id })
      .del();
  }
}

module.exports = new RoleRepository();