'use server';

import db from '@/models/index';
import { connectToDatabase } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

const fallbackYears = [
  {
    id: "1", tabLabel: "YEAR 1", tabTitle: "Foundation", contentTitle: "Build", contentDesc: "Learn by building from day 1, strengthening your foundations in core CS concepts and AI thinking.", badge: "YEAR-1",
    skills: ["C++", "HTML", "CSS", "JavaScript", "Git & GitHub", "VS Code", "Figma Basics", "Command Line", "Linux Basics"],
    aiTools: [
      { name: "ChatGPT", desc: "Prompt engineering & AI-assisted learning", icon: "Bot", color: "#10a37f" },
      { name: "Notion AI", desc: "Smart documentation & notes", icon: "FileText", color: "#000" }
    ],
    concepts: [
      { title: "Data Structures & Algorithms", desc: "Unlock the building blocks of any form of programming", icon: "🖥️" },
      { title: "Web Development", desc: "Learn to build modern, fully functional websites from scratch", icon: "🌐" },
      { title: "Core Maths", desc: "Explore the math behind computers and how 1s and 0s come to life", icon: "📐" }
    ],
    projects: [
      { name: "Personal Portfolio Website", desc: "Design and build your developer portfolio from scratch", companies: "Google · Airbnb · Stripe", color: "rgb(60, 204, 139)" },
      { name: "E-Commerce Product Page", desc: "Build a fully responsive product showcase with cart functionality", companies: "Amazon · Flipkart · Shopify", color: "rgb(59, 195, 226)" },
      { name: "AI-Powered Quiz App", desc: "Create an interactive quiz app using ChatGPT API", companies: "Duolingo · Quizlet · Khan Academy", color: "rgb(252, 192, 50)" },
      { name: "Task Management Dashboard", desc: "Full-stack CRUD app with React and local storage", companies: "Notion · Asana · Trello", color: "rgb(34, 172, 209)" }
    ],
    subjects: [
      "Programming Fundamentals (C++)", "Web Essentials (HTML, CSS, JS)", "Discrete Mathematics", 
      "Computer Organization", "Data Structures & Algorithms I", "Frontend Development (React.js)", 
      "Probability & Statistics", "Communication Skills"
    ]
  },
  {
    id: "2", tabLabel: "YEAR 2", tabTitle: "Development", contentTitle: "Develop", contentDesc: "Go deeper into backend systems, databases, and start your AI engineering journey with hands-on LLM projects.", badge: "YEAR-2",
    skills: ["Node.js", "MongoDB", "SQL", "Java", "REST APIs", "Express.js", "LLM APIs", "Postman", "Docker Basics", "Agile"],
    aiTools: [
      { name: "Google Gemini API", desc: "Build applications powered by Gemini", icon: "Brain", color: "#4285f4" },
      { name: "OpenAI API", desc: "Integrate GPT models into your apps", icon: "Zap", color: "#000" },
      { name: "Hugging Face", desc: "Access pre-trained AI models", icon: "Smile", color: "#ffd21e" }
    ],
    concepts: [
      { title: "Backend Engineering", desc: "Build scalable server-side applications and REST APIs", icon: "⚙️" },
      { title: "AI Engineering with LLMs", desc: "Learn to build AI-powered products using large language models", icon: "🤖" },
      { title: "Database Systems", desc: "Master SQL, NoSQL, and data modeling for real applications", icon: "🗄️" }
    ],
    projects: [
      { name: "Social Media Platform", desc: "Full-stack social app with feeds, auth, and real-time features", companies: "Meta · Twitter · LinkedIn", color: "rgb(59, 195, 226)" },
      { name: "AI Chatbot Assistant", desc: "Build a conversational AI bot using OpenAI API & LangChain", companies: "OpenAI · Intercom · Drift", color: "rgb(252, 192, 50)" },
      { name: "Food Ordering System", desc: "End-to-end food delivery app with payment integration", companies: "Zomato · Swiggy · DoorDash", color: "rgb(60, 204, 139)" },
      { name: "GenAI-Powered CRM", desc: "Build an AI CRM that auto-generates customer insights", companies: "Salesforce · HubSpot · Zoho", color: "rgb(34, 172, 209)" }
    ],
    subjects: [
      "Object Oriented Programming (Java)", "Data Structures & Algorithms II", "Backend Development (Node.js)",
      "Database Management Systems", "Operating Systems", "AI Engineering with LLMs", 
      "Computer Networks", "API Design & Microservices"
    ]
  },
  {
    id: "3", tabLabel: "YEAR 3", tabTitle: "AI Immersed Learning", contentTitle: "Specialize", contentDesc: "Dive deep into AI/ML, system design, and cloud — while gaining real industry exposure through internships.", badge: "YEAR-3",
    skills: ["TensorFlow", "PyTorch", "AWS", "Docker", "Kubernetes", "System Design", "NLP", "Computer Vision", "MLOps", "CI/CD", "Redis", "GraphQL"],
    aiTools: [
      { name: "TensorFlow", desc: "Build & train production ML models", icon: "Network", color: "#ff6f00" },
      { name: "Stable Diffusion", desc: "Generate images with AI diffusion models", icon: "Image", color: "#8b5cf6" },
      { name: "AutoML", desc: "Automated machine learning pipelines", icon: "Settings", color: "#0ea5e9" }
    ],
    concepts: [
      { title: "Machine Learning & Deep Learning", desc: "Build intelligent systems that learn from data", icon: "🧠" },
      { title: "System Design", desc: "Architect scalable, distributed systems like the pros", icon: "🏗️" },
      { title: "DevOps & Cloud", desc: "Deploy, monitor, and scale applications on AWS", icon: "☁️" }
    ],
    projects: [
      { name: "AI Image Generator", desc: "Build a Stable Diffusion-powered image generation tool", companies: "Midjourney · Adobe · Canva", color: "rgb(252, 192, 50)" },
      { name: "Video Streaming Platform", desc: "Netflix-like app with adaptive streaming and recommendations", companies: "Netflix · YouTube · Hotstar", color: "rgb(59, 195, 226)" },
      { name: "Real-time Chat Application", desc: "WebSocket-based chat with AI-powered smart replies", companies: "Slack · Discord · WhatsApp", color: "rgb(60, 204, 139)" },
      { name: "ML Model Deployment Pipeline", desc: "End-to-end MLOps pipeline on AWS with CI/CD", companies: "Google · Amazon · Microsoft", color: "rgb(34, 172, 209)" }
    ],
    subjects: [
      "System Design & Architecture", "DevOps & Cloud Computing (AWS)", "Machine Learning Fundamentals",
      "Natural Language Processing", "Entrepreneurship & Product Thinking", "Software Engineering & Testing",
      "Computer Vision"
    ]
  },
  {
    id: "4", tabLabel: "YEAR 4", tabTitle: "Career Ready", contentTitle: "Launch", contentDesc: "Get placement-ready with intensive bootcamps, capstone projects, and real-world industry immersion.", badge: "YEAR-4",
    skills: ["System Design", "Selenium", "CI/CD", "Git", "Interview Prep", "Portfolio Dev", "Leadership", "AI Product Mgmt", "QA Testing", "Agile/Scrum"],
    aiTools: [
      { name: "Claude AI", desc: "Advanced AI reasoning & code generation", icon: "MessageSquare", color: "#d97757" },
      { name: "Cursor", desc: "AI-first code editor for 10x productivity", icon: "Terminal", color: "#000" },
      { name: "Vercel AI SDK", desc: "Build & deploy AI-powered web apps", icon: "Triangle", color: "#000" }
    ],
    concepts: [
      { title: "Placement Bootcamps", desc: "Intensive interview prep with mock drives and DSA drills", icon: "Target", color: "" },
      { title: "AI Product Development", desc: "Build and ship a complete AI product from idea to launch", icon: "Rocket", color: "" },
      { title: "Industry Capstone", desc: "Work on a real company problem as your final project", icon: "Briefcase", color: "" }
    ],
    projects: [
      { name: "AI Code Assistant", desc: "Build an intelligent coding assistant like GitHub Copilot", companies: "GitHub · Cursor · Replit", color: "rgb(252, 192, 50)" },
      { name: "Job Portal Platform", desc: "Full-stack job board with AI-powered resume matching", companies: "LinkedIn · Naukri · Indeed", color: "rgb(59, 195, 226)" },
      { name: "Final Capstone Project", desc: "Industry-grade project solving a real business problem", companies: "Google · Razorpay · Zerodha", color: "rgb(60, 204, 139)" }
    ],
    subjects: [
      "Software Quality Assurance", "AI Product Development", "Placement Bootcamp II", 
      "Interview Preparation", "Portfolio Development", "Capstone Project"
    ]
  }
];

// JSON Data Imports (will use fs to avoid import caching in server actions)
const DEFAULT_HERO = {
  bgImage: "https://cpur.in/wp-content/uploads/2023/07/slider-1-1.jpg",
  badge: "Best University in Kota",
  title: { main: "Academic Excellence", highlight: "Excellence" },
  description: "Career Point University offers cutting-edge programs shaping future technologists, researchers, and industry-ready professionals.",
  cta: [{ label: "Apply Now", link: "#", primary: true }]
};

const DEFAULT_SCHOOL_DEPT = {
  sectionTitle: { main: "Explore Our Department", highlight: "Department" },
  subtitle: "Discover our specialized wings and innovation labs",
  items: [
    { 
      title: "Department at a Glance", 
      icon: "Building2", 
      items: ["Guest Experts", "Modern Lab Facilities", "Industry Collaborations", "Placement Assistance"], 
      cta: "VIEW MORE" 
    },
    { 
      title: "Exclusive Labs", 
      icon: "FlaskConical", 
      items: ["Microsoft Innovation Centre", "Oracle Innovation Lab", "Artificial Intelligence Lab"], 
      cta: "VIEW MORE" 
    },
    { 
      title: "Student Activities", 
      icon: "Star", 
      items: ["Hackathons", "Cultural Events", "Tech Seminars"], 
      cta: "START NOW" 
    }
  ]
};

const DEFAULT_COURSE_DEPT = {
  sectionTitle: { main: "Explore Department", highlight: "Department" },
  subtitle: "Discover what makes our curriculum exceptional",
  slides: [
    { 
      title: "Core Curriculum", 
      icon: "BookOpen", 
      items: ["Industry Focused", "Research Based", "Practical Training"], 
      cta: "LEARN MORE" 
    },
    { 
      title: "Skill Development", 
      icon: "TrendingUp", 
      items: ["Soft Skills", "Technical Workshops", "Personality Development"], 
      cta: "LEARN MORE" 
    }
  ]
};

async function getJsonData(filename) {
  const filePath = path.join(process.cwd(), 'src', 'data', filename);
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    return null;
  }
}

/**
 * TOTAL SYSTEM RESTORATION SEEDER (V2 Relational)
 */
export async function seedDatabase() {
  const { 
    School, Course, Testimonial, FAQ, PlacementPartner, Facility,
    Navigation, Footer, HomePage, Media, Page,
    ProgrammeCategory, ProgrammeCourse, ProgrammeSettings, AcademicSidebarLink
  } = db;

  try {
    console.log('🌱 Starting Total System Restoration Seeding...');
    await connectToDatabase();

    // --- 1. Load Data ---
    const navigationData = await getJsonData('navigation.json');
    const footerData = await getJsonData('footer.json');
    const homeData = await getJsonData('home.json');
    const programmesData = await getJsonData('programmes.json');
    const schoolsData = await getJsonData('schoolsData.json');
    const mediaBackup = await getJsonData('media_backup.json');
    const pagesBackup = await getJsonData('pages_backup.json');

    console.log(`📁 Loaded data: schools(${Boolean(schoolsData)}), programmes(${Boolean(programmesData)}), nav(${Boolean(navigationData)})`);

    // --- 2. Seed Config (Global) ---
    console.log('📡 Seeding Global Config (Nav, Footer, Home)...');
    if (navigationData) {
      await Navigation.create({ data: navigationData, documentName: 'main_header' });
      console.log('✅ Navigation Seeded');
    }
    if (footerData) {
      await Footer.create(footerData);
      console.log('✅ Footer Seeded');
    }
    if (homeData) {
      await HomePage.create({
        sections: homeData,
        seo: { title: 'Career Point University', description: 'Premier Private University in Rajasthan' }
      });
    }

    // --- 3. Restore Backups (Media & Pages) ---
    if (mediaBackup) {
      console.log(`📡 Restoring ${mediaBackup.length} Media items...`);
      for (const m of mediaBackup) {
        delete m.id; // Allow auto-increment
        await Media.create(m);
      }
    }
    if (pagesBackup) {
      console.log(`📡 Restoring ${pagesBackup.length} Custom Pages...`);
      for (const p of pagesBackup) {
        delete p.id;
        await Page.create(p);
      }
    }

    // --- 4. Seed Catalog (Schools, Courses, Relational V2) ---
    console.log('📡 Seeding Schools and Courses...');
    const schoolMap = {}; // name/slug -> id

    for (const schoolEntry of Object.values(schoolsData || {})) {
      // derive name from hero.title.main if not explicitly present
      const schoolName = schoolEntry.name || schoolEntry.hero?.title?.main || schoolEntry.slug;
      
      // Step A: Create School (Dual-Seeding: Save JSON blobs + prepare for Relational)
      const school = await School.create({
        name: schoolName,
        slug: schoolEntry.slug,
        metaTitle: schoolEntry.metaTitle || schoolName,
        metaDescription: schoolEntry.metaDescription || '',
        hero: schoolEntry.hero || { ...DEFAULT_HERO, title: { main: schoolName, highlight: "" } },
        stats: schoolEntry.stats || [],
        colors: schoolEntry.colors || {},
        about: schoolEntry.about || {},
        programmes: schoolEntry.programmes || {},
        placements: schoolEntry.placements || {},
        alumni: schoolEntry.alumni || {},
        industry: schoolEntry.industry || {},
        research: schoolEntry.research || {},
        community: schoolEntry.community || {},
        infrastructure: schoolEntry.infrastructure || {},
        testimonials: schoolEntry.testimonials || {},
        exploreDepartment: (() => {
          if (schoolEntry.exploreDepartment) return schoolEntry.exploreDepartment;
          if (Array.isArray(schoolEntry.deptSlides)) return { items: schoolEntry.deptSlides };
          if (schoolEntry.deptSlides) return schoolEntry.deptSlides;
          
          // Try to find deptSlides in any of its courses
          const courseDetails = schoolEntry.courseDetails || {};
          for (const cName in courseDetails) {
            if (courseDetails[cName].deptSlides) {
              return { items: courseDetails[cName].deptSlides };
            }
          }
          
          return DEFAULT_SCHOOL_DEPT;
        })(),
        sidebarLinks: schoolEntry.sidebarLinks || [],
        status: 'published',
        version: 1
      });
      schoolMap[school.slug] = school.id;
      schoolMap[school.name] = school.id; // Map by Name too

      // Step B: Seed RELATIONAL V2 Schools Data (Testimonials, FAQs, etc.)
      // Resilient iteration for different JSON structures (.list, .partners, or raw array)
      
      const testimonialsArr = schoolEntry.testimonials?.list || (Array.isArray(schoolEntry.testimonials) ? schoolEntry.testimonials : []);
      for (const t of testimonialsArr) {
        await Testimonial.create({
          studentName: t.name || t.studentName || 'Anonymous',
          reviewText: t.text || t.content || t.reviewText || 'Excellent environment and faculty.',
          rating: t.rating || 5,
          image: t.photo || t.image || t.avatar || '',
          batch: t.batch,
          company: t.company,
          schoolId: school.id
        });
      }

      const faqArr = schoolEntry.faqs || (Array.isArray(schoolEntry.faq?.items) ? schoolEntry.faq.items : []);
      for (const f of faqArr) {
        await FAQ.create({
          question: f.question || f.q,
          answer: f.answer || f.a,
          schoolId: school.id
        });
      }

      const placementArr = schoolEntry.industry?.partners || (Array.isArray(schoolEntry.placements) ? schoolEntry.placements : []);
      for (const p of placementArr) {
        await PlacementPartner.create({
          companyName: p.name || p.companyName || 'Industrial Partner',
          logoUrl: p.url || p.image || p.img || p.logoUrl || 'https://cpur.in/wp-content/uploads/2023/08/tcs-logo-as-Smart-Object-1.jpg',
          schoolId: school.id
        });
      }

      const facilityArr = schoolEntry.infrastructure?.list || (Array.isArray(schoolEntry.facilities) ? schoolEntry.facilities : []);
      for (const f of facilityArr) {
        await Facility.create({
          name: f.title || f.name || 'Campus Facility',
          description: f.desc || f.description || 'Modern campus infrastructure and state-of-the-art labs.',
          image: f.img || f.image || f.url || '',
          schoolId: school.id
        });
      }

      // Step C: Seed Courses for this school
      // Primary source: courseDetails (rich data), Fallback: courses array
      const courseEntries = schoolEntry.courseDetails ? Object.entries(schoolEntry.courseDetails) : [];
      
      if (courseEntries.length > 0) {
        for (const [courseSlug, c] of courseEntries) {
          const courseName = c.title || c.name || courseSlug.toUpperCase();
          await Course.create({
            name: courseName,
            title: courseName,
            slug: courseSlug,
            duration: c.duration,
            eligibility: c.eligibility,
            description: c.description || (Array.isArray(c.overview?.paragraphs) ? c.overview.paragraphs.join('\n') : ''),
            metaTitle: c.metaTitle || courseName,
            metaDescription: c.metaDescription || c.description || '',
            hero: c.hero || {},
            accomplishments: c.accomplishments || {},
            overview: c.overview || {},
            scope: c.scope || {},
            curriculum: c.curriculum || {},
            admissionFee: c.admissionFee || {},
            scholarships: c.scholarships || {},
            whyJoin: c.whyJoin || {},
            uniqueFeatures: c.uniqueFeatures || {},
            applySteps: c.applySteps || {},
            faq: c.faq || {},
            roadmap: (c.roadmap && Array.isArray(c.roadmap.years) && c.roadmap.years.length > 0) 
              ? c.roadmap 
              : { 
                  sectionTitle: c.roadmap?.sectionTitle || { main: '4 Year Learning Roadmap', highlight: 'Roadmap' }, 
                  subtitle: c.roadmap?.subtitle || 'Your journey from foundation to industry expert.', 
                  years: fallbackYears 
                },
            exploreDepartment: c.exploreDepartment || (Array.isArray(schoolEntry.deptSlides) ? { slides: schoolEntry.deptSlides } : schoolEntry.deptSlides) || DEFAULT_COURSE_DEPT,
            placements: (() => {
              const pData = c.placements || schoolEntry.placements || {};
              return {
                title: pData.title || pData.sectionTitle || { main: 'Placement Records', highlight: 'Records' },
                label: pData.label || 'Placement',
                subtitle: pData.subtitle || 'Highest & best placement record in the region',
                stats: pData.stats || [],
                list: (pData.list || []).map(item => ({
                  name: item.name,
                  company: item.company,
                  img: item.img || item.logo || '',
                  pkg: item.pkg || item.package || '',
                  role: item.role || ''
                }))
              };
            })(),
            industry: (() => {
              const iData = c.industry || schoolEntry.industry || {};
              return {
                title: iData.title || iData.sectionTitle || { main: "Industry Tie-ups", highlight: "Partners" },
                label: iData.label || iData.subtitle || "Collaborations",
                partners: (iData.partners || iData.list || []).map(p => ({
                  name: p.name,
                  url: p.url || p.logo || ''
                }))
              };
            })(),
            testimonials: c.testimonials || (schoolEntry.testimonials ? { ...schoolEntry.testimonials, list: schoolEntry.testimonials.list || [] } : { list: [] }),
            schoolId: school.id,
            status: 'published'
          });
          console.log(`   - Course Seeded: ${courseSlug}`);
        }
      } else if (Array.isArray(schoolEntry.courses)) {
        for (const c of schoolEntry.courses) {
          await Course.create({
            name: c.name,
            title: c.name,
            slug: c.slug,
            schoolId: school.id,
            status: 'published'
          });
        }
      }
    }

    // --- 5. Seed Programmes & Academic Catalog ---
    console.log('📡 Seeding Academic Programmes and Categories...');
    if (programmesData) {
      console.log('🌱 Seeding Programme Settings...');
      await ProgrammeSettings.create({
        metaTitle: 'Programmes | Career Point University',
        metaDescription: 'Explore all programmes and courses offered at CPU Kota.'
      });

      // --- Academic Sidebar Links ---
      if (programmesData.sidebarLinks) {
        console.log(`🌱 Seeding ${programmesData.sidebarLinks.length} Sidebar Links...`);
        for (const [idx, link] of programmesData.sidebarLinks.entries()) {
          await AcademicSidebarLink.create({
            ...link,
            order: idx + 1
          });
        }
      }

      // Discovery Phase: Find all unique schools mentioned in programmes.json
      const allUniqueSchools = new Set();
      Object.values(programmesData.courses || {}).forEach(categoryCourses => {
        categoryCourses.forEach(pc => {
          if (pc.school) allUniqueSchools.add(pc.school);
        });
      });

      // Seed Placeholder Schools if they don't exist
      for (const sName of allUniqueSchools) {
        if (!schoolMap[sName]) {
          console.log(`🌱 Creating placeholder school: ${sName}`);
          const sSlug = sName.toLowerCase().replace(/[^a-z0-p]+/g, '-').replace(/(^-|-$)/g, '');
          const newSchool = await School.create({
            name: sName,
            slug: sSlug,
            hero: { ...DEFAULT_HERO, title: { main: sName, highlight: "" } },
            exploreDepartment: DEFAULT_SCHOOL_DEPT,
            status: 'published',
            version: 1
          });
          schoolMap[sName] = newSchool.id;
          schoolMap[sSlug] = newSchool.id;
        }
      }

      console.log(`🌱 Seeding ${programmesData.programmeTypes?.length || 0} categories...`);
      for (const [index, type] of (programmesData.programmeTypes || []).entries()) {
        const category = await ProgrammeCategory.create({
          label: type.label,
          order: index + 1
        });
        console.log(`   - Category: ${type.label}`);

        const pcourses = programmesData.courses[type.label] || [];
        console.log(`   - Seeding ${pcourses.length} courses for ${type.label}`);
        for (const pc of pcourses) {
          const targetSchoolId = schoolMap[pc.school] || null;

          await ProgrammeCourse.create({
            title: pc.title,
            categoryId: category.id,
            schoolId: targetSchoolId,
            school: pc.school,
            icon: pc.icon,
            colorHex: pc.colorHex || '#00588b',
            iconBg: pc.iconBg,
            textColor: pc.textColor,
            borderHover: pc.borderHover,
            programs: Array.isArray(pc.programs) ? `<ul>${pc.programs.map(p => `<li>${p}</li>`).join('')}</ul>` : pc.programs,
            detailsSlug: pc.detailsSlug || '#',
            badge: pc.badge || {}
          });
        }
      }
    }

    console.log('✅ TOTAL SYSTEM SEEDING COMPLETED SUCCESSFULLY.');
    return { success: true, message: 'Total System Restoration Completed.' };

  } catch (error) {
    console.error('❌ Total Seed Error:', error.message);
    return { success: false, error: error.message };
  }
}
