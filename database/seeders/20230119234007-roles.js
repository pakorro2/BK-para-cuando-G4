'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {})
    */
    return await queryInterface.bulkInsert('roles', [
      {
        name: 'public',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {})
     */
    return await queryInterface.bulkDelete('roles', null, {})
  }
}