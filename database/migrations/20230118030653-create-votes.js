'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Votes', {
      profile_id: {
        type: Sequelize.UUID,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Profiles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'

      },
      publication_id: {
        type: Sequelize.UUID,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Publications',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Votes');
  }
};