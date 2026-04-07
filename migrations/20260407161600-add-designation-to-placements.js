'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('placementpartners', 'designation', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('placementpartners', 'classOf', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('placementpartners', 'designation');
    await queryInterface.removeColumn('placementpartners', 'classOf');
  }
};
