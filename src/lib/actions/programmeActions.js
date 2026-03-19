'use server';

import { connectToDatabase } from '@/lib/db';
import ProgrammeCategory from '@/models/ProgrammeCategory';
import ProgrammeCourse from '@/models/ProgrammeCourse';
import AcademicSidebarLink from '@/models/AcademicSidebarLink';
import ProgrammeSettings from '@/models/ProgrammeSettings';
import fs from 'fs';
import path from 'path';

// Helper function to serialize MongoDB objects to plain JSON
const serialize = (doc) => JSON.parse(JSON.stringify(doc));

/* ═══════════════════════════════════════════════════════════════
   📂 CATEGORY ACTIONS
═══════════════════════════════════════════════════════════════ */
export async function getCategories() {
  try {
    await connectToDatabase();
    const categories = await ProgrammeCategory.find().sort({ order: 1 });
    return { success: true, data: serialize(categories) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function createCategory(data) {
  try {
    await connectToDatabase();
    const newCategory = await ProgrammeCategory.create(data);
    return { success: true, data: serialize(newCategory) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteCategory(id) {
  try {
    await connectToDatabase();
    // Also delete courses linked to this category to keep DB clean
    await ProgrammeCourse.deleteMany({ categoryId: id });
    await ProgrammeCategory.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/* ═══════════════════════════════════════════════════════════════
   🎓 COURSE ACTIONS
═══════════════════════════════════════════════════════════════ */
export async function getCourses() {
  try {
    await connectToDatabase();
    // Populate se hume Category ka naam bhi mil jayega ID ke sath
    const courses = await ProgrammeCourse.find().populate('categoryId');
    return { success: true, data: serialize(courses) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function createCourse(data) {
  try {
    await connectToDatabase();
    const newCourse = await ProgrammeCourse.create(data);
    return { success: true, data: serialize(newCourse) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateCourse(id, data) {
  try {
    await connectToDatabase();
    const updated = await ProgrammeCourse.findByIdAndUpdate(id, data, { new: true });
    return { success: true, data: serialize(updated) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteCourse(id) {
  try {
    await connectToDatabase();
    await ProgrammeCourse.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/* ═══════════════════════════════════════════════════════════════
   🔗 SIDEBAR LINKS ACTIONS
═══════════════════════════════════════════════════════════════ */
export async function getSidebarLinks() {
  try {
    await connectToDatabase();
    const links = await AcademicSidebarLink.find().sort({ order: 1 });
    return { success: true, data: serialize(links) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function createSidebarLink(data) {
  try {
    await connectToDatabase();
    const newLink = await AcademicSidebarLink.create(data);
    return { success: true, data: serialize(newLink) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateSidebarLink(id, data) {
  try {
    await connectToDatabase();
    const updated = await AcademicSidebarLink.findByIdAndUpdate(id, data, { new: true });
    return { success: true, data: serialize(updated) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteSidebarLink(id) {
  try {
    await connectToDatabase();
    await AcademicSidebarLink.findByIdAndDelete(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/* ═══════════════════════════════════════════════════════════════
   ⚙️ SETTINGS ACTIONS
═══════════════════════════════════════════════════════════════ */
export async function getProgrammeSettings() {
  try {
    await connectToDatabase();
    // Assuming we only keep exactly ONE settings document
    let settings = await ProgrammeSettings.findOne();
    if (!settings) {
      settings = await ProgrammeSettings.create({}); // Generate default if missing
    }
    return { success: true, data: serialize(settings) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function updateProgrammeSettings(id, data) {
  try {
    await connectToDatabase();
    const updated = await ProgrammeSettings.findByIdAndUpdate(id, data, { new: true, upsert: true });
    return { success: true, data: serialize(updated) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/* ═══════════════════════════════════════════════════════════════
   🌱 SEED FROM JSON
═══════════════════════════════════════════════════════════════ */
export async function seedProgrammesData() {
  try {
    await connectToDatabase();
    
    // Clear existing
    await ProgrammeCategory.deleteMany({});
    await ProgrammeCourse.deleteMany({});
    await AcademicSidebarLink.deleteMany({});
    await ProgrammeSettings.deleteMany({});
    
    // Create Default Settings block
    await ProgrammeSettings.create({});
    
    // Read JSON
    const filePath = path.join(process.cwd(), 'src/data/programmes.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Insert Categories
    let order = 1;
    for (const type of jsonData.programmeTypes) {
      const cat = await ProgrammeCategory.create({ label: type.label, order: order++ });
      
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
          categoryId: cat._id,
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

    return { success: true, message: "Data seeded successfully!" };
  } catch (error) {
    console.error("Seed error:", error);
    return { success: false, error: error.message };
  }
}