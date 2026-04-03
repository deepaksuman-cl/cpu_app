'use server';

import Page from '@/models/Page';
import { connectToDatabase } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { cache } from 'react';

export async function getAllPages(search = '') {
  try {
    await connectToDatabase();

    const where = {};
    if (search) {
      const { Op } = require('sequelize');
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { slug: { [Op.like]: `%${search}%` } }
      ];
    }

    const pages = await Page.findAll({
      where,
      attributes: ['id', 'title', 'slug', 'pageCssId', 'pageCssClass', 'blocks', 'createdAt', 'updatedAt'],
      order: [['updatedAt', 'DESC']]
    });
    const plainPages = pages.map(p => p.get({ plain: true }));
    return { success: true, data: plainPages, error: null };
  } catch (error) {
    console.error('getAllPages Error:', error.message);
    return { success: false, data: [], error: error.message };
  }
}


export const getPageBySlug = cache(async (slug) => {
  try {
    await connectToDatabase();

    const page = await Page.findOne({
      where: { slug }
    });
    if (!page) {
      return { success: false, data: null, error: 'Page not found' };
    }
    return { success: true, data: page.get({ plain: true }), error: null };
  } catch (error) {
    console.error('getPageBySlug Error:', error.message);
    return { success: false, data: null, error: error.message };
  }
});

export async function createPage(data) {
  try {
    await connectToDatabase();
    if (data.slug) data.slug = data.slug.replace(/^\//, '');
    
    const newPage = await Page.create(data);
    
    revalidatePath('/', 'layout');
    return { success: true, data: newPage.get({ plain: true }), error: null };
  } catch (error) {
    console.error('createPage Error:', error);
    return { success: false, data: null, error: error.message };
  }
}

export async function updatePage(id, data) {
  try {
    await connectToDatabase();
    if (data.slug) data.slug = data.slug.replace(/^\//, '');
    
    await Page.update(data, {
      where: { id }
    });
    
    const updatedPage = await Page.findByPk(id);
    
    // Multi-path revalidation to ensure all related pages are fresh.
    revalidatePath('/', 'layout');
    
    return { success: true, data: updatedPage.get({ plain: true }), error: null };
  } catch (error) {
    console.error('updatePage Error:', error);
    return { success: false, data: null, error: error.message };
  }
}

export async function deletePage(id) {
  try {
    await connectToDatabase();
    const page = await Page.findByPk(id);
    if (!page) return { success: false, message: 'Page not found' };

    await Page.destroy({
      where: { id }
    });
    
    revalidatePath('/', 'layout');
    return { success: true, message: 'Page deleted successfully', data: JSON.parse(JSON.stringify(page)) };
  } catch (error) {
    console.error(`[deletePage] Error:`, error);
    return { success: false, message: error.message || 'Deletion failed due to database constraint.' };
  }
}
