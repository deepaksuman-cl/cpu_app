'use server';

import { connectToDatabase } from '@/lib/db';
import School from '@/models/School';
import Course from '@/models/Course';
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

export async function seedDatabase() {
  try {
    await connectToDatabase();

    // 1. Clear existing data
    await School.deleteMany({});
    await Course.deleteMany({});

    // 2. Iterate over schoolsData
    for (const [slug, data] of Object.entries(schoolsData)) {
      // Map school data to structured fields with title normalization
      const schoolData = {
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

      const newSchool = await School.create(schoolData);

      // 3. Seed courses for each school
      if (data.courseDetails) {
        for (const [courseSlug, courseData] of Object.entries(data.courseDetails)) {
          const coursePayload = {
            name: courseData.title || courseData.name || courseSlug,
            slug: courseSlug,
            schoolId: newSchool._id,
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
            }
          };

          await Course.create(coursePayload);
        }
      }
    }

    return { success: true, message: 'Database Seeded with normalized structured data!' };
  } catch (error) {
    console.error('Seed Error:', error);
    return { success: false, error: error.message };
  }
}
