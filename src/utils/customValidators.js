const db = require('../config/database');

const isUnique = (tableName, columnName, ignoreParams = null) => {
  return async (value, { req }) => {
    let query = db(tableName).where(columnName, value);

    if (ignoreParams && req.params[ignoreParams]) {
      query = query.whereNot('id', req.params[ignoreParams]);
    }

    const existingRecord = await query.first();
    if (existingRecord) {
      throw new Error(`The ${columnName} has already been taken.`);
    }
  };
};

module.exports = { isUnique };