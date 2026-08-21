const db = require('../config/database');

class CompanyRepository {
  async findPaginated(page = 1, limit = 10, search = null) {
    const offset = (page - 1) * limit;

    const baseQuery = db('companies');

    if (search) {
      baseQuery.andWhere((builder) => {
        builder
          .where('name', 'like', `%${search}%`)
          .orWhere('email', 'like', `%${search}%`);
      });
    }

    const [{ total }] = await baseQuery.clone().count('* as total');

    const data = await baseQuery
      .clone()
      .select('id', 'name', 'email', 'telephone', 'address', 'created_at', 'updated_at')
      .orderBy('created_at', 'desc')
      .limit(limit)
      .offset(offset);

    return {
      data,
      total: Number(total),
    };
  }

  async findAll() {
    return await db('companies')
      .select('id', 'name', 'email', 'telephone', 'address', 'created_at', 'updated_at')
      .orderBy('created_at', 'desc');
  }

  async findById(id) {
    return await db('companies')
      .where({ id })
      .select('id', 'name', 'email', 'telephone', 'address', 'created_at', 'updated_at').first();
  }

  async create(data) {
    const [id] = await db('companies').insert(data);
    return this.findById(id);
  }

  async update(id, data) {
    await db('companies')
      .where({ id })
      .update(data);
    return this.findById(id);
  }

  async delete(id) {
    return await db('companies')
      .where({ id })
      .del();
  }
}

module.exports = new CompanyRepository();