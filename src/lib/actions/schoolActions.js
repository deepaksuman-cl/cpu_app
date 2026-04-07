'use server';

import School from '@/models/School';
import { connectToDatabase } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { cache } from 'react';
import { Testimonial, FAQ, PlacementPartner, Facility } from '@/models/index';

export async function getSchools() {
  try {
    await connectToDatabase();
    const schools = await School.findAll({
      attributes: ['id', 'name', 'slug', 'hero', 'metaDescription', 'createdAt', 'updatedAt'],
      order: [['createdAt', 'DESC']]
    });
    
    const plainSchools = schools.map(s => s.get({ plain: true }));
    return { success: true, data: plainSchools, error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export const getSchoolById = async (id) => {
  try {
    await connectToDatabase();
    
    // 1. PRIMARY FETCH (With all associations)
    try {
      const school = await School.findByPk(id, {
        include: [
          { model: Testimonial, as: 'testimonialsRel' },
          { model: FAQ, as: 'faqsRel' },
          { model: PlacementPartner, as: 'placementPartnersRel' },
          { model: Facility, as: 'facilitiesRel' }
        ]
      });
      
      if (school) {
        return { success: true, data: school.get({ plain: true }), error: null };
      }
    } catch (assocError) {
      console.warn(`[getSchoolById] Relational fetch failed for ID ${id}. Retrying without associations... Error:`, assocError.message);
    }

    // 2. FALLBACK FETCH (Core data only - Prevents 404/Crash)
    const basicSchool = await School.findByPk(id);
    if (!basicSchool) {
      return { success: false, data: null, error: 'School not found' };
    }

    return { 
      success: true, 
      data: { ...basicSchool.get({ plain: true }), _partial: true }, 
      error: 'Loaded partial data due to relational error.' 
    };
  } catch (error) {
    console.error(`[getSchoolById] Critical error fetching school ${id}:`, error);
    return { success: false, data: null, error: error.message };
  }
};

export const getSchoolBySlug = async (slug) => {
  try {
    await connectToDatabase();
    
    // Normalize slug: trim whitespace and slashes
    const normalizedSlug = (slug || '').replace(/^\/|\/$/g, '').trim();

    // 1. PRIMARY FETCH (With all associations)
    try {
      const school = await School.findOne({
        where: { slug: normalizedSlug },
        include: [
          { model: Testimonial, as: 'testimonialsRel' },
          { model: FAQ, as: 'faqsRel' },
          { model: PlacementPartner, as: 'placementPartnersRel' },
          { model: Facility, as: 'facilitiesRel' }
        ]
      });
      
      if (school) {
        return { success: true, data: school.get({ plain: true }), error: null };
      }
    } catch (assocError) {
      console.warn(`[getSchoolBySlug] Relational fetch failed for slug '${normalizedSlug}'. Retrying without associations... Error:`, assocError.message);
    }

    // 2. FALLBACK FETCH (Core data only - Prevents 404/Crash)
    const basicSchool = await School.findOne({ where: { slug: normalizedSlug } });
    if (!basicSchool) {
      console.warn(`[getSchoolBySlug] No school found for normalized slug: ${normalizedSlug}`);
      return { success: false, data: null, error: 'School not found' };
    }

    return { 
      success: true, 
      data: { ...basicSchool.get({ plain: true }), _partial: true }, 
      error: 'Loaded partial data due to relational error.' 
    };
  } catch (error) {
    console.error(`[getSchoolBySlug] Critical error for slug '${slug}':`, error);
    return { success: false, data: null, error: error.message };
  }
};

export async function createSchool(data) {
  try {
    await connectToDatabase();
    let slug = data.slug;
    if (!slug && data.name) {
      slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    
    const newSchool = await School.create({ ...data, slug });
    
    // Sync Relational Tables (One-way sync from JSON to Relational on Save)
    if (data.testimonials?.list) {
      for (const item of data.testimonials.list) {
        await Testimonial.create({
          studentName: item.name, reviewText: item.text || '', rating: item.rating || 5,
          image: item.photo || item.img || null, company: item.company || null,
          batch: item.batch || null, course: item.course || null, package: item.package || null,
          tag: item.tag || null, tagColor: item.tagColor || null, schoolId: newSchool.id
        });
      }
    }
    if (data.placements?.list) {
      for (const item of data.placements.list) {
        await PlacementPartner.create({
          companyName: item.company, logoUrl: item.image || item.img || '',
          packageOffered: item.package || null, studentName: item.name || null,
          courseName: item.course || null, city: item.city || null, schoolId: newSchool.id,
          youtubeLink: item.youtubeLink || null,
          designation: item.designation || null,
          classOf: item.classOf || null
        });
      }
    }
    if (data.infrastructure?.list) {
      for (const item of data.infrastructure.list) {
        await Facility.create({
          name: item.title, description: item.desc || '', image: item.image || item.img || null, schoolId: newSchool.id
        });
      }
    }

    revalidatePath('/', 'layout');
    revalidatePath('/admin/schools');
    revalidatePath('/schools');
    revalidatePath(`/schools/${newSchool.slug}`);
    return { success: true, data: newSchool.get({ plain: true }), error: null };
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

    // Relational Sync (Hardened): Clear and Re-insert
    if (data.testimonials?.list) {
      await Testimonial.destroy({ where: { schoolId: id } });
      for (const item of data.testimonials.list) {
        await Testimonial.create({
          studentName: item.name, reviewText: item.text || '', rating: item.rating || 5,
          image: item.photo || item.img || null, company: item.company || null,
          batch: item.batch || null, course: item.course || null, package: item.package || null,
          tag: item.tag || null, tagColor: item.tagColor || null, schoolId: id
        });
      }
    }
    if (data.placements?.list) {
      await PlacementPartner.destroy({ where: { schoolId: id } });
      for (const item of data.placements.list) {
        await PlacementPartner.create({
          companyName: item.company, logoUrl: item.image || item.img || '',
          packageOffered: item.package || null, studentName: item.name || null,
          courseName: item.course || null, city: item.city || null, schoolId: id,
          youtubeLink: item.youtubeLink || null,
          designation: item.designation || null,
          classOf: item.classOf || null
        });
      }
    }
    if (data.infrastructure?.list) {
      await Facility.destroy({ where: { schoolId: id } });
      for (const item of data.infrastructure.list) {
        await Facility.create({
          name: item.title, description: item.desc || '', image: item.image || item.img || null, schoolId: id
        });
      }
    }
    
    const updatedSchool = await School.findByPk(id, {
      include: [
        { model: Testimonial, as: 'testimonialsRel' },
        { model: FAQ, as: 'faqsRel' },
        { model: PlacementPartner, as: 'placementPartnersRel' },
        { model: Facility, as: 'facilitiesRel' }
      ]
    });
    
    if (!updatedSchool) {
      return { success: false, data: null, error: 'School not found' };
    }
    
    revalidatePath('/', 'layout');
    revalidatePath('/admin/schools');
    revalidatePath('/schools');
    revalidatePath(`/schools/${updatedSchool.slug}`);
    return { success: true, data: updatedSchool.get({ plain: true }), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function deleteSchool(id) {
  try {
    await connectToDatabase();
    const school = await School.findByPk(id);
    if (!school) return { success: false, message: 'School not found' };

    await School.destroy({
      where: { id }
    });
    
    revalidatePath('/', 'layout');
    revalidatePath('/admin/schools');
    revalidatePath('/schools');
    return { success: true, message: 'School deleted successfully', data: school.get({ plain: true }) };
  } catch (error) {
    console.error(`[deleteSchool] Error:`, error);
    return { success: false, message: error.message || 'Deletion failed due to database constraint.' };
  }
}
