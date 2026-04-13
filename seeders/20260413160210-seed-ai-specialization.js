'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Load Data Safely
    const dataPath = path.join(__dirname, '../src/data/course-specialization.json');
    let aiData = {};
    if (fs.existsSync(dataPath)) {
      aiData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    } else {
      console.warn("⚠️ course-specialization.json not found! Empty data will be used.");
    }

    // 2. Safely Get School ID (Catching the MariaDB meta bug)
    let schoolId = 1;
    try {
      const [schools] = await queryInterface.sequelize.query('SELECT id FROM schools LIMIT 1;');
      if (schools && schools.length > 0) schoolId = schools[0].id;
    } catch (error) {
      if (error.message && error.message.includes("Cannot delete property 'meta'")) {
        console.log("⚠️ Ignored MariaDB meta bug on SELECT query.");
      } else {
        throw error;
      }
    }

    // 3. Prepare Layout Order
    const aiLayoutOrder = [
      'ai_hero', 'ai_highlights', 'ai_features', 'ai_curriculum', 
      'ai_admissions', 'ai_placements', 'ai_comparison', 
      'ai_team', 'ai_cta', 'ai_faq'
    ];

    // Helper to safely stringify data and handle naming mismatches
    const safeJson = (data) => data ? JSON.stringify(data) : null;

    const courseData = {
      name: 'B.Tech in Computer Science & Engineering (AI & Machine Learning)',
      slug: 'btech-cs-ai-ml',
      title: 'B.Tech CSE (AI & ML)',
      schoolId: schoolId,
      courseType: 'specialization',
      duration: '4 Years',
      eligibility: '10+2 with PCM (50% aggregate)',
      description: 'An industry-led specialization program designed for the AI-first world.',
      metaTitle: 'B.Tech CSE in Artificial Intelligence & Machine Learning | CP University',
      metaDescription: 'Join India’s only AI-First B.Tech program. Learn by building with Google & Amazon experts.',
      
      // JSON Serialization (Checking common key names from extraction)
      ai_hero: safeJson(aiData.hero),
      ai_highlights: safeJson(aiData.highlights || aiData.highlightData),
      ai_features: safeJson(aiData.features || aiData.featuresData),
      ai_curriculum: safeJson(aiData.curriculum || aiData.CURRICULUM_DATA),
      ai_admissions: safeJson(aiData.admissions || aiData.timelineSteps),
      ai_placements: safeJson(aiData.placements || aiData.placementPillars),
      ai_comparison: safeJson(aiData.comparison || aiData.comparisonData),
      ai_team: safeJson(aiData.team || aiData.teamMembers),
      ai_cta: safeJson(aiData.cta),
      ai_faq: safeJson(aiData.faq || aiData.faqData),
      
      layoutOrder: JSON.stringify(aiLayoutOrder),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // 4. Safely Insert Course (Catching the MariaDB meta bug)
    try {
      await queryInterface.bulkInsert('courses', [courseData]);
      console.log("✅ Seed inserted successfully!");
    } catch (error) {
      if (error.message && error.message.includes("Cannot delete property 'meta'")) {
         console.log("✨ Inserted successfully! (Ignored known Sequelize+MariaDB strict mode bug)");
      } else {
         throw error; // Throw real errors (e.g. duplicate slug)
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('courses', { slug: 'btech-cs-ai-ml' }, {});
    } catch (error) {
      if (error.message && !error.message.includes("Cannot delete property 'meta'")) {
        throw error;
      }
    }
  }
};