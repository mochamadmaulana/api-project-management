/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id');
      table.string('name', 255).unique().notNullable();
      table.string('email', 255).unique().nullable();
      table.string('password', 255).notNullable();
      table.string('avatar', 255).nullable();

      table.integer('role_id').unsigned().nullable();
      table.foreign('role_id').references('id').inTable('roles').onDelete('SET NULL');

      table.integer('company_id').unsigned().nullable();
      table.foreign('company_id').references('id').inTable('companies').onDelete('SET NULL');

      table.timestamps(true, true);
      table.timestamp('deleted_at').nullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
