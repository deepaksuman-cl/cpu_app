'use server';

import Course from '@/models/Course';
import School from '@/models/School';
import { connectToDatabase } from '@/lib/db';
import fs from 'fs';
import path from 'path';

/**
 * Syncs a course document from the database back to src/data/schoolsData.json
 */
async function syncCourseToSeedFile(course, schoolSlug) {
  try {
    const filePath = path.join(process.cwd(), 'src/data/schoolsData.json');
    if (!fs.existsSync(filePath)) return { success: false, error: 'File not found' };
    
    const fileData = fs.readFileSync(filePath, 'utf8');
    const schoolsData = JSON.parse(fileData);

    if (!schoolsData[schoolSlug]) return { success: false, error: 'School not found' };

    // Map DB fields back to JSON structure
    const jsonCourse = {
      title: course.name,
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
      admissionFee: course.admissionFee,
      scholarships: course.scholarships,
      whyJoin: course.whyJoin,
      uniqueFeatures: course.uniqueFeatures,
      applySteps: course.applySteps,
      faq: course.faq,
      deptSlides: course.exploreDepartment?.slides || [],
      roadmap: {
        sectionTitle: course.roadmap?.sectionTitle,
        subtitle: course.roadmap?.subtitle,
        years: course.roadmap?.years || []
      }
    };

    if (!schoolsData[schoolSlug].courseDetails) schoolsData[schoolSlug].courseDetails = {};
    schoolsData[schoolSlug].courseDetails[course.slug] = jsonCourse;

    fs.writeFileSync(filePath, JSON.stringify(schoolsData, null, 2), 'utf8');
    return { success: true };
  } catch (error) {
    console.error('Sync Error:', error);
    return { success: false, error: error.message };
  }
}

export async function getCourses(schoolId = null) {
  try {
    await connectToDatabase();
    const where = schoolId ? { schoolId } : {};
    const courses = await Course.findAll({
      where,
      include: [{
        model: School,
        as: 'school',
        attributes: ['name', 'slug']
      }],
      order: [['createdAt', 'DESC']]
    });
    
    return { success: true, data: JSON.parse(JSON.stringify(courses)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function getCourseBySlug(slug) {
  try {
    await connectToDatabase();
    const course = await Course.findOne({
      where: { slug },
      include: [{
        model: School,
        as: 'school',
        attributes: ['name', 'slug']
      }]
    });
    
    if (!course) {
      return { success: false, data: null, error: 'Course not found' };
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(course)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function getCourseById(id) {
  try {
    await connectToDatabase();
    const course = await Course.findByPk(id, {
      include: [{
        model: School,
        as: 'school',
        attributes: ['name', 'slug']
      }]
    });
    
    if (!course) {
      return { success: false, data: null, error: 'Course not found' };
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(course)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function createCourse(data) {
  try {
    await connectToDatabase();
    let slug = data.slug;
    if (!slug && data.name) {
      slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    
    const newCourse = await Course.create({ ...data, slug });
    
    // Fetch with school to sync
    const courseWithSchool = await Course.findByPk(newCourse.id, {
      include: [{
        model: School,
        as: 'school',
        attributes: ['name', 'slug']
      }]
    });
    
    // Sync to JSON
    if (courseWithSchool?.school?.slug) {
      await syncCourseToSeedFile(courseWithSchool, courseWithSchool.school.slug);
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(courseWithSchool)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function updateCourse(id, data) {
  try {
    await connectToDatabase();
    // Auto-generate slug if name is updated and slug is missing
    if (data.name && !data.slug) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    await Course.update(data, {
      where: { id }
    });
    
    const updatedCourse = await Course.findByPk(id, {
      include: [{
        model: School,
        as: 'school',
        attributes: ['name', 'slug']
      }]
    });
    
    if (!updatedCourse) {
      return { success: false, data: null, error: 'Course not found' };
    }

    // Sync to JSON
    if (updatedCourse.school?.slug) {
      await syncCourseToSeedFile(updatedCourse, updatedCourse.school.slug);
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(updatedCourse)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function deleteCourse(id) {
  try {
    await connectToDatabase();
    const course = await Course.findByPk(id);
    if (!course) return { success: false, error: 'Course not found' };
    
    await Course.destroy({
      where: { id }
    });
    
    return { success: true, data: JSON.parse(JSON.stringify(course)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}
