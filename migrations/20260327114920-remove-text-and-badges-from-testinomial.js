'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 🔥 SAFE METHOD: Using raw SQL wrapped in try/catch for older database versions
    
    try {
      await queryInterface.sequelize.query('ALTER TABLE testimonials DROP COLUMN tag;');
      console.log("✅ Column 'tag' dropped successfully.");
    } catch (error) {
      console.log("⚠️ Column 'tag' does not exist or already dropped. Moving on...");
    }

    try {
      await queryInterface.sequelize.query('ALTER TABLE testimonials DROP COLUMN tagColor;');
      console.log("✅ Column 'tagColor' dropped successfully.");
    } catch (error) {
      console.log("⚠️ Column 'tagColor' does not exist or already dropped. Moving on...");
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('testimonials', 'tag', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    } catch (error) {}

    try {
      await queryInterface.addColumn('testimonials', 'tagColor', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    } catch (error) {}
  }
};