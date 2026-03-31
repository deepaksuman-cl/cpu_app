'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('schools', [
      {
        name: "School of Basic & Applied Sciences",
        slug: "basic-applied-science",
        status: "published",
        version: 1,
        metaTitle: "School of Basic & Applied Sciences | Career Point University",
        metaDescription: "Pioneering research and innovation in Physics, Chemistry, Mathematics, and Biosciences. Discover our premier science programs.",
        
        breadcrumb: JSON.stringify([
          { "label": "Home", "link": "/" },
          { "label": "Schools & Departments", "link": "/schools" },
          { "label": "Basic & Applied Sciences", "link": "/schools/basic-applied-science" }
        ]),
        
        hero: JSON.stringify({
          "bgImage": "https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg",
          "badge": "Center of Scientific Excellence & Innovation",
          "title": { 
            "main": "School of Basic & Applied Sciences", 
            "highlight": "Basic", 
            "skyHighlight": "& Applied Sciences" 
          },
          "description": "Empowering the next generation of scientists, researchers, and innovators through world-class laboratories and research-driven academics.",
          "cta": [
            { "label": "Apply Now", "link": "#", "primary": true },
            { "label": "Explore Programs", "link": "#programs", "primary": false }
          ]
        }),

        stats: JSON.stringify([
          { "value": "18L", "label": "Highest Package", "icon": "TrendingUp" },
          { "value": "300+", "label": "Research Papers", "icon": "BookOpen" },
          { "value": "25+", "label": "Patents Filed", "icon": "FlaskConical" },
          { "value": "40+", "label": "Industry Partners", "icon": "Briefcase" }
        ]),

        about: JSON.stringify({
          "vision": {
            "title": "Vision", 
            "label": "Our Purpose", 
            "icon": "Target",
            "text": "To emerge as a premier center of scientific learning and research, fostering a culture of innovation that addresses global challenges through fundamental and applied sciences.",
            "highlights": [
              { "value": "1200+", "label": "Science Scholars" },
              { "value": "92%", "label": "Placement/Research" },
              { "value": "10+", "label": "Advanced Labs" }
            ]
          },
          "mission": {
            "title": "Mission", 
            "label": "Our Goal", 
            "icon": "Lightbulb",
            "points": [
              "Deliver rigorous, concept-driven academic programs in core scientific disciplines.",
              "Promote interdisciplinary research that connects basic sciences with real-world applications.",
              "Equip students with cutting-edge analytical and laboratory skills.",
              "Collaborate with leading scientific organizations and biotech industries."
            ]
          }
        }),

        programmes: JSON.stringify({
          "bgImage": "https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg",
          "title": { "main": "Our Programmes", "highlight": "Programmes" },
          "subtitle": "Academic Offerings",
          "description": "Explore our specialized undergraduate, postgraduate, and doctoral programs in Mathematics, Physics, Chemistry, and Life Sciences.",
          "levels": [
            {
              "label": "After 12th Pass (Science)",
              "icon": "GraduationCap",
              "courses": [
                {
                  "name": "Bachelor of Science (B.Sc.)",
                  "slug": "bsc", 
                  "specializations": [
                    { "name": "Physics", "slug": "physics" },
                    { "name": "Chemistry", "slug": "chemistry" },
                    { "name": "Mathematics", "slug": "mathematics" },
                    { "name": "Botany", "slug": "botany" },
                    { "name": "Zoology", "slug": "zoology" }
                  ]
                }
              ]
            },
            {
              "label": "After Graduation / Equivalent",
              "icon": "BookOpen",
              "courses": [
                {
                  "name": "Master of Science (M.Sc.)",
                  "slug": "msc",
                  "specializations": [
                    { "name": "Organic Chemistry", "slug": "organic-chemistry" },
                    { "name": "Applied Physics", "slug": "applied-physics" },
                    { "name": "Biotechnology", "slug": "biotech" }
                  ]
                }
              ]
            },
            {
              "label": "After Post Graduation / Equivalent",
              "icon": "Microscope",
              "courses": [
                {
                  "name": "Ph.D. in Science",
                  "slug": "phd-science",
                  "description": "Advanced doctoral research in fundamental and applied sciences."
                }
              ]
            }
          ]
        }),

        placements: JSON.stringify({
          "title": { "main": "Science Graduates in Top Organizations", "highlight": "Top Organizations" },
          "label": "Placement Records",
          "subtitle": "Outstanding placements in Pharma, R&D, and Tech sectors",
          "list": [
            { "name": "Aditi Sharma", "company": "Biocon", "pkg": "12 LPA", "img": "https://cpur.in/wp-content/uploads/2023/08/Archana-Kumari.png" },
            { "name": "Rohan Das", "company": "Cipla Pharmaceuticals", "pkg": "9 LPA", "img": "https://cpur.in/wp-content/uploads/2023/08/Tarun-Jain.png" },
            { "name": "Vikram Singh", "company": "DRDO (Research Intern)", "pkg": "Stipend", "img": "https://cpur.in/wp-content/uploads/2023/08/Siraj-Ali.png" },
            { "name": "Megha Nair", "company": "Sun Pharma", "pkg": "10.5 LPA", "img": "https://cpur.in/wp-content/uploads/2023/07/1-d.jpg" }
          ]
        }),

        alumni: JSON.stringify({
          "title": { "main": "Scientists Making a Global Impact", "highlight": "Impact" },
          "label": "Our Alumni",
          "list": [
            { "name": "Dr. Sameer Khan", "role": "Lead Researcher", "company": "National Chemical Lab", "img": "https://cpur.in/wp-content/uploads/2023/08/aryan.jpg" },
            { "name": "Ananya Patil", "role": "Quality Control Head", "company": "Pfizer", "img": "https://cpur.in/wp-content/uploads/2023/08/Archana-Kumari.png" },
            { "name": "Rahul Verma", "role": "Data Analyst", "company": "Accenture", "img": "https://cpur.in/wp-content/uploads/2023/08/harsh.jpg" }
          ]
        }),

        industry: JSON.stringify({
          "title": { "main": "Scientific & Industry Tie Up's", "highlight": "Tie Up's" },
          "label": "Collaborations",
          "partners": [
            { "name": "Biocon", "url": "https://cpur.in/wp-content/uploads/2023/08/tcs-logo-as-Smart-Object-1.jpg" },
            { "name": "CSIR Labs", "url": "https://cpur.in/wp-content/uploads/2023/08/infosys-as-Smart-Object-1.jpg" },
            { "name": "Serum Institute", "url": "https://cpur.in/wp-content/uploads/2023/08/wipro-as-Smart-Object-1.jpg" },
            { "name": "Dr. Reddy's", "url": "https://cpur.in/wp-content/uploads/2023/08/google-as-Smart-Object-1.jpg" }
          ]
        }),

        research: JSON.stringify({
          "title": { "main": "Scientific Research Excellence", "highlight": "Excellence" },
          "label": "Eminence Research",
          "gallery": [
            "https://cpur.in/wp-content/uploads/2023/07/gallery-7.jpg",
            "https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg",
            "https://cpur.in/wp-content/uploads/2023/07/gallery-12.jpg"
          ],
          "stats": [
            { "value": "300+", "label": "SCI/SCOPUS Publications", "icon": "BookOpen" },
            { "value": "25+", "label": "Patents Filed", "icon": "FlaskConical" },
            { "value": "12+", "label": "Govt. Funded Projects", "icon": "Briefcase" },
            { "value": "50+", "label": "International Conferences", "icon": "Presentation" }
          ]
        }),

        community: JSON.stringify({
          "title": { "main": "A Community of Innovators", "highlight": "Innovators" },
          "label": "Community",
          "description": [
            "The School of Basic & Applied Sciences is a thriving ecosystem of curiosity. Our community consists of brilliant minds dedicated to unraveling the mysteries of the universe.",
            "From national-level science exhibitions and hackathons to coding clubs and environmental drives, our students are constantly engaged in activities that broaden their scientific horizons and societal impact."
          ],
          "gallery": [
            { "src": "https://cpur.in/wp-content/uploads/2023/07/gallery-7-1.jpg", "caption": "Advanced Chemistry Lab Session" },
            { "src": "https://cpur.in/wp-content/uploads/2023/07/gallery-12-1.jpg", "caption": "Annual Science Exhibition" }
          ]
        }),

        infrastructure: JSON.stringify({
          "title": { "main": "World-Class Science Infrastructure", "highlight": "Infrastructure" },
          "label": "Campus",
          "list": [
            { "title": "Advanced Central Instrumentation Lab", "desc": "Equipped with HPLC, FTIR, UV-Vis Spectrophotometers, and more.", "img": "https://img.freepik.com/free-photo/scientists-working-laboratory_23-2149041483.jpg" },
            { "title": "High-Performance Computing Lab", "desc": "For complex mathematical modeling and computational physics.", "img": "https://img.freepik.com/free-photo/network-server-room_1048-2200.jpg" },
            { "title": "Modern Bioscience Labs", "desc": "Bio-safety cabinets, incubators, and genetic testing equipment.", "img": "https://img.freepik.com/free-photo/lab-dummy.jpg" }
          ]
        }),

        testimonials: JSON.stringify({
          "title": { "main": "Our Science Scholars Speak", "highlight": "Speak" },
          "label": "Testimonials",
          "list": [
            { "name": "Aditi Sharma", "batch": "M.Sc. 2022", "company": "Biocon", "emoji": "🧬", "rating": 5, "photo": "https://cpur.in/wp-content/uploads/2023/08/Archana-Kumari.png", "text": "The lab facilities here are at par with industry standards. The practical exposure I got directly helped me secure my placement in R&D." },
            { "name": "Vikram Singh", "batch": "B.Sc. 2021", "company": "Research Intern", "emoji": "🔭", "rating": 5, "photo": "https://cpur.in/wp-content/uploads/2023/08/Siraj-Ali.png", "text": "CPU's faculty didn't just teach us from books; they involved us in their live research projects. It completely changed my perspective on Physics." }
          ]
        }),

        exploreDepartment: JSON.stringify({
          "sectionTitle": { "main": "Explore School of Basic & Applied Sciences", "highlight": "School" },
          "subtitle": "Discover our specialized labs, research cells, and scientific societies",
          "items": [
            { "title": "Department at a Glance", "icon": "Building2", "items": ["National Science Fests", "Guest Lectures by ISRO/CSIR Scientists", "Science Club Activities", "Placement Drives", "Industrial Lab Visits"], "cta": "VIEW MORE" },
            { "title": "Exclusive Facilities", "icon": "FlaskConical", "items": ["Central Instrumentation Facility", "Biosafety Level 2 Lab", "Computational Mathematics Lab", "Botanical Garden"], "cta": "VIEW MORE" }
          ]
        }),

        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('schools', { slug: 'basic-applied-science' }, {});
  }
};