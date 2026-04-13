'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add courseType column
    await queryInterface.addColumn('courses', 'courseType', {
      type: Sequelize.ENUM('regular', 'specialization'),
      defaultValue: 'regular',
      allowNull: false
    });

    // Add all AI-prefixed JSON columns
    const jsonColumns = [
      'ai_hero', 'ai_highlights', 'ai_features', 'ai_curriculum', 
      'ai_admissions', 'ai_placements', 'ai_comparison', 
      'ai_team', 'ai_cta', 'ai_faq'
    ];

    for (const column of jsonColumns) {
      await queryInterface.addColumn('courses', column, {
        type: Sequelize.JSON,
        allowNull: true
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('courses', 'courseType');
    
    // Remove all AI-prefixed JSON columns
    const jsonColumns = [
      'ai_hero', 'ai_highlights', 'ai_features', 'ai_curriculum', 
      'ai_admissions', 'ai_placements', 'ai_comparison', 
      'ai_team', 'ai_cta', 'ai_faq'
    ];

    for (const column of jsonColumns) {
      await queryInterface.removeColumn('courses', column);
    }
    
    // Drop the ENUM type if needed (depends on the DB engine, typically for Postgres)
    // For MySQL it's not strictly necessary. 
  }
};
