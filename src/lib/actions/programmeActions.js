'use server';

import ProgrammeCategory from '@/models/ProgrammeCategory';
import ProgrammeCourse from '@/models/ProgrammeCourse';
import AcademicSidebarLink from '@/models/AcademicSidebarLink';
import ProgrammeSettings from '@/models/ProgrammeSettings';
import fs from 'fs';
import path from 'path';

/* ═══════════════════════════════════════════════════════════════
   📂 CATEGORY ACTIONS
   ═══════════════════════════════════════════════════════════════ */
export async function getCategories() {
  try {
    const categories = await ProgrammeCategory.findAll({
      order: [['order', 'ASC']]
    });
    return { success: true, data: JSON.parse(JSON.stringify(categories)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function createCategory(data) {
  try {
    const newCategory = await ProgrammeCategory.create(data);
    return { success: true, data: JSON.parse(JSON.stringify(newCategory)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function deleteCategory(id) {
  try {
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
export async function getCourses() {
  try {
    const courses = await ProgrammeCourse.findAll({
      include: [{
        model: ProgrammeCategory,
        as: 'category'
      }]
    });
    return { success: true, data: JSON.parse(JSON.stringify(courses)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function createCourse(data) {
  try {
    const newCourse = await ProgrammeCourse.create(data);
    return { success: true, data: JSON.parse(JSON.stringify(newCourse)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function updateCourse(id, data) {
  try {
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
    const newLink = await AcademicSidebarLink.create(data);
    return { success: true, data: JSON.parse(JSON.stringify(newLink)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function updateSidebarLink(id, data) {
  try {
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
    await ProgrammeSettings.update(data, {
      where: { id }
    });
    const updated = await ProgrammeSettings.findByPk(id);
    return { success: true, data: JSON.parse(JSON.stringify(updated)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}
