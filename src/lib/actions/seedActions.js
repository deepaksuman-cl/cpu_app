'use server';

import fs from 'fs/promises';
import path from 'path';

import { connectToDatabase } from '@/lib/db';

import Course from '@/models/Course';
import Footer from '@/models/Footer';
import HomePage from '@/models/HomePage';
import Navigation from '@/models/Navigation';
import Page from '@/models/Page';
import School from '@/models/School';

// 🔥 Programme models
import AcademicSidebarLink from '@/models/AcademicSidebarLink';
import ProgrammeCategory from '@/models/ProgrammeCategory';
import ProgrammeCourse from '@/models/ProgrammeCourse';
import ProgrammeSettings from '@/models/ProgrammeSettings';

// 🔧 Helper
const ensureStructuredTitle = (title) => {
  if (!title) return { main: '', highlight: '', skyHighlight: '' };
  if (typeof title === 'string') return { main: title, highlight: '', skyHighlight: '' };
  return {
    main: title.main || '',
    highlight: title.highlight || '',
    skyHighlight: title.skyHighlight || '',
  };
};

export async function seedDatabase() {
  try {
    console.log('🚀 Starting Universal Database Seed...');
    
    // Use fs to load JSON files instead of static imports to avoid boot-time issues
    const dataDir = path.join(process.cwd(), 'src', 'data');
    const loadJson = async (file) => JSON.parse(await fs.readFile(path.join(dataDir, file), 'utf-8'));

    const footerData = await loadJson('footer.json');
    const homeData = await loadJson('home.json');
    const navigationData = await loadJson('navigation.json');
    const programmesData = await loadJson('programmes.json');
    const schoolsData = await loadJson('schoolsData.json');

    // ✅ STEP 1: Connect + Sync
    await connectToDatabase();

    // ✅ STEP 2: Clear old data (Master Reset)
    console.log('🗑️ Clearing existing data...');
    await Course.destroy({ where: {} });
    await School.destroy({ where: {} });
    await Page.destroy({ where: {} });
    await Footer.destroy({ where: {} });
    await Navigation.destroy({ where: {} });
    await HomePage.destroy({ where: {} });

    // 🔥 PROGRAMME TABLES CLEAR
    await ProgrammeCourse.destroy({ where: {} });
    await ProgrammeCategory.destroy({ where: {} });
    await ProgrammeSettings.destroy({ where: {} });
    await AcademicSidebarLink.destroy({ where: {} });

    // ==========================================
    // ✅ STEP 3: Schools & Courses (Schools Hub)
    // ==========================================
    console.log('🌱 Seeding Schools & Courses...');

    for (const [slug, data] of Object.entries(schoolsData)) {
      // Enrich programmes with duration from courseDetails for "Plug & Play" metadata
      if (data.programmes?.levels) {
        data.programmes.levels.forEach(level => {
          level.courses?.forEach(course => {
            if (data.courseDetails?.[course.slug]) {
              course.duration = data.courseDetails[course.slug].duration;
            }
          });
        });
      }

      const newSchool = await School.create({
        name: data.hero?.title?.main || data.name || slug,
        slug: slug,
        metaTitle: data.metaTitle || '',
        metaDescription: data.metaDescription || '',
        breadcrumb: data.breadcrumb || [],
        hero: {
          bgImage: data.hero?.bgImage,
          badge: data.hero?.badge,
          title: ensureStructuredTitle(data.hero?.title),
          description: data.hero?.description,
          cta: data.hero?.cta,
          quickStats: data.hero?.quickStats,
        },
        stats: data.stats || [],
        about: data.about || {},
        programmes: data.programmes || {},
        placements: data.placements || {},
        alumni: data.alumni || {},
        industry: data.industry || {},
        research: data.research || {},
        community: data.community || {},
        infrastructure: data.infrastructure || {},
        testimonials: data.testimonials || {},
        exploreDepartment: data.exploreDepartment || {},
      });

      if (data.courseDetails) {
        for (const [courseSlug, courseData] of Object.entries(data.courseDetails)) {
          await Course.create({
            name: courseData.title || courseSlug,
            slug: courseSlug,
            schoolId: newSchool.id,
            title: courseData.title,
            duration: courseData.duration,
            eligibility: courseData.eligibility,
            description: courseData.description,
            metaTitle: courseData.metaTitle || '',
            metaDescription: courseData.metaDescription || '',
            hero: courseData.hero || {},
            accomplishments: courseData.accomplishments || {},
            overview: courseData.overview || {},
            scope: courseData.scope || {},
            curriculum: courseData.curriculum || {},
            admissionFee: courseData.admissionFee || {},
            scholarships: courseData.scholarships || {},
            whyJoin: courseData.whyJoin || {},
            uniqueFeatures: courseData.uniqueFeatures || {},
            applySteps: courseData.applySteps || {},
            faq: courseData.faq || {},
            exploreDepartment: courseData.exploreDepartment || {},
            roadmap: courseData.roadmap || {},
          });
        }
      }
    }

    // ✅ STEP 3.5: Auto-Seed missing schools from Navigation (Stub support)
    const schoolSlugsInNav = [];
    const findSchoolSlugs = (obj) => {
      if (!obj || typeof obj !== 'object') return;
      if (obj.slug && typeof obj.slug === 'string' && obj.slug.startsWith('/schools/') && obj.slug.split('/').length === 3) {
        // Extract label and slug (e.g., /schools/education -> education)
        const parts = obj.slug.split('/');
        schoolSlugsInNav.push({
          label: obj.label,
          slug: parts[2]
        });
      }
      Object.values(obj).forEach(val => {
        if (typeof val === 'object') findSchoolSlugs(val);
      });
    };
    findSchoolSlugs(navigationData);

    for (const { label, slug } of schoolSlugsInNav) {
      const exists = await School.findOne({ where: { slug } });
      if (!exists) {
        console.log(`🛡️ Auto-Seeding School Stub: ${label} (${slug})`);
        await School.create({
          name: label,
          slug: slug,
          metaTitle: `${label} | Career Point University`,
          metaDescription: `Explore our ${label} at Career Point University, Kota.`,
          hero: {
            title: { main: label, highlight: '', skyHighlight: '' },
            description: `Welcome to the ${label}. We provide industry-aligned education, research opportunities, and career excellence.`,
            badge: 'Academic Excellence'
          }
        });
      }
    }

    // ==========================================
    // 🔥 STEP 4: Programmes & Academic Catalog
    // ==========================================
    console.log('🎓 Seeding Academic Programmes...');

    // ✅ Programme Settings
    await ProgrammeSettings.create({
      metaTitle: 'Programmes | Career Point University',
      metaDescription: 'Explore all programmes and courses offered at CPU Kota.',
      sidebarCta: {
        icon: 'HelpCircle',
        title: 'Need Guidance?',
        description: 'Talk to our experts for career advice.',
        buttonText: 'Request Callback',
        buttonLink: '#',
      },
    });

    // ✅ Categories & Courses Mapping
    const categoryMap = {};

    for (const [index, type] of programmesData.programmeTypes.entries()) {
      const category = await ProgrammeCategory.create({
        label: type.label,
        order: index + 1,
      });

      categoryMap[type.label] = category.id;

      // Seed Courses for this Category
      const courses = programmesData.courses[type.label] || [];
      for (const course of courses) {
        // Dynamic arrays to Rich Text Lists casting helper
        let programsHtml = '';
        if (Array.isArray(course.programs)) {
          programsHtml =
            `<ul class="list-disc pl-5">` +
            course.programs.map((p) => `<li>${p}</li>`).join('') +
            `</ul>`;
        } else {
          programsHtml = course.programs || '';
        }

        // Color fallback mappings for badge from JSON class names
        const badgeBg = course.badge?.cls?.includes('bg-red')
          ? '#fee2e2'
          : course.badge?.cls?.includes('bg-blue')
            ? '#eff6ff'
            : course.badge?.cls?.includes('bg-teal')
              ? '#f0fdfa'
              : course.badge?.cls?.includes('bg-purple')
                ? '#faf5ff'
                : '#f8f9fa';
        const badgeText = course.badge?.cls?.includes('text-red')
          ? '#dc2626'
          : course.badge?.cls?.includes('text-blue')
            ? '#2563eb'
            : course.badge?.cls?.includes('text-teal')
              ? '#0d9488'
              : course.badge?.cls?.includes('text-purple')
                ? '#9333ea'
                : '#212529';

        await ProgrammeCourse.create({
          title: course.title,
          school: course.school,
          categoryId: category.id,
          icon: course.icon,
          colorHex: course.colorHex,
          iconBg: course.iconBg,
          textColor: course.textColor,
          borderHover: course.borderHover,
          programs: programsHtml,
          detailsSlug: course.id || '#',
          badge: course.badge
            ? { label: course.badge.label, bgHex: badgeBg, textHex: badgeText }
            : null,
        });
      }
    }

    // ✅ Academic Sidebar Quick Links
    let linkOrder = 1;
    for (const link of programmesData.sidebarLinks) {
      await AcademicSidebarLink.create({
        label: link.label,
        icon: link.icon,
        slug: link.slug,
        colorClass: link.colorClass,
        order: linkOrder++,
      });
    }

    // ==========================================
    // ✅ STEP 5: Footer & Navigation
    // ==========================================
    console.log('⭐ Seeding Footer & Navigation...');

    // 1. Navigation Seed
    await Navigation.create({
      documentName: 'main_header',
      data: navigationData,
    });

    // 2. Footer Seed (Mapped to Structured Columns)
    const mappedFooterData = {
      ...footerData,
      columns: [
        {
          title: 'Quick Links',
          columnType: 'links',
          links: footerData.quickLinks?.map((label) => ({ label, url: '#' })) || [],
          order: 1,
        },
        {
          title: 'Programs',
          columnType: 'links',
          links: footerData.programs?.map((label) => ({ label, url: '#' })) || [],
          order: 2,
        },
        {
          title: 'Contact',
          columnType: 'contact',
          links: [],
          order: 3,
        },
      ],
      contact: [
        { label: 'Address', text: footerData.contact?.address, icon: 'MapPin' },
        { label: 'Phone', text: footerData.contact?.phone, icon: 'Phone' },
        { label: 'Email', text: footerData.contact?.email, icon: 'Mail' },
      ],
    };
    delete mappedFooterData.quickLinks;
    delete mappedFooterData.programs;

    await Footer.create(mappedFooterData);

    // ==========================================
    // 🏠 STEP 6: Home Page Content
    // ==========================================
    console.log('🏠 Seeding Home Page Config...');

    await HomePage.create({
      sections: {
        heroConfig: homeData.heroConfig || {},
        statsConfig: homeData.statsConfig || {},
        aboutConfig: homeData.aboutConfig || {},
        programsConfig: homeData.programsConfig || {},
        placementConfig: homeData.placementConfig || {},
        alumniConfig: homeData.alumniConfig || {},
        campusConfig: homeData.campusConfig || {},
        researchConfig: homeData.researchConfig || {},
        happeningsConfig: homeData.happeningsConfig || {},
        testimonialConfig: homeData.testimonialConfig || {},
        faqConfig: homeData.faqConfig || {},
        socialWallConfig: homeData.socialWallConfig || {},
        ctaConfig: homeData.ctaConfig || {},
        virtuallyNewsConfig: homeData.virtuallyNewsConfig || {},
      },
      seo: {
        title: 'Career Point University, Kota | Premier Private University in Rajasthan',
        description:
          'CPU Kota offers world-class education with 25+ years of academic legacy. Industry-aligned programs in Engineering, Management, Law, Pharmacy & more.',
        keywords:
          'University in Kota, CPU Kota, Career Point University, Best Engineering College Rajasthan',
        ogImage: '',
      },
    });

    console.log('✅ Seed Process Finished Successfully');

    return {
      success: true,
      message: '✅ Universal Database Seed Completed Successfully',
    };
  } catch (error) {
    console.error('❌ Universal Seed Error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}
