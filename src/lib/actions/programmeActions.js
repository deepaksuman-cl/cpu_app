'use server';

import ProgrammeCategory from '@/models/ProgrammeCategory';
import ProgrammeCourse from '@/models/ProgrammeCourse';
import AcademicSidebarLink from '@/models/AcademicSidebarLink';
import ProgrammeSettings from '@/models/ProgrammeSettings';
import { connectToDatabase } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

/* ═══════════════════════════════════════════════════════════════
   📂 CATEGORY ACTIONS
   ═══════════════════════════════════════════════════════════════ */
export async function getCategories() {
  try {
    await connectToDatabase();
    const categories = await ProgrammeCategory.findAll({
      attributes: ['id', 'label', 'order', 'createdAt', 'updatedAt'],
      order: [['order', 'ASC']]
    });
    return { success: true, data: JSON.parse(JSON.stringify(categories)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function createCategory(data) {
  try {
    await connectToDatabase();
    const newCategory = await ProgrammeCategory.create(data);
    revalidatePath('/', 'layout');
    return { success: true, data: JSON.parse(JSON.stringify(newCategory)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function deleteCategory(id) {
  try {
    await connectToDatabase();
    const category = await ProgrammeCategory.findByPk(id);
    if (!category) return { success: false, message: 'Category not found' };

    await ProgrammeCategory.destroy({
      where: { id }
    });
    revalidatePath('/', 'layout');
    return { success: true, message: 'Category deleted successfully' };
  } catch (error) {
    console.error(`[deleteCategory] Error:`, error);
    return { success: false, message: error.message || 'Deletion failed due to database constraint.' };
  }
}

/* ═══════════════════════════════════════════════════════════════
   🎓 COURSE ACTIONS
   ═══════════════════════════════════════════════════════════════ */
export async function getCourses(options = {}) {
  try {
    await connectToDatabase();
    const { categoryId, search } = options;
    const where = {};
    
    if (categoryId && categoryId !== 'all') {
      where.categoryId = categoryId;
    }
    
    if (search) {
      const { Op } = require('sequelize');
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { school: { [Op.like]: `%${search}%` } },
        { programs: { [Op.like]: `%${search}%` } }
      ];
    }

    const courses = await ProgrammeCourse.findAll({
      where,
      attributes: ['id', 'title', 'school', 'categoryId', 'icon', 'colorHex', 'iconBg', 'textColor', 'borderHover', 'programs', 'detailsSlug', 'badge', 'createdAt', 'updatedAt'],
      include: [{
        model: ProgrammeCategory,
        as: 'category',
        attributes: ['id', 'label']
      }]
    });
    return { success: true, data: JSON.parse(JSON.stringify(courses)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function createCourse(data) {
  try {
    await connectToDatabase();
    const newCourse = await ProgrammeCourse.create(data);
    revalidatePath('/', 'layout');
    return { success: true, data: JSON.parse(JSON.stringify(newCourse)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function updateCourse(id, data) {
  try {
    await connectToDatabase();
    await ProgrammeCourse.update(data, {
      where: { id }
    });
    const updated = await ProgrammeCourse.findByPk(id);
    revalidatePath('/', 'layout');
    return { success: true, data: JSON.parse(JSON.stringify(updated)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function deleteCourse(id) {
  try {
    await connectToDatabase();
    const course = await ProgrammeCourse.findByPk(id);
    if (!course) return { success: false, message: 'Course not found' };

    await ProgrammeCourse.destroy({
      where: { id }
    });
    revalidatePath('/', 'layout');
    return { success: true, message: 'Course deleted successfully' };
  } catch (error) {
    console.error(`[deleteCourse] Error:`, error);
    return { success: false, message: error.message || 'Deletion failed due to database constraint.' };
  }
}

/* ═══════════════════════════════════════════════════════════════
   🔗 SIDEBAR LINKS ACTIONS
   ═══════════════════════════════════════════════════════════════ */
export async function getSidebarLinks() {
  try {
    await connectToDatabase();
    const links = await AcademicSidebarLink.findAll({
      order: [['order', 'ASC']]
    });
    return { success: true, data: JSON.parse(JSON.stringify(links)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function createSidebarLink(data) {
  try {
    await connectToDatabase();
    const newLink = await AcademicSidebarLink.create(data);
    revalidatePath('/', 'layout');
    return { success: true, data: JSON.parse(JSON.stringify(newLink)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function updateSidebarLink(id, data) {
  try {
    await connectToDatabase();
    await AcademicSidebarLink.update(data, {
      where: { id }
    });
    const updated = await AcademicSidebarLink.findByPk(id);
    revalidatePath('/', 'layout');
    return { success: true, data: JSON.parse(JSON.stringify(updated)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function deleteSidebarLink(id) {
  try {
    await connectToDatabase();
    const link = await AcademicSidebarLink.findByPk(id);
    if (!link) return { success: false, message: 'Link not found' };

    await AcademicSidebarLink.destroy({
      where: { id }
    });
    revalidatePath('/', 'layout');
    return { success: true, message: 'Link deleted successfully' };
  } catch (error) {
    console.error(`[deleteSidebarLink] Error:`, error);
    return { success: false, message: error.message || 'Deletion failed due to database constraint.' };
  }
}

/* ═══════════════════════════════════════════════════════════════
   ⚙️ SETTINGS ACTIONS
   ═══════════════════════════════════════════════════════════════ */
export async function getProgrammeSettings() {
  try {
    await connectToDatabase();
    let settings = await ProgrammeSettings.findOne();
    if (!settings) {
      settings = await ProgrammeSettings.create({});
    }
    return { success: true, data: JSON.parse(JSON.stringify(settings)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function updateProgrammeSettings(id, data) {
  try {
    await connectToDatabase();
    await ProgrammeSettings.update(data, {
      where: { id }
    });
    const updated = await ProgrammeSettings.findByPk(id);
    revalidatePath('/', 'layout');
    return { success: true, data: JSON.parse(JSON.stringify(updated)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}
