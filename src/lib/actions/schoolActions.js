'use server';

import School from '@/models/School';
import { connectToDatabase } from '@/lib/db';

export async function getSchools() {
  try {
    await connectToDatabase();
    const schools = await School.findAll({
      attributes: ['id', 'name', 'slug', 'hero', 'metaDescription'],
      order: [['createdAt', 'DESC']]
    });
    
    return { success: true, data: JSON.parse(JSON.stringify(schools)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function getSchoolById(id) {
  try {
    await connectToDatabase();
    const school = await School.findByPk(id);
    
    if (!school) {
      return { success: false, data: null, error: 'School not found' };
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(school)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function getSchoolBySlug(slug) {
  try {
    await connectToDatabase();
    const school = await School.findOne({
      where: { slug }
    });
    
    if (!school) {
      return { success: false, data: null, error: 'School not found' };
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(school)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
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
    
    return { success: true, data: JSON.parse(JSON.stringify(newSchool)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function updateSchool(id, data) {
  try {
    await connectToDatabase();
    // Auto-generate slug if name is updated and slug is missing
    if (data.name && !data.slug) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    await School.update(data, {
      where: { id }
    });
    
    const updatedSchool = await School.findByPk(id);
    
    if (!updatedSchool) {
      return { success: false, data: null, error: 'School not found' };
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(updatedSchool)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function deleteSchool(id) {
  try {
    await connectToDatabase();
    const school = await School.findByPk(id);
    if (!school) return { success: false, error: 'School not found' };

    await School.destroy({
      where: { id }
    });
    
    return { success: true, data: JSON.parse(JSON.stringify(school)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}
