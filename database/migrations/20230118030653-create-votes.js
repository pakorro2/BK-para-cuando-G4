'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('votes', {
        publication_id: {
          type: Sequelize.UUID,
          allowNull:false,
          foreignKey: true,
          primaryKey: true,
          references: {
            model: 'publications',
            key: 'id'
          },
          onUpdate: 'RESTRICT',
          onDelete: 'CASCADE',
        },
        profile_id: {
          type: Sequelize.UUID,
          allowNull:false,
          foreignKey: true,
          primaryKey: true,
          references: {
            model: 'profiles',
            key: 'id'
          },
          onUpdate: 'RESTRICT',
          onDelete: 'CASCADE',
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
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
      await queryInterface.dropTable('votes', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}