'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('flipbooks', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      pdf_url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      meta_title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      meta_description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Add unique index on slug for performance and safety
    await queryInterface.addIndex('flipbooks', ['slug'], {
      unique: true,
      name: 'idx_flipbook_slug'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('flipbooks');
  }
};
