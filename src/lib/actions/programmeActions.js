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

/* ═══════════════════════════════════════════════════════════════
   🌱 SEED FROM JSON
   ═══════════════════════════════════════════════════════════════ */
export async function seedProgrammesData() {
  try {
    // Clear existing
    await ProgrammeCourse.destroy({ where: {}, truncate: false });
    await ProgrammeCategory.destroy({ where: {}, truncate: false });
    await AcademicSidebarLink.destroy({ where: {}, truncate: false });
    await ProgrammeSettings.destroy({ where: {}, truncate: false });
    
    // Create Default Settings
    await ProgrammeSettings.create({});
    
    // Read JSON
    const filePath = path.join(process.cwd(), 'src/data/programmes.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Insert Categories
    let orderNum = 1;
    for (const type of jsonData.programmeTypes) {
      const cat = await ProgrammeCategory.create({ 
        label: type.label, order: orderNum++ 
      });
      
      // Insert courses for this category
      const courses = jsonData.courses[type.label] || [];
      for (const course of courses) {
        
        // Dynamic arrays to Rich Text Lists casting helper
        let programsHtml = "";
        if (Array.isArray(course.programs)) {
          programsHtml = `<ul class="list-disc pl-5">` + course.programs.map(p => `<li>${p}</li>`).join('') + `</ul>`;
        } else {
          programsHtml = course.programs; // fallback
        }

        // Color fallback mappings
        const badgeBg = course.badge?.cls ? (course.badge.cls.includes('bg-red') ? '#fee2e2' : course.badge.cls.includes('bg-blue') ? '#eff6ff' : course.badge.cls.includes('bg-teal') ? '#f0fdfa' : course.badge.cls.includes('bg-purple') ? '#faf5ff' : '#f3f4f6') : '#f8f9fa';
        const badgeText = course.badge?.cls ? (course.badge.cls.includes('text-red') ? '#dc2626' : course.badge.cls.includes('text-blue') ? '#2563eb' : course.badge.cls.includes('text-teal') ? '#0d9488' : course.badge.cls.includes('text-purple') ? '#9333ea' : '#374151') : '#212529';

        await ProgrammeCourse.create({
          title: course.title,
          school: course.school,
          categoryId: cat.id,
          icon: course.icon,
          colorHex: course.colorHex,
          iconBg: course.iconBg,
          textColor: course.textColor,
          borderHover: course.borderHover,
          programs: programsHtml,
          detailsSlug: course.id || '#',
          badge: course.badge ? { label: course.badge.label, bgHex: badgeBg, textHex: badgeText } : null
        });
      }
    }
    
    // Insert Links
    let linkOrder = 1;
    for (const link of jsonData.sidebarLinks) {
      await AcademicSidebarLink.create({
        label: link.label,
        icon: link.icon,
        slug: link.slug,
        colorClass: link.colorClass,
        order: linkOrder++
      });
    }

    return { success: true, message: "Data seeded successfully!", error: null };
  } catch (error) {
    console.error("Seed error:", error);
    return { success: false, data: null, error: error.message };
  }
}