'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('flipbooks', 'backdrop_image', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'cover_image'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('flipbooks', 'backdrop_image');
  }
};
