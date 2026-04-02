'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Add layoutOrder column
    await queryInterface.addColumn('schools', 'layoutOrder', {
      type: Sequelize.JSON,
      allowNull: true,
      comment: 'Stores the ordered array of section IDs for the school page layout'
    });

    // 2. Add customSections column
    await queryInterface.addColumn('schools', 'customSections', {
      type: Sequelize.JSON,
      allowNull: true,
      comment: 'Stores the content of user-defined rich text sections'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('schools', 'layoutOrder');
    await queryInterface.removeColumn('schools', 'customSections');
  }
};
