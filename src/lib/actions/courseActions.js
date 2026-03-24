'use server';

import { connectToDatabase } from '@/lib/db';
import Course from '@/models/Course';
import School from '@/models/School'; // Imported to ensure populate() works
import fs from 'fs';
import path from 'path';

// Helper function to safely serialize Mongoose documents for Server Actions
function serializeDocument(doc) {
  return JSON.parse(JSON.stringify(doc));
}

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

// Formats a course document by converting ObjectIds to strings
function formatCourse(course) {
  if (!course) return null;
  
  const formatted = { ...course, _id: course._id.toString() };
  
  // Safely stringify populated or unpopulated schoolId
  if (formatted.schoolId) {
    if (typeof formatted.schoolId === 'object' && formatted.schoolId._id) {
      formatted.schoolId = {
        ...formatted.schoolId,
        _id: formatted.schoolId._id.toString()
      };
    } else {
      formatted.schoolId = formatted.schoolId.toString();
    }
  }
  
  return formatted;
}

export async function getCourses(schoolId = null) {
  try {
    await connectToDatabase();
    
    const query = schoolId ? { schoolId } : {};
    const courses = await Course.find(query)
      .populate('schoolId', 'name slug')
      .sort({ createdAt: -1 })
      .lean();
    
    // Explicitly convert _id and populated ObjectIds to strings
    const formattedCourses = courses.map(formatCourse);
    
    return { success: true, data: serializeDocument(formattedCourses) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getCourseBySlug(slug) {
  try {
    await connectToDatabase();
    
    const course = await Course.findOne({ slug })
      .populate('schoolId', 'name slug')
      .lean();
    
    if (!course) {
      return { success: false, error: 'Course not found' };
    }
    
    return { success: true, data: serializeDocument(formatCourse(course)) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getCourseById(id) {
  try {
    await connectToDatabase();
    
    const course = await Course.findById(id)
      .populate('schoolId', 'name slug')
      .lean();
    
    if (!course) {
      return { success: false, error: 'Course not found' };
    }
    
    return { success: true, data: serializeDocument(formatCourse(course)) };
  } catch (error) {
    return { success: false, error: error.message };
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
    await newCourse.populate('schoolId', 'name slug');
    
    // Sync to JSON
    if (newCourse.schoolId?.slug) {
      await syncCourseToSeedFile(newCourse.toObject(), newCourse.schoolId.slug);
    }
    
    return { success: true, data: serializeDocument(formatCourse(newCourse.toObject())) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateCourse(id, data) {
  try {
    await connectToDatabase();
    
    // Auto-generate slug if name is updated and slug is missing
    if (data.name && !data.slug) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .populate('schoolId', 'name slug')
      .lean();
    
    if (!updatedCourse) {
      return { success: false, error: 'Course not found' };
    }

    // Sync to JSON
    if (updatedCourse.schoolId?.slug) {
      await syncCourseToSeedFile(updatedCourse, updatedCourse.schoolId.slug);
    }
    
    return { success: true, data: serializeDocument(formatCourse(updatedCourse)) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteCourse(id) {
  try {
    await connectToDatabase();
    
    const deletedCourse = await Course.findByIdAndDelete(id).lean();
    
    if (!deletedCourse) {
      return { success: false, error: 'Course not found' };
    }
    
    return { success: true, data: serializeDocument(formatCourse(deletedCourse)) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
