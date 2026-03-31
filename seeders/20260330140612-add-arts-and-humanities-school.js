'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('schools', [
      {
        name: 'School of Arts & Humanities',
        slug: 'arts-and-humanities',
        status: 'published',
        version: 1,
        metaTitle: 'School of Arts & Humanities | Career Point University Kota',
        metaDescription: 'Discover excellence in Liberal Arts, Literature, Social Work, and Library Sciences at CPU Kota. Nurturing critical thinkers and global leaders in Humanities.',
        breadcrumb: [
          { label: 'Home', link: '/' },
          { label: 'Schools', link: '/schools' },
          { label: 'Arts & Humanities', link: '/schools/arts-and-humanities' }
        ],
        hero: {
          bgImage: 'https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg',
          badge: 'Center for Intellectual Excellence',
          title: {
            main: 'School of',
            highlight: 'Arts &',
            skyHighlight: 'Humanities'
          },
          subtitle: 'Fostering Creativity, Critical Analysis, and Cultural Understanding.',
          description: 'The School of Arts & Humanities at Career Point University is a vibrant community of scholars and students dedicated to exploring the human experience. Through a curriculum that blends classical wisdom with contemporary insights, we prepare students to navigate and shape a complex global society with empathy and intellectual rigor.',
          cta: [
            { label: 'Admissions 2026', link: '/apply', primary: true },
            { label: 'Explore Courses', link: '#programmes', primary: false }
          ],
          quickStats: [
            { value: '30+', label: 'Renowned Faculty' },
            { value: '2500+', label: 'Global Network' },
            { value: '15+', label: 'Cultural Labs' }
          ]
        },
        stats: [
          { value: '94%', label: 'Graduate Success' },
          { value: '60+', label: 'Annual Projects' },
          { value: '12:1', label: 'Faculty Ratio' },
          { value: '100%', label: 'Research Focus' }
        ],
        about: {
          title: 'A Legacy of Creative Thought & Social Impact',
          description: 'Our school serves as the heart of liberal education at CPU Kota. We believe that a deep understanding of literature, history, and social structures is the key to solving the worlds most pressing challenges. Our interdisciplinary approach encourages students to think beyond boundaries, developing skills in communication, ethics, and leadership that are highly valued in the modern workforce.',
          vision: 'To be a global vanguard in liberal arts education, where traditional humanities meet digital innovation to empower students as catalysts for social and cultural transformation.',
          mission: 'To provide an immersive educational environment that cultivates critical inquiry, appreciates diverse cultural narratives, and produces graduates who contribute ethically and creatively to the global community.',
          features: [
            'Interdisciplinary Research Centers',
            'Digital Humanities & Archive Projects',
            'Community-led Social Work Initiatives',
            'Global Literary Exchange Programmes'
          ],
          image: 'https://cpur.in/wp-content/uploads/2023/07/gallery-7.jpg'
        },
        programmes: {
          title: 'Advanced Academic Pathways',
          description: 'Our academic offerings are structured to provide a logical progression from foundational undergraduate studies to advanced specialized research.',
          levels: [
            {
              label: "After 12th Pass/ 'A' Level",
              courses: [
                { name: "B.A.", slug: "ba", duration: "3 Years", type: "Undergraduate" },
                { name: "B.Lib.", slug: "b-lib", duration: "1 Year", type: "Undergraduate" }
              ]
            },
            {
              label: "After Graduation / Equivalent",
              courses: [
                { name: "M.A.", slug: "ma", duration: "2 Years", type: "Postgraduate" },
                { name: "Master of Social Work (MSW)", slug: "msw", duration: "2 Years", type: "Postgraduate" },
                { name: "M.Lib.", slug: "m-lib", duration: "1 Year", type: "Postgraduate" }
              ]
            },
            {
              label: "After Post Graduation / Equivalent",
              courses: [
                { name: "Ph.D. (All Subjects)", slug: "research-phd", duration: "3-5 Years", type: "Doctoral" }
              ]
            }
          ]
        },
        placements: {
          title: 'Corporate & Social Career Pathways',
          description: 'Humanities graduates at CPU are uniquely positioned for roles that require high-level critical thinking, synthesis of complex data, and human-centric problem-solving.',
          stats: [
            { label: 'Highest Salary', value: '9.2 LPA' },
            { label: 'Average Package', value: '4.8 LPA' },
            { label: 'Top Recruiters', value: '50+' }
          ],
          recruiters: [
            { name: 'NGO Global', logo: 'https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg' },
            { name: 'Media Corp', logo: 'https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg' },
            { name: 'Lighthouse Edu', logo: 'https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg' },
            { name: 'Heritage Trust', logo: 'https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg' }
          ]
        },
        alumni: {
          title: 'Voices of Success',
          description: 'Our legacy is defined by our students who have gone on to lead in civil services, literature, and global social development.',
          stories: [
            {
              name: 'Ms. Aditi Rao',
              batch: 'Class of 2019',
              company: 'UN Women',
              position: 'Regional Policy Advisor',
              quote: 'The critical thinking skills I developed at CPU Kota have been indispensable in my work advocating for social policy changes on a global scale.',
              image: 'https://cpur.in/wp-content/uploads/2023/07/student.png'
            },
            {
              name: 'Dr. Sameet Iyer',
              batch: 'Class of 2017',
              company: 'Central Library Services',
              position: 'Director of Operations',
              quote: 'CPU provided the perfect mix of traditional archive management and modern digital library science training.',
              image: 'https://cpur.in/wp-content/uploads/2023/07/student.png'
            }
          ]
        },
        industry: {
          title: 'Professional Networking & Tie-ups',
          description: 'We maintain strong connections with leading NGOs, Media Houses, and Cultural Federations to provide our students with internship and live project opportunities.',
          partners: [
            { name: 'Amnesty International', logo: 'https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg' },
            { name: 'National Archives', logo: 'https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg' },
            { name: 'Houghton Mifflin', logo: 'https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg' }
          ]
        },
        research: {
          title: 'Pioneering Humanities Research',
          description: 'The School of Arts & Humanities is dedicated to exploring new frontiers in social sciences and literary studies through data-driven and qualitative research.',
          focusAreas: [
            'Socio-Economic Impacts on Rural Education',
            'Linguistic Evolution in the Digital Age',
            'Cross-Cultural Narratives in Modern Literature',
            'Sustainable Social Work Models for Developing Cities'
          ],
          projects: [
            { title: 'The Kota Heritage Mapping Project', status: 'In Progress' },
            { title: 'Digital Literacy in Secondary Schools', status: 'Completed' }
          ]
        },
        community: {
          title: 'Social Service Hub',
          description: 'Our Master of Social Work students lead site-wide initiatives that directly impact local communities through literacy camps, health awareness, and vocational training.',
          initiatives: [
            { title: 'Project Sharda', description: 'Enhancing foundational literacy for underprivileged children.' },
            { title: 'Heritage Walks', description: 'Connecting citizens with the rich cultural history of Kota.' }
          ],
          image: 'https://cpur.in/wp-content/uploads/2023/07/gallery-6.jpg'
        },
        infrastructure: {
          title: 'Dedicated Spaces for Innovation',
          description: 'Our campus is equipped with specialized labs and archives that provide students with the tools needed for deep academic study.',
          facilities: [
            { name: 'Central Humanities Library', description: 'Houses over 1 lakh volumes including rare manuscripts and digital databases.', image: 'https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg' },
            { name: 'Social Work Field Office', description: 'Strategic hub for planning and executing community outreach projects.', image: 'https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg' },
            { name: 'Digital Humanities Lab', description: 'Equipped with software for structural linguistics and textual analysis.', image: 'https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg' }
          ]
        },
        testimonials: {
          title: 'Students Insight',
          description: 'Hear directly from the students who are shaping their futures at the School of Arts & Humanities.',
          items: [
            {
              name: 'Arjun Meena',
              course: 'B.A. (History & Pol. Science)',
              text: 'The lecturers here dont just teach facts; they engage us in deep debates that have changed how I see the world.',
              avatar: 'https://cpur.in/wp-content/uploads/2023/07/student.png'
            },
            {
              name: 'Priya Chawla',
              course: 'Master of Social Work',
              text: 'The field work was eye-opening. I spent six months working with local NGOs, which gave me insights I could never get from a textbook.',
              avatar: 'https://cpur.in/wp-content/uploads/2023/07/student.png'
            }
          ]
        },
        exploreDepartment: {
          title: 'Find Your Specialized Path',
          description: 'Our school is organized into specialized departments, each offering a unique focus to help you reach your academic peak.',
          links: [
            { label: 'Department of Fine Arts', link: '/departments/fine-arts' },
            { label: 'Department of Social Sciences', link: '/departments/social-sciences' },
            { label: 'Department of Library Science', link: '/departments/library-science' },
            { label: 'Literary Research Wing', link: '/departments/literary-research' }
          ]
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('schools', { slug: 'arts-and-humanities' }, {});
  }
};
