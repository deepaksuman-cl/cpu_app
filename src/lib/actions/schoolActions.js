'use server';

import { connectToDatabase } from '@/lib/db';
import School from '@/models/School';

// Helper function to safely serialize Mongoose documents for Server Actions
function serializeDocument(doc) {
  return JSON.parse(JSON.stringify(doc));
}

export async function getSchools() {
  try {
    await connectToDatabase();
    const schools = await School.find({}).sort({ createdAt: -1 }).lean();
    
    // Explicitly convert _id to string as requested
    const formattedSchools = schools.map(school => ({
      ...school,
      _id: school._id.toString(),
    }));
    
    return { success: true, data: serializeDocument(formattedSchools) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getSchoolById(id) {
  try {
    await connectToDatabase();
    const school = await School.findById(id).lean();
    
    if (!school) {
      return { success: false, error: 'School not found' };
    }
    
    const formattedSchool = {
      ...school,
      _id: school._id.toString(),
    };
    
    return { success: true, data: serializeDocument(formattedSchool) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getSchoolBySlug(slug) {
  try {
    await connectToDatabase();
    const school = await School.findOne({ slug }).lean();
    
    if (!school) {
      return { success: false, error: 'School not found' };
    }
    
    const formattedSchool = {
      ...school,
      _id: school._id.toString(),
    };
    
    return { success: true, data: serializeDocument(formattedSchool) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function createSchool(data) {
  try {
    await connectToDatabase();
    
    let slug = data.slug;
    if (!slug && data.name) {
      slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    
    const newSchool = await School.create({ ...data, slug });
    
    const formattedSchool = {
      ...newSchool.toObject(),
      _id: newSchool._id.toString(),
    };
    
    return { success: true, data: serializeDocument(formattedSchool) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateSchool(id, data) {
  try {
    await connectToDatabase();
    
    // Auto-generate slug if name is updated and slug is missing
    if (data.name && !data.slug) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const updatedSchool = await School.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    
    if (!updatedSchool) {
      return { success: false, error: 'School not found' };
    }
    
    const formattedSchool = {
      ...updatedSchool,
      _id: updatedSchool._id.toString(),
    };
    
    return { success: true, data: serializeDocument(formattedSchool) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteSchool(id) {
  try {
    await connectToDatabase();
    
    const deletedSchool = await School.findByIdAndDelete(id).lean();
    
    if (!deletedSchool) {
      return { success: false, error: 'School not found' };
    }
    
    const formattedSchool = {
      ...deletedSchool,
      _id: deletedSchool._id.toString(),
    };
    
    return { success: true, data: serializeDocument(formattedSchool) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
