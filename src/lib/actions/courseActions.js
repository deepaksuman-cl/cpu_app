'use server';

import { connectToDatabase } from '@/lib/db';
import Course from '@/models/Course';
import { FAQ, Testimonial } from '@/models/index';
import School from '@/models/School';
import { revalidatePath } from 'next/cache';
import { cache } from 'react';



export async function getCourses(schoolId = null) {
  try {
    console.log('[getCourses] Connecting to database...');
    await connectToDatabase();
    
    const where = schoolId ? { schoolId } : {};
    console.log(`[getCourses] Fetching courses with where: ${JSON.stringify(where)}`);
    
    const courses = await Course.findAll({
      where,
      include: [{
        model: School,
        as: 'school',
        attributes: ['name', 'slug']
      }],
      order: [['createdAt', 'DESC']]
    });
    
    console.log(`[getCourses] Successfully fetched ${courses?.length || 0} courses.`);
    
    // Defensive mapping to plain objects to avoid serialization issues
    const plainCourses = courses.map(c => {
      try {
        return c.get({ plain: true });
      } catch (mapError) {
        console.error(`[getCourses] Error mapping course ID ${c.id}:`, mapError);
        // Fallback: minimal data if full mapping fails due to JSON/Charset issues
        return { 
          id: c.id, 
          name: c.name || 'Unknown Course', 
          slug: c.slug || 'unknown',
          school: c.school ? { name: c.school.name, slug: c.school.slug } : null
        };
      }
    });

    return { success: true, data: plainCourses, error: null };
  } catch (error) {
    console.error('[getCourses] Critical error:', error);
    return { success: false, data: null, error: error.message || 'Unknown Server Error' };
  }
}

export const getCourseBySlug = cache(async (slug) => {
  try {
    await connectToDatabase();
    const course = await Course.findOne({
      where: { slug },
      include: [
        {
          model: School,
          as: 'school',
          attributes: ['name', 'slug']
        },
        { model: Testimonial, as: 'testimonialsRel' },
        { model: FAQ, as: 'faqsRel' }
      ]
    });
    
    if (!course) {
      return { success: false, data: null, error: 'Course not found' };
    }
    
    return { success: true, data: course.get({ plain: true }), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
});

export const getCourseById = cache(async (id) => {
  try {
    await connectToDatabase();
    const course = await Course.findByPk(id, {
      include: [
        {
          model: School,
          as: 'school',
          attributes: ['name', 'slug']
        },
        { model: Testimonial, as: 'testimonialsRel' },
        { model: FAQ, as: 'faqsRel' }
      ]
    });
    
    if (!course) {
      console.warn(`[getCourseById] Course with ID ${id} not found.`);
      return { success: false, data: null, error: 'Course not found' };
    }
    
    return { success: true, data: course.get({ plain: true }), error: null };
  } catch (error) {
    console.error(`[getCourseById] Error fetching course ${id}:`, error);
    return { success: false, data: null, error: error.message };
  }
});

export async function createCourse(data) {
  try {
    await connectToDatabase();
    let slug = data.slug;
    if (!slug && data.name) {
      slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    
    
    console.log(`[createCourse] Initializing course creation for: ${data.name} (Type: ${data.courseType || 'regular'})`);
    const newCourse = await Course.create({ ...data, slug });
    
    // Sync Relational Tables
    if (data.faq?.items) {
      for (const item of data.faq.items) {
        await FAQ.create({
          question: item.q, answer: item.a || '', courseId: newCourse.id
        });
      }
    }
    // Course testimonials if any in JSON
    if (data.testimonials?.list) {
       for (const item of data.testimonials.list) {
        await Testimonial.create({
          studentName: item.name, reviewText: item.text || '', rating: item.rating || 5,
          image: item.photo || item.img || null, company: item.company || null,
          batch: item.batch || null, course: item.course || null, package: item.package || null,
          tag: item.tag || null, tagColor: item.tagColor || null, courseId: newCourse.id
        });
      }
    }

    // Global Revalidation
    revalidatePath('/', 'layout');
    
    return { success: true, data: newCourse.get({ plain: true }), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function updateCourse(id, data) {
  try {
    await connectToDatabase();
    // Auto-generate slug if name is updated and slug is missing
    if (data.name && !data.slug) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    
    console.log(`[updateCourse] Updating course ID: ${id} (Type: ${data.courseType || 'N/A'})`);
    await Course.update(data, {
      where: { id }
    });

    // Sync Relational Tables: Clear and Re-insert
    if (data.faq?.items) {
      await FAQ.destroy({ where: { courseId: id } });
      for (const item of data.faq.items) {
        await FAQ.create({
          question: item.q, answer: item.a || '', courseId: id
        });
      }
    }
    if (data.testimonials?.list) {
      await Testimonial.destroy({ where: { courseId: id } });
       for (const item of data.testimonials.list) {
        await Testimonial.create({
          studentName: item.name, reviewText: item.text || '', rating: item.rating || 5,
          image: item.photo || item.img || null, company: item.company || null,
          batch: item.batch || null, course: item.course || null, package: item.package || null,
          tag: item.tag || null, tagColor: item.tagColor || null, courseId: id
        });
      }
    }
    
    const updatedCourse = await Course.findByPk(id, {
      include: [
        {
          model: School,
          as: 'school',
          attributes: ['name', 'slug']
        },
        { model: Testimonial, as: 'testimonialsRel' },
        { model: FAQ, as: 'faqsRel' }
      ]
    });
    
    if (!updatedCourse) {
      return { success: false, data: null, error: 'Course not found' };
    }

    // Global Revalidation
    revalidatePath('/', 'layout');
    
    return { success: true, data: updatedCourse.get({ plain: true }), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function deleteCourse(id) {
  try {
    await connectToDatabase();
    const course = await Course.findByPk(id);
    if (!course) return { success: false, message: 'Course not found' };
    
    await Course.destroy({
      where: { id }
    });
    
    revalidatePath('/', 'layout');
    return { success: true, message: 'Course deleted successfully', data: course.get({ plain: true }) };
  } catch (error) {
    console.error(`[deleteCourse] Error:`, error);
    return { success: false, message: error.message || 'Deletion failed due to database constraint.' };
  }
}
