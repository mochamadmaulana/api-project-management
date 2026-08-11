'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('companies', [
      {
        name: 'PT Lanara Creative Solusi',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'PT Djarum Sampoerna',
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('companies', null, {});
  }
};
