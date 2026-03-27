'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    // ------------------ SCHOOLS TABLE ------------------
    await queryInterface.createTable('schools', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      metaTitle: Sequelize.STRING,
      metaDescription: Sequelize.TEXT,
      breadcrumb: Sequelize.JSON,
      hero: Sequelize.JSON,
      stats: Sequelize.JSON,
      about: Sequelize.JSON,
      programmes: Sequelize.JSON,
      placements: Sequelize.JSON,
      alumni: Sequelize.JSON,
      industry: Sequelize.JSON,
      research: Sequelize.JSON,
      community: Sequelize.JSON,
      infrastructure: Sequelize.JSON,
      testimonials: Sequelize.JSON,
      exploreDepartment: Sequelize.JSON,

      status: {
        type: Sequelize.ENUM('draft', 'published'),
        defaultValue: 'draft',
        allowNull: false,
      },

      version: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('schools', ['slug'], {
      unique: true,
      name: 'idx_school_slug'
    });

    await queryInterface.addIndex('schools', ['name'], {
      name: 'idx_school_name'
    });

    // ------------------ COURSES TABLE ------------------
    await queryInterface.createTable('courses', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      schoolId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'schools',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      metaTitle: Sequelize.STRING,
      metaDescription: Sequelize.TEXT,
      title: Sequelize.STRING,
      duration: Sequelize.STRING,
      eligibility: Sequelize.STRING,
      description: Sequelize.TEXT,

      hero: Sequelize.JSON,
      accomplishments: Sequelize.JSON,
      overview: Sequelize.JSON,
      scope: Sequelize.JSON,
      curriculum: Sequelize.JSON,
      roadmap: Sequelize.JSON,
      admissionFee: Sequelize.JSON,
      scholarships: Sequelize.JSON,
      whyJoin: Sequelize.JSON,
      uniqueFeatures: Sequelize.JSON,
      applySteps: Sequelize.JSON,
      faq: Sequelize.JSON,
      exploreDepartment: Sequelize.JSON,
      placements: Sequelize.JSON,
      industry: Sequelize.JSON,
      testimonials: Sequelize.JSON,

      status: {
        type: Sequelize.ENUM('draft', 'published'),
        defaultValue: 'draft',
        allowNull: false,
      },

      version: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('courses', ['slug'], {
      unique: true,
      name: 'idx_course_slug'
    });

    await queryInterface.addIndex('courses', ['schoolId'], {
      name: 'idx_course_school'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('courses');
    await queryInterface.dropTable('schools');
  }
};