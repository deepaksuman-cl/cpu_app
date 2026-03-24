'use server';

import sequelize from '@/lib/db';
import School from '@/models/School';
import Course from '@/models/Course';
import Page from '@/models/Page';
import Footer from '@/models/Footer';
import Navigation from '@/models/Navigation';
import { seedFooterFromJson } from './footerActions';
import { seedProgrammesData } from './programmeActions';
import schoolsData from '@/data/schoolsData.json';

/**
 * Normalizes title data. If a string is provided, converts it to the structured object format.
 */
const ensureStructuredTitle = (title) => {
  if (!title) return { main: '', highlight: '', skyHighlight: '' };
  if (typeof title === 'string') return { main: title, highlight: '', skyHighlight: '' };
  return {
    main: title.main || '',
    highlight: title.highlight || '',
    skyHighlight: title.skyHighlight || ''
  };
};

/**
 * Task 7: Database Cleanup
 * Drops legacy Prisma tables that were created with singular names.
 */
async function cleanupPrismaTables() {
  const prismaTables = [
    'course', 'school', 'footer', 'page', 'navigation', 
    'programmecategory', 'programmecourse', 'academicsidebarlink', 
    'programmesettings', '_prisma_migrations'
  ];
  
  console.log("🧹 Cleaning up old Prisma tables...");
  for (const table of prismaTables) {
    try {
      await sequelize.query(`DROP TABLE IF EXISTS \`${table}\``);
    } catch (err) {
      console.warn(`Could not drop table ${table}:`, err.message);
    }
  }
}

export async function seedDatabase() {
  try {
    console.log("🚀 Starting Database Seed (Sequelize Edition)...");

    // 1. Task 7: Cleanup old Prisma tables
    await cleanupPrismaTables();

    // 2. Task 6: Clear existing data in Sequelize tables
    console.log("🗑️ Clearing existing Sequelize data...");
    // We use destroy with truncate: true or just sync({ force: true }) if we want a total wipe.
    // But truncate: true is safer for 'Sync with alter' mindset.
    // Order matters for child records
    await Course.destroy({ where: {}, truncate: false }); 
    await School.destroy({ where: {}, truncate: false });
    await Page.destroy({ where: {}, truncate: false });
    await Footer.destroy({ where: {}, truncate: false });
    await Navigation.destroy({ where: {}, truncate: false });

    // 3. Seed Schools and Courses from schoolsData.json
    console.log("🌱 Seeding Schools and Courses...");
    for (const [slug, data] of Object.entries(schoolsData)) {
      const schoolPayload = {
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
          quickStats: data.hero?.quickStats
        },
        stats: data.stats || [],
        about: {
          vision: {
            ...data.about?.vision,
            title: ensureStructuredTitle(data.about?.vision?.title)
          },
          mission: {
            ...data.about?.mission,
            title: ensureStructuredTitle(data.about?.mission?.title)
          }
        },
        programmes: {
          ...data.programmes,
          title: ensureStructuredTitle(data.programmes?.title)
        },
        placements: {
          ...data.placements,
          title: ensureStructuredTitle(data.placements?.title)
        },
        alumni: {
          ...data.alumni,
          title: ensureStructuredTitle(data.alumni?.title)
        },
        industry: {
          ...data.industry,
          title: ensureStructuredTitle(data.industry?.title)
        },
        research: {
          ...data.research,
          title: ensureStructuredTitle(data.research?.title)
        },
        community: {
          ...data.community,
          title: ensureStructuredTitle(data.community?.title)
        },
        infrastructure: {
          ...data.infrastructure,
          title: ensureStructuredTitle(data.infrastructure?.title)
        },
        testimonials: {
          ...data.testimonials,
          title: ensureStructuredTitle(data.testimonials?.title)
        },
        exploreDepartment: {
          sectionTitle: ensureStructuredTitle(data.exploreDepartment?.sectionTitle || { main: 'Explore Our Department', highlight: 'Department' }),
          subtitle: data.exploreDepartment?.subtitle || 'Discover our specialized wings',
          items: data.exploreDepartment?.items?.map(item => ({
            ...item,
            slug: item.slug || ''
          })) || []
        }
      };

      const newSchool = await School.create(schoolPayload);

      // Seed courses for each school
      if (data.courseDetails) {
        for (const [courseSlug, courseData] of Object.entries(data.courseDetails)) {
          const coursePayload = {
            name: courseData.title || courseData.name || courseSlug,
            slug: courseSlug,
            schoolId: newSchool.id,
            metaTitle: courseData.metaTitle || '',
            metaDescription: courseData.metaDescription || '',
            title: courseData.title,
            duration: courseData.duration,
            eligibility: courseData.eligibility,
            description: courseData.description,
            hero: {
              ...courseData.hero,
              title: ensureStructuredTitle(courseData.hero?.title)
            },
            accomplishments: courseData.accomplishments,
            overview: {
              ...courseData.overview,
              sectionTitle: ensureStructuredTitle(courseData.overview?.sectionTitle)
            },
            scope: {
              ...courseData.scope,
              sectionTitle: ensureStructuredTitle(courseData.scope?.sectionTitle)
            },
            curriculum: {
              ...courseData.curriculum,
              sectionTitle: ensureStructuredTitle(courseData.curriculum?.sectionTitle)
            },
            admissionFee: {
              ...courseData.admissionFee,
              sectionTitle: ensureStructuredTitle(courseData.admissionFee?.sectionTitle)
            },
            scholarships: {
              ...courseData.scholarships,
              sectionTitle: ensureStructuredTitle(courseData.scholarships?.sectionTitle),
              notes: courseData.scholarships?.notes?.map(note => 
                typeof note === 'string' ? { icon: 'Info', text: note } : note
              ) || []
            },
            whyJoin: {
              ...courseData.whyJoin,
              sectionTitle: ensureStructuredTitle(courseData.whyJoin?.sectionTitle)
            },
            uniqueFeatures: {
              ...courseData.uniqueFeatures,
              sectionTitle: ensureStructuredTitle(courseData.uniqueFeatures?.sectionTitle)
            },
            applySteps: {
              ...courseData.applySteps,
              sectionTitle: ensureStructuredTitle(courseData.applySteps?.sectionTitle)
            },
            faq: {
              ...courseData.faq,
              sectionTitle: ensureStructuredTitle(courseData.faq?.sectionTitle)
            },
            exploreDepartment: {
              sectionTitle: { main: 'Explore Our Department', highlight: 'Department' },
              subtitle: 'Discover what makes our department exceptional',
              slides: courseData.deptSlides || []
            },
            roadmap: {
              sectionTitle: ensureStructuredTitle(courseData.roadmap?.sectionTitle || "4 Year Learning Roadmap"),
              subtitle: courseData.roadmap?.subtitle || "Your journey from foundation to industry expert.",
              years: Array.isArray(courseData.roadmap) ? courseData.roadmap : (courseData.roadmap?.years || [])
            }
          };

          await Course.create(coursePayload);
        }
      }
    }

    // 4. Seed Global Layouts
    console.log("⭐ Seeding Footer and Navigation...");
    await seedFooterFromJson();
    
    // 5. Seed Academic Catalog
    console.log("🎓 Seeding Academic Programmes...");
    await seedProgrammesData();

    return { 
      success: true, 
      message: 'Database Seeded successfully in MariaDB! Legacy tables purged.', 
      data: null 
    };
  } catch (error) {
    console.error('Seed Error:', error);
    return { success: false, error: error.message };
  }
}
