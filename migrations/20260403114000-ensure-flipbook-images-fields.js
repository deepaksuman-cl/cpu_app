'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('flipbooks');

    if (!tableInfo.cover_image) {
      await queryInterface.addColumn('flipbooks', 'cover_image', {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'pdf_url'
      });
    }

    if (!tableInfo.backdrop_image) {
      await queryInterface.addColumn('flipbooks', 'backdrop_image', {
        type: Sequelize.STRING,
        allowNull: true,
        after: 'cover_image'
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('flipbooks');

    if (tableInfo.backdrop_image) {
      await queryInterface.removeColumn('flipbooks', 'backdrop_image');
    }
    if (tableInfo.cover_image) {
      await queryInterface.removeColumn('flipbooks', 'cover_image');
    }
  }
};
