'use server';

import Page from '@/models/Page';
import { connectToDatabase } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getAllPages() {
  try {
    await connectToDatabase();

    const pages = await Page.findAll({
      attributes: ['id', 'title', 'slug', 'pageCssId', 'blocks']
    });
    return { success: true, data: JSON.parse(JSON.stringify(pages)), error: null };
  } catch (error) {
    console.error('getAllPages Error:', error.message);
    return { success: true, data: [], error: error.message };
  }
}

export async function getPageBySlug(slug) {
  try {
    await connectToDatabase();

    const page = await Page.findOne({
      where: { slug }
    });
    if (!page) {
      return { success: false, data: null, error: 'Page not found' };
    }
    return { success: true, data: JSON.parse(JSON.stringify(page)), error: null };
  } catch (error) {
    console.error('getPageBySlug Error:', error.message);
    return { success: false, data: null, error: error.message };
  }
}

export async function createPage(data) {
  try {
    await connectToDatabase();
    if (data.slug) data.slug = data.slug.replace(/^\//, '');
    
    const newPage = await Page.create(data);
    
    revalidatePath('/admin/pages');
    revalidatePath(`/${data.slug}`);
    return { success: true, data: JSON.parse(JSON.stringify(newPage)), error: null };
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
    try {
      revalidatePath('/admin/pages');
      revalidatePath(`/admin/pages/edit/${id}`);
      if (data.slug) {
        revalidatePath(`/${data.slug}`);
      }
    } catch (revalidateError) {
      console.error('Revalidation error (non-fatal):', revalidateError);
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(updatedPage)), error: null };
  } catch (error) {
    console.error('updatePage Error:', error);
    return { success: false, data: null, error: error.message };
  }
}

export async function deletePage(id) {
  try {
    await connectToDatabase();
    const page = await Page.findByPk(id);
    if (!page) return { success: false, error: 'Page not found' };

    await Page.destroy({
      where: { id }
    });
    
    return { success: true, data: JSON.parse(JSON.stringify(page)), error: null };
  } catch (error) {
    console.error('deletePage Error:', error);
    return { success: false, data: null, error: error.message };
  }
}
