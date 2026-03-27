'use server';

import Course from '@/models/Course';
import School from '@/models/School';
import { connectToDatabase } from '@/lib/db';
import { Testimonial, FAQ } from '@/models/index';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';



export async function getCourses(schoolId = null) {
  try {
    await connectToDatabase();
    const where = schoolId ? { schoolId } : {};
    const courses = await Course.findAll({
      where,
      include: [{
        model: School,
        as: 'school',
        attributes: ['name', 'slug']
      }],
      order: [['createdAt', 'DESC']]
    });
    
    return { success: true, data: JSON.parse(JSON.stringify(courses)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function getCourseBySlug(slug) {
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
    
    return { success: true, data: JSON.parse(JSON.stringify(course)), error: null };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
}

export async function getCourseById(id) {
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
    
    return { success: true, data: JSON.parse(JSON.stringify(course)), error: null };
  } catch (error) {
    console.error(`[getCourseById] Error fetching course ${id}:`, error);
    return { success: false, data: null, error: error.message };
  }
}

export async function createCourse(data) {
  try {
    await connectToDatabase();
    let slug = data.slug;
    if (!slug && data.name) {
      slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    
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
    
    return { success: true, data: JSON.parse(JSON.stringify(newCourse)), error: null };
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
    
    return { success: true, data: JSON.parse(JSON.stringify(updatedCourse)), error: null };
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
    return { success: true, message: 'Course deleted successfully', data: JSON.parse(JSON.stringify(course)) };
  } catch (error) {
    console.error(`[deleteCourse] Error:`, error);
    return { success: false, message: error.message || 'Deletion failed due to database constraint.' };
  }
}
