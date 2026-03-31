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
        metaDescription: "Fostering creativity, critical thinking, and a deeper understanding of human culture, history, and society. Join our premier institute.",
        
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
          "description": "Career Point University offers cutting-edge programs in humanities, shaping future leaders, researchers, writers, and civil servants in Kota.",
          "cta": [
            { "label": "Apply Now", "link": "#", "primary": true },
            { "label": "Explore Programs", "link": "#programs", "primary": false }
          ]
        }),

        stats: JSON.stringify([
          { "value": "15L", "label": "Highest Package", "icon": "TrendingUp" },
          { "value": "4.5L", "label": "Avg Salary Package", "icon": "BarChart3" },
          { "value": "20+", "label": "Global NGO Partners", "icon": "Briefcase" },
          { "value": "500+", "label": "Students Enrolled", "icon": "Users" }
        ]),

        about: JSON.stringify({
          "vision": {
            "title": "Vision",
            "label": "Our Purpose",
            "icon": "Target",
            "text": "To develop and deliver industry-relevant education, nurturing students to be socially responsible, research-driven innovators who can effectively meet the challenges of the modern world at both national and global levels.",
            "highlights": [
              { "value": "800+", "label": "Students" },
              { "value": "95%", "label": "Placement/Higher Ed" },
              { "value": "15+", "label": "Global Partners" }
            ]
          },
          "mission": {
            "title": "Mission",
            "label": "Our Goal",
            "icon": "Lightbulb",
            "points": [
              "Improve academic practices that bridge theory, literature, and research.",
              "Create a research-led teaching environment combining classroom learning with field studies.",
              "Impart collaborative resources to build a diverse intellectual space.",
              "Nurture researchers and critical thinkers through contemporary socio-political studies.",
              "Seek student solutions and critical thinking in a powerful, inclusive environment."
            ]
          }
        }),

        programmes: JSON.stringify({
          "bgImage": "https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg",
          "title": { "main": "Our Programme", "highlight": "Programme" },
          "subtitle": "Academic Programmes",
          "description": "Over the years, the School of Arts & Humanities has earned several accolades for playing a dynamic role in elevating research and the learning process of the institution.",
          "levels": [
            {
              "label": "After 12th Pass / Equivalent",
              "icon": "GraduationCap",
              "courses": [
                {
                  "name": "Bachelor of Arts (BA)",
                  "slug": "ba", // 🔥 DUMMY SLUG FOR COURSE DETAILS
                  "specializations": [
                    { "name": "English", "slug": "english" },
                    { "name": "History", "slug": "history" },
                    { "name": "Political Science", "slug": "political-science" },
                    { "name": "Sociology", "slug": "sociology" }
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
                  "slug": "ma", // 🔥 DUMMY SLUG FOR COURSE DETAILS
                  "specializations": [
                    { "name": "English Literature", "slug": "english-lit" },
                    { "name": "History", "slug": "history-pg" },
                    { "name": "Political Science", "slug": "political-science-pg" }
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
                  "slug": "phd-arts", // 🔥 DUMMY SLUG FOR COURSE DETAILS
                  "description": "Research-focused doctoral programme in various humanities disciplines."
                }
              ]
            }
          ]
        }),

        placements: JSON.stringify({
          "title": { "main": "Students Placed in Top Organizations", "highlight": "Top Organizations" },
          "label": "Placement Records",
          "subtitle": "Highest & best placement record in media, education, and social sectors",
          "list": [
            { "name": "Priya Singh", "company": "Times of India", "pkg": "8 LPA", "img": "https://cpur.in/wp-content/uploads/2023/08/Archana-Kumari.png" },
            { "name": "Rahul Verma", "company": "Teach For India", "pkg": "6 LPA", "img": "https://cpur.in/wp-content/uploads/2023/08/Tarun-Jain.png" },
            { "name": "Anjali Sharma", "company": "Penguin Random House", "pkg": "9 LPA", "img": "https://cpur.in/wp-content/uploads/2023/08/Archana-Kumari-Tech-Mahindra.png" },
            { "name": "Vikram Rathore", "company": "NDTV", "pkg": "7.5 LPA", "img": "https://cpur.in/wp-content/uploads/2023/08/Siraj-Ali.png" },
            { "name": "Sneha Kapoor", "company": "UNESCO (Intern)", "pkg": "Stipend", "img": "https://cpur.in/wp-content/uploads/2023/07/1-d.jpg" },
            { "name": "Aman Desai", "company": "Oxfam India", "pkg": "6.5 LPA", "img": "https://cpur.in/wp-content/uploads/2023/08/Prateek-Dhaman.png" }
          ]
        }),

        alumni: JSON.stringify({
          "title": { "main": "Making an Impact Globally", "highlight": "Impact" },
          "label": "Our Alumni",
          "list": [
            { "name": "Neha Gupta", "role": "Senior Editor", "company": "HarperCollins India", "img": "https://cpur.in/wp-content/uploads/2023/08/Saloni.jpg" },
            { "name": "Aditya Rao", "role": "Policy Analyst", "company": "NITI Aayog", "img": "https://cpur.in/wp-content/uploads/2023/08/aryan.jpg" },
            { "name": "Meera Menon", "role": "Assistant Professor", "company": "Delhi University", "img": "https://cpur.in/wp-content/uploads/2023/08/Archana-Kumari.png" },
            { "name": "Kunal Tiwari", "role": "Journalist", "company": "The Hindu", "img": "https://cpur.in/wp-content/uploads/2023/08/harsh.jpg" }
          ]
        }),

        industry: JSON.stringify({
          "title": { "main": "Industry & NGO Tie Up's", "highlight": "Tie Up's" },
          "label": "Collaborations",
          "partners": [
            { "name": "Sahitya Akademi", "url": "https://cpur.in/wp-content/uploads/2023/08/tcs-logo-as-Smart-Object-1.jpg" },
            { "name": "Pratham Education Foundation", "url": "https://cpur.in/wp-content/uploads/2023/08/infosys-as-Smart-Object-1.jpg" },
            { "name": "National Archives of India", "url": "https://cpur.in/wp-content/uploads/2023/08/wipro-as-Smart-Object-1.jpg" },
            { "name": "Amnesty International", "url": "https://cpur.in/wp-content/uploads/2023/08/google-as-Smart-Object-1.jpg" },
            { "name": "Oxford University Press", "url": "https://cpur.in/wp-content/uploads/2023/08/tech-mahindra-as-Smart-Object-1.jpg" }
          ]
        }),

        research: JSON.stringify({
          "title": { "main": "Research Excellence", "highlight": "Excellence" },
          "label": "Eminence Research",
          "gallery": [
            "https://cpur.in/wp-content/uploads/2023/07/gallery-7.jpg",
            "https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg",
            "https://cpur.in/wp-content/uploads/2023/07/gallery-12.jpg",
            "https://cpur.in/wp-content/uploads/2023/07/gallery-4.jpg"
          ],
          "stats": [
            { "value": "150+", "label": "Research Papers Published", "icon": "BookOpen" },
            { "value": "40+", "label": "Conference Presentations", "icon": "Presentation" },
            { "value": "15+", "label": "Books Authored", "icon": "GraduationCap" },
            { "value": "5+", "label": "Funded Projects", "icon": "FlaskConical" }
          ]
        }),

        community: JSON.stringify({
          "title": { "main": "Our Diverse Community", "highlight": "Diverse" },
          "label": "Community",
          "description": [
            "The Arts & Humanities community thrives on diversity, encompassing a dynamic range of thinkers, writers, historians, and social scientists.",
            "We focus on producing individuals with strong social ethics, a deep understanding of human culture, and the critical thinking skills required to address complex global challenges. Our community regularly engages in literary fests, mock parliaments, and socio-cultural outreach programs."
          ],
          "gallery": [
            { "src": "https://cpur.in/wp-content/uploads/2023/07/gallery-7-1.jpg", "caption": "Literature & Poetry Seminar" },
            { "src": "https://cpur.in/wp-content/uploads/2023/07/gallery-12-1.jpg", "caption": "Historical Heritage Walk" },
            { "src": "https://cpur.in/wp-content/uploads/2023/07/gallery-4.jpg", "caption": "Mock United Nations Session" }
          ]
        }),

        infrastructure: JSON.stringify({
          "title": { "main": "World-Class Infrastructure", "highlight": "Infrastructure" },
          "label": "Campus",
          "list": [
            { "title": "Modern Central Library", "desc": "Extensive collection of books, journals, manuscripts, and digital archives spanning centuries.", "img": "https://img.freepik.com/free-photo/library-dummy.jpg" },
            { "title": "Advanced Language Labs", "desc": "Equipped with linguistic software and interactive tools for mastering foreign and regional languages.", "img": "https://img.freepik.com/free-photo/lab-dummy.jpg" },
            { "title": "Seminar Halls", "desc": "State-of-the-art audio-visual setups designed for debates, symposiums, and guest lectures.", "img": "https://img.freepik.com/free-photo/modern-classroom-projector_1048-12346.jpg" },
            { "title": "Creative Writing & Media Studio", "desc": "Dedicated space for journalism students and aspiring authors to hone their craft.", "img": "https://img.freepik.com/free-photo/scientists-working-laboratory_23-2149041483.jpg" }
          ]
        }),

        testimonials: JSON.stringify({
          "title": { "main": "Our Students Speak", "highlight": "Speak" },
          "label": "Testimonials",
          "list": [
            { "name": "Simran Kaur", "batch": "BA 2021", "company": "Media Professional", "emoji": "✍️", "rating": 5, "photo": "https://cpur.in/wp-content/uploads/2023/08/Archana-Kumari.png", "text": "The faculty's dedication to literature and social sciences profoundly shaped my worldview. The creative freedom here allowed me to find my true voice as a writer." },
            { "name": "Aman Raj", "batch": "MA 2022", "company": "Civil Services Aspirant", "emoji": "🏛️", "rating": 5, "photo": "https://cpur.in/wp-content/uploads/2023/08/student.png", "text": "The depth of the curriculum, especially in History and Political Science, gave me a massive advantage in my UPSC preparations. The library resources are phenomenal." },
            { "name": "Kavya Sharma", "batch": "BA 2020", "company": "Social Worker (NGO)", "emoji": "🌍", "rating": 5, "photo": "https://cpur.in/wp-content/uploads/2023/08/Archana-Kumari-Tech-Mahindra.png", "text": "CPU taught me that humanities isn't just about reading; it's about applying knowledge to solve real human problems. The fieldwork experiences were eye-opening." },
            { "name": "Rohan Gupta", "batch": "Ph.D. Scholar", "company": "Research Fellow", "emoji": "🎓", "rating": 5, "photo": "https://cpur.in/wp-content/uploads/2023/08/Siraj-Ali.png", "text": "The research environment here is incredibly supportive. My mentors encouraged interdisciplinary study, which added immense value to my doctoral thesis." }
          ]
        }),

        exploreDepartment: JSON.stringify({
          "sectionTitle": { "main": "Explore School of Arts & Humanities", "highlight": "School" },
          "subtitle": "Discover our specialized wings, societies, and libraries",
          "items": [
            { "title": "Department at a Glance", "icon": "Building2", "items": ["3+ Guest Experts/year", "Literary & Debate Clubs", "Seminars & Symposiums", "Civil Service Mentoring", "NGO Collaborations", "Cultural Fests", "Placement Assistance", "Field Trips"], "cta": "VIEW MORE" },
            { "title": "Exclusive Facilities", "icon": "FlaskConical", "items": ["Central Digital Library", "Advanced Language Lab", "Media & Journalism Studio", "Historical Archives Access", "Research Cell"], "cta": "VIEW MORE" },
            { "title": "Your Department in a Nutshell", "icon": "Star", "items": ["Student Achievements", "Faculty Publications", "Research Papers", "Latest Department Updates", "Upcoming Activities", "Important Links"], "cta": "START NOW" }
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