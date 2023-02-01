'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('profiles', {
        profile_id: {
          type: Sequelize.UUID,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            key: 'id',
            model: 'users'
          },
          onUpdate: 'RESTRICT',
          onDelete: 'CASCADE',
        },
        role_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            key: 'id',
            model: 'roles'
          },
          onUpdate: 'RESTRICT',
          onDelete: 'CASCADE',
        },
        country_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            key: 'id',
            model: 'countries'
          },
          onUpdate: 'RESTRICT',
          onDelete: 'CASCADE',
        },
        image_url: {
          type: Sequelize.STRING,
        },
        code_phone: {
          type: Sequelize.INTEGER,
        },
        phone: {
          type: Sequelize.INTEGER,
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
      await queryInterface.dropTable('profiles', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}