'use server';

import School from '@/models/School';

export async function getSchools() {
  try {
    const schools = await School.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    return { success: true, data: JSON.parse(JSON.stringify(schools)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function getSchoolById(id) {
  try {
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
