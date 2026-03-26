'use server';

import ProgrammeCategory from '@/models/ProgrammeCategory';
import ProgrammeCourse from '@/models/ProgrammeCourse';
import AcademicSidebarLink from '@/models/AcademicSidebarLink';
import ProgrammeSettings from '@/models/ProgrammeSettings';
import { connectToDatabase } from '@/lib/db';
import fs from 'fs';
import path from 'path';

/* ═══════════════════════════════════════════════════════════════
   📂 CATEGORY ACTIONS
   ═══════════════════════════════════════════════════════════════ */
export async function getCategories() {
  try {
    await connectToDatabase();
    const categories = await ProgrammeCategory.findAll({
      attributes: ['id', 'label', 'order'],
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
    return { success: true, data: JSON.parse(JSON.stringify(newCategory)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function deleteCategory(id) {
  try {
    await connectToDatabase();
    await ProgrammeCategory.destroy({
      where: { id }
    });
    return { success: true, error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
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
      attributes: ['id', 'title', 'school', 'categoryId', 'icon', 'colorHex', 'iconBg', 'textColor', 'borderHover', 'programs', 'detailsSlug', 'badge'],
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
    return { success: true, data: JSON.parse(JSON.stringify(updated)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function deleteCourse(id) {
  try {
    await connectToDatabase();
    await ProgrammeCourse.destroy({
      where: { id }
    });
    return { success: true, error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
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
    return { success: true, data: JSON.parse(JSON.stringify(updated)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function deleteSidebarLink(id) {
  try {
    await connectToDatabase();
    await AcademicSidebarLink.destroy({
      where: { id }
    });
    return { success: true, error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
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
    return { success: true, data: JSON.parse(JSON.stringify(updated)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}
