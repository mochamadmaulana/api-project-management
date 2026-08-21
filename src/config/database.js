const knex = require('knex');

const db = knex({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'express_db',
  },
  pool: { min: 2, max: 10 },
});

module.exports = db;