'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const databaseName = queryInterface.sequelize.config.database;

    console.log(`Setting default charset for database: ${databaseName}`);
    // 1. Alter database default charset
    await queryInterface.sequelize.query(
      `ALTER DATABASE \`${databaseName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );

    // 2. List of tables to convert (matching exact case from migrations)
    const tables = [
      'Media',
      'pages',
      'navigations',
      'programmecategories',
      'programmecourses',
      'testimonials',
      'placementpartners',
      'faqs',
      'facilities',
      'academicsidebarlinks',
      'footers',
      'home_pages',
      'programmesettings',
      'users',
      'flipbooks',
      'Payments',
      'schools',
      'courses',
      'redirects',
      'aboutpagecontents'
    ];

    // 3. Convert all existing tables
    for (const table of tables) {
      try {
        console.log(`Converting table to utf8mb4: ${table}`);
        await queryInterface.sequelize.query(
          `ALTER TABLE \`${table}\` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
        );
      } catch (error) {
        console.warn(`Skipping conversion for table "${table}" (it might not exist): ${error.message}`);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    // Reverting to latin1 is not recommended as it may cause data loss for non-Latin characters.
    console.log('Down migration for charset conversion skipped to prevent data loss.');
  }
};
