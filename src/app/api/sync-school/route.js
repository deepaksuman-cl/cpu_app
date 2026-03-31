import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import sequelize from '@/lib/db'; // Tumhara Sequelize connection path (Update if needed)
import School from '@/models/School'; // Tumhara School model path
import Course from '@/models/Course'; // Tumhara Course model path

export async function POST(req) {
  try {
    // 1. Frontend se 'slug' receive karo
    const body = await req.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({ success: false, message: "School slug is required!" }, { status: 400 });
    }

    // 2. Dynamic JSON file ka path banao (Local & Server dono pe chalega process.cwd() se)
    const jsonPath = path.join(process.cwd(), 'src', 'data', `${slug}.json`);

    // Check karo file exist karti hai ya nahi
    if (!fs.existsSync(jsonPath)) {
      return NextResponse.json({ 
        success: false, 
        message: `File ${slug}.json not found in 'src/data' folder! Please create it first.` 
      }, { status: 404 });
    }

    // 3. JSON data read karo
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const parsedData = JSON.parse(rawData);
    
    // JSON ke andar root key slug honi chahiye (jaise "arts-and-humanities": { ... })
    const schoolData = parsedData[slug]; 

    if (!schoolData) {
      return NextResponse.json({ success: false, message: `Root key '${slug}' missing in JSON file.` }, { status: 400 });
    }

    // 4. Transaction Start karo
    const t = await sequelize.transaction();

    try {
      // 5. School Data Prepare karo (Exclude courseDetails)
      const schoolPayload = {
        name: schoolData.name || schoolData.title?.main, // Fallback if name is missing
        slug: schoolData.slug,
        metaTitle: schoolData.metaTitle,
        metaDescription: schoolData.metaDescription,
        breadcrumb: schoolData.breadcrumb,
        hero: schoolData.hero,
        stats: schoolData.stats,
        about: schoolData.about,
        programmes: schoolData.programmes,
        placements: schoolData.placements,
        alumni: schoolData.alumni,
        industry: schoolData.industry,
        research: schoolData.research,
        community: schoolData.community,
        infrastructure: schoolData.infrastructure,
        testimonials: schoolData.testimonials,
        exploreDepartment: schoolData.exploreDepartment,
        status: 'published'
      };

      // 6. School Upsert (Create or Update)
      let school = await School.findOne({ where: { slug }, transaction: t });
      if (school) {
        await school.update(schoolPayload, { transaction: t });
      } else {
        school = await School.create(schoolPayload, { transaction: t });
      }

      // 7. Purane courses delete karo is school ke (Duplicate rokne ke liye)
      await Course.destroy({ 
        where: { schoolId: school.id }, 
        transaction: t 
      });

      // 8. Naye courses array me daalo
      const coursesToInsert = [];
      const details = schoolData.courseDetails;

      if (details) {
        for (const courseSlug in details) {
          const course = details[courseSlug];
          coursesToInsert.push({
            schoolId: school.id,
            slug: courseSlug,
            name: course.name || course.title,
            title: course.title,
            duration: course.duration,
            eligibility: course.eligibility,
            description: course.description,
            metaTitle: course.metaTitle,
            metaDescription: course.metaDescription,
            hero: course.hero,
            accomplishments: course.accomplishments,
            overview: course.overview,
            scope: course.scope,
            curriculum: course.curriculum,
            roadmap: course.roadmap,
            admissionFee: course.admissionFee,
            scholarships: course.scholarships,
            whyJoin: course.whyJoin,
            uniqueFeatures: course.uniqueFeatures,
            applySteps: course.applySteps,
            faq: course.faq,
            deptSlides: course.deptSlides,
            placements: course.placements || schoolData.placements, // Agar course me na ho toh school ka daal do
            industry: course.industry || schoolData.industry,
            testimonials: course.testimonials,
            status: 'published'
          });
        }
      }

      // 9. Bulk Insert Courses
      if (coursesToInsert.length > 0) {
        await Course.bulkCreate(coursesToInsert, { transaction: t });
      }

      await t.commit();
      return NextResponse.json({ success: true, message: `'${slug}' Synced Successfully!` });

    } catch (dbError) {
      await t.rollback();
      console.error("DB Error:", dbError);
      return NextResponse.json({ success: false, message: "Database Error: " + dbError.message }, { status: 500 });
    }

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ success: false, message: "Server Error: " + error.message }, { status: 500 });
  }
}