'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [{
      name: 'public',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    }])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {})
  }
}
