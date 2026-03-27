'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Media Table
    await queryInterface.createTable('Media', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      displayName: { type: Sequelize.STRING, allowNull: false },
      originalName: { type: Sequelize.STRING, allowNull: true },
      url: { type: Sequelize.TEXT, allowNull: false },
      isExternal: { type: Sequelize.BOOLEAN, defaultValue: false },
      mimeType: { type: Sequelize.STRING, allowNull: true },
      size: { type: Sequelize.INTEGER, allowNull: true },
      altText: { type: Sequelize.STRING, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // 2. Pages Table
    await queryInterface.createTable('pages', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      title: { type: Sequelize.STRING },
      slug: { type: Sequelize.STRING, allowNull: false },
      meta: { type: Sequelize.JSON },
      hero: { type: Sequelize.JSON },
      blocks: { type: Sequelize.JSON, allowNull: false },
      pageCssId: { type: Sequelize.STRING, allowNull: true },
      pageCssClass: { type: Sequelize.STRING, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.addIndex('pages', ['slug'], { unique: true, name: 'idx_page_slug' });

    // 3. Navigations Table
    await queryInterface.createTable('navigations', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      documentName: { type: Sequelize.STRING, allowNull: false, defaultValue: 'main_header' },
      data: { type: Sequelize.JSON, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.addIndex('navigations', ['documentName'], { unique: true, name: 'idx_nav_docname' });

    // 4. ProgrammeCategories Table
    await queryInterface.createTable('programmecategories', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      label: { type: Sequelize.STRING, allowNull: false },
      order: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // 5. ProgrammeCourses Table
    await queryInterface.createTable('programmecourses', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      title: { type: Sequelize.STRING, allowNull: false },
      categoryId: { type: Sequelize.INTEGER, allowNull: false },
      schoolId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'schools', key: 'id' }, onDelete: 'SET NULL' },
      school: { type: Sequelize.STRING, allowNull: true },
      icon: { type: Sequelize.STRING, allowNull: false },
      colorHex: { type: Sequelize.STRING, allowNull: false },
      iconBg: { type: Sequelize.STRING },
      textColor: { type: Sequelize.STRING },
      borderHover: { type: Sequelize.STRING },
      programs: { type: Sequelize.TEXT },
      detailsSlug: { type: Sequelize.STRING, defaultValue: '#' },
      badge: { type: Sequelize.JSON },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // 6. Testimonials Table
    await queryInterface.createTable('testimonials', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      studentName: { type: Sequelize.STRING, allowNull: false },
      reviewText: { type: Sequelize.TEXT, allowNull: false },
      rating: { type: Sequelize.INTEGER, defaultValue: 5 },
      image: { type: Sequelize.STRING, allowNull: true },
      company: { type: Sequelize.STRING, allowNull: true },
      batch: { type: Sequelize.STRING, allowNull: true },
      course: { type: Sequelize.STRING, allowNull: true },
      package: { type: Sequelize.STRING, allowNull: true },
      tag: { type: Sequelize.STRING, allowNull: true },
      tagColor: { type: Sequelize.STRING, allowNull: true },
      schoolId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'schools', key: 'id' } },
      courseId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'courses', key: 'id' } },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // 7. PlacementPartners Table
    await queryInterface.createTable('placementpartners', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      companyName: { type: Sequelize.STRING, allowNull: false },
      logoUrl: { type: Sequelize.STRING, allowNull: false },
      packageOffered: { type: Sequelize.STRING, allowNull: true },
      studentName: { type: Sequelize.STRING, allowNull: true },
      courseName: { type: Sequelize.STRING, allowNull: true },
      city: { type: Sequelize.STRING, allowNull: true },
      schoolId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'schools', key: 'id' } },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // 8. FAQs Table
    await queryInterface.createTable('faqs', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      question: { type: Sequelize.STRING, allowNull: false },
      answer: { type: Sequelize.TEXT, allowNull: false },
      schoolId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'schools', key: 'id' } },
      courseId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'courses', key: 'id' } },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // 9. Facilities Table
    await queryInterface.createTable('facilities', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: true },
      image: { type: Sequelize.STRING, allowNull: true },
      schoolId: { type: Sequelize.INTEGER, allowNull: true, references: { model: 'schools', key: 'id' } },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // 10. AcademicSidebarLinks Table
    await queryInterface.createTable('academicsidebarlinks', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      label: { type: Sequelize.STRING, allowNull: false },
      icon: { type: Sequelize.STRING, allowNull: false },
      slug: { type: Sequelize.STRING, allowNull: false },
      colorClass: { type: Sequelize.STRING, allowNull: false },
      order: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // 11. Footers Table
    await queryInterface.createTable('footers', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      label: { type: Sequelize.STRING, allowNull: false },
      url: { type: Sequelize.STRING, allowNull: false },
      order: { type: Sequelize.INTEGER, defaultValue: 0 },
      category: { type: Sequelize.STRING, allowNull: false, defaultValue: 'general' },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // 12. HomePage Table
    await queryInterface.createTable('home_pages', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      blocks: { type: Sequelize.JSON, allowNull: false },
      metaTitle: { type: Sequelize.STRING },
      metaDescription: { type: Sequelize.TEXT },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });

    // 13. ProgrammeSettings Table
    await queryInterface.createTable('programmesettings', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      metaTitle: { type: Sequelize.STRING },
      metaDescription: { type: Sequelize.TEXT },
      sidebarLinks: { type: Sequelize.JSON },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('programmesettings');
    await queryInterface.dropTable('home_pages');
    await queryInterface.dropTable('footers');
    await queryInterface.dropTable('academicsidebarlinks');
    await queryInterface.dropTable('facilities');
    await queryInterface.dropTable('faqs');
    await queryInterface.dropTable('placementpartners');
    await queryInterface.dropTable('testimonials');
    await queryInterface.dropTable('programmecourses');
    await queryInterface.dropTable('programmecategories');
    await queryInterface.dropTable('navigations');
    await queryInterface.dropTable('pages');
    await queryInterface.dropTable('Media');
  }
};
