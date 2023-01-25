'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: false,
          primaryKey: true,
          type: Sequelize.UUID,
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        last_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        email_verified: {
          type: Sequelize.DATE
        },
        token: {
          type: Sequelize.STRING
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'created_at'
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'updated_at'
        }
      }, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.dropTable('users', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      console.log(error.message)
      throw error
    }
  }
}