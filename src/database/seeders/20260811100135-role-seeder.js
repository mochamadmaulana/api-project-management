'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        company_id: 1,
        name: 'superadmin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        company_id: 1,
        name: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        company_id: 1,
        name: 'user',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
