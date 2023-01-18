'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Publications', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      profile_id: {
        type: Sequelize.UUID,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Profile',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      publications_types_id: {
        type: Sequelize.UUID,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Publications_types',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city_id: {
        type: Sequelize.UUID,
        allowNull: false,
        foreignKey: true,
        references: {
          model: 'Cities',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      imagen_url: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('Publications');
  }
};