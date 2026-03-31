'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('flipbooks', 'cover_image', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'pdf_url'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('flipbooks', 'cover_image');
  }
};
