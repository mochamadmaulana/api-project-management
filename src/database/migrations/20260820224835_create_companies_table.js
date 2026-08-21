/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('companies', function (table) {
      table.increments('id');
      table.string('name', 255).unique().notNullable();
      table.string('email', 255).unique().nullable();
      table.string('telephone', 20).nullable();
      table.text('address').nullable();
      table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('companies');
};
