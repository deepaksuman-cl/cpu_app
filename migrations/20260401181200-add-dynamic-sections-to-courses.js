'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Add layoutOrder column
    await queryInterface.addColumn('courses', 'layoutOrder', {
      type: Sequelize.JSON,
      allowNull: true,
      comment: 'Stores the ordered array of section IDs for the course page layout'
    });

    // 2. Add customSections column
    await queryInterface.addColumn('courses', 'customSections', {
      type: Sequelize.JSON,
      allowNull: true,
      comment: 'Stores the content of user-defined rich text sections'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('courses', 'layoutOrder');
    await queryInterface.removeColumn('courses', 'customSections');
  }
};
