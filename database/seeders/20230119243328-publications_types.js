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
     * }], {});
     *  evento, concierto y torneo
    */
    return await queryInterface.bulkInsert('publications_types', [
      {
        name: 'evento',
        description: 'organizarás eventos!',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'concierto',
        description: 'organizarás conciertos!',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'torneo',
        description: 'organizarás torneos!',
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
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('publications_types', null, {})
  }
}
