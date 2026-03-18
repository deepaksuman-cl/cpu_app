'use server';

import { connectToDatabase } from '@/lib/db';
import Course from '@/models/Course';
import School from '@/models/School'; // Imported to ensure populate() works

// Helper function to safely serialize Mongoose documents for Server Actions
function serializeDocument(doc) {
  return JSON.parse(JSON.stringify(doc));
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
