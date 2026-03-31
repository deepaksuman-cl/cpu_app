'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Tumhare Sequelize model columns ke hisaab se exact mapping
    await queryInterface.bulkInsert('schools', [
      {
        name: "School of Arts & Humanities",
        slug: "arts-and-humanities",
        status: "published",
        version: 1,
        metaTitle: "School of Arts & Humanities | Career Point University",
        metaDescription: "Fostering creativity, critical thinking, and a deeper understanding of human culture, history, and society.",
        
        breadcrumb: JSON.stringify([
          { "label": "Home", "link": "/" },
          { "label": "Schools & Departments", "link": "/schools" },
          { "label": "School of Arts & Humanities", "link": "/schools/arts-and-humanities" }
        ]),
        
        hero: JSON.stringify({
          "bgImage": "https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg",
          "badge": "Premier Institute for Humanities & Social Sciences",
          "title": {
            "main": "School of Arts & Humanities",
            "highlight": "Arts",
            "skyHighlight": "& Humanities"
          },
          "description": "Fostering creativity, critical thinking, and a deeper understanding of human culture, history, and society.",
          "cta": [
            { "label": "Apply Now", "link": "#", "primary": true },
            { "label": "Explore Programs", "link": "#programs", "primary": false }
          ]
        }),

        stats: JSON.stringify([
          { "value": "15L", "label": "Highest Package", "icon": "TrendingUp" },
          { "value": "50+", "label": "Publications", "icon": "BookOpen" },
          { "value": "20+", "label": "Media & NGO Partners", "icon": "Briefcase" }
        ]),

        about: JSON.stringify({
          "vision": {
            "title": "Vision",
            "label": "Our Purpose",
            "icon": "Target",
            "text": "To be a center of excellence in humanities education, nurturing creative minds that contribute meaningfully to society and culture at national and global levels.",
            "highlights": [
              { "value": "800+", "label": "Students" },
              { "value": "90%", "label": "Placements/Higher Ed" },
              { "value": "15+", "label": "Global Tie-ups" }
            ]
          },
          "mission": {
            "title": "Mission",
            "label": "Our Goal",
            "icon": "Lightbulb",
            "points": [
              "Promote interdisciplinary research in arts, literature, and social sciences.",
              "Encourage creative expression and critical analysis.",
              "Preserve and promote cultural heritage.",
              "Prepare students for diverse careers in media, education, and public service."
            ]
          }
        }),

        programmes: JSON.stringify({
          "bgImage": "https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg",
          "title": { "main": "Our Programme", "highlight": "Programme" },
          "subtitle": "Academic Programmes",
          "description": "Explore our diverse range of undergraduate, postgraduate, and doctoral programs in Arts & Humanities.",
          "levels": [
            {
              "label": "After 12th Pass",
              "icon": "GraduationCap",
              "courses": [
                {
                  "name": "Bachelor of Arts (BA)",
                  "slug": "ba", // 🔥 DUMMY SLUG (Iska andar ka detail content nahi banaya, jaisa tumne manga tha)
                  "specializations": [
                    { "name": "English", "slug": "english" },
                    { "name": "History", "slug": "history" },
                    { "name": "Political Science", "slug": "political-science" }
                  ]
                }
              ]
            },
            {
              "label": "After Graduation / Equivalent",
              "icon": "BookOpen",
              "courses": [
                {
                  "name": "Master of Arts (MA)",
                  "slug": "ma", // 🔥 DUMMY SLUG
                  "specializations": [
                    { "name": "English Literature", "slug": "english-lit" },
                    { "name": "Sociology", "slug": "sociology" }
                  ]
                }
              ]
            },
            {
              "label": "After Post Graduation / Equivalent",
              "icon": "Microscope",
              "courses": [
                {
                  "name": "Ph.D. (Arts & Humanities)",
                  "slug": "phd-arts", // 🔥 DUMMY SLUG
                  "description": "Research-focused doctoral programme"
                }
              ]
            }
          ]
        }),

        placements: JSON.stringify({
          "title": { "main": "Students Placed in Top Organizations", "highlight": "Top Organizations" },
          "label": "Placement Records",
          "subtitle": "Highest & best placement record in media, education, and NGOs",
          "list": [
            { "name": "Priya Singh", "company": "Times of India", "pkg": "8 LPA", "img": "https://cpur.in/wp-content/uploads/2023/08/student.png" },
            { "name": "Rahul Verma", "company": "Teach For India", "pkg": "6 LPA", "img": "https://cpur.in/wp-content/uploads/2023/08/student.png" }
          ]
        }),

        alumni: JSON.stringify({
          "title": { "main": "Making an Impact Globally", "highlight": "Impact" },
          "label": "Our Alumni",
          "list": [
            { "name": "Neha Gupta", "role": "Senior Editor", "company": "Leading Publishing House", "img": "https://cpur.in/wp-content/uploads/2023/08/student.png" }
          ]
        }),

        industry: JSON.stringify({
          "title": { "main": "Industry Tie Up's", "highlight": "Tie Up's" },
          "label": "Collaborations",
          "partners": [
            { "name": "Sahitya Akademi", "url": "https://cpur.in/wp-content/uploads/2023/08/tcs-logo-as-Smart-Object-1.jpg" }
          ]
        }),

        research: JSON.stringify({
          "title": { "main": "Research Excellence", "highlight": "Excellence" },
          "label": "Eminence Research",
          "gallery": [ "https://cpur.in/wp-content/uploads/2023/07/gallery-7.jpg" ],
          "stats": [
            { "value": "150+", "label": "Papers Published", "icon": "BookOpen" },
            { "value": "40+", "label": "Books Authored", "icon": "GraduationCap" }
          ]
        }),

        community: JSON.stringify({
          "title": { "main": "Our Diverse Community", "highlight": "Diverse" },
          "label": "Community",
          "description": [
            "The Arts & Humanities community thrives on diversity, encompassing a dynamic range of thinkers, writers, and social scientists.",
            "We focus on producing individuals with strong social ethics and an understanding of human culture."
          ],
          "gallery": [
            { "src": "https://cpur.in/wp-content/uploads/2023/07/gallery-7-1.jpg", "caption": "Literature Seminar" }
          ]
        }),

        infrastructure: JSON.stringify({
          "title": { "main": "World-Class Infrastructure", "highlight": "Infrastructure" },
          "label": "Campus",
          "list": [
            { "title": "Modern Library", "desc": "Extensive collection of books, journals, and digital archives.", "img": "https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg" }
          ]
        }),

        testimonials: JSON.stringify({
          "title": { "main": "Our Students Speak", "highlight": "Speak" },
          "label": "Testimonials",
          "list": [
            { "name": "Simran Kaur", "batch": "BA 2021", "company": "Media Professional", "emoji": "✍️", "rating": 5, "photo": "https://cpur.in/wp-content/uploads/2023/08/student.png", "text": "The faculty's dedication to literature and social sciences shaped my worldview and career." }
          ]
        }),

        exploreDepartment: JSON.stringify({
          "sectionTitle": { "main": "Explore School of Arts & Humanities", "highlight": "School" },
          "subtitle": "Discover our specialized wings and libraries",
          "items": [
            { "title": "Department at a Glance", "icon": "Building2", "items": ["Guest Lectures", "Literary Clubs", "Seminars"], "cta": "VIEW MORE" }
          ]
        }),

        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('schools', { slug: 'arts-and-humanities' }, {});
  }
};