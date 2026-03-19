'use server';

import { connectToDatabase } from '@/lib/db';
import Page from '@/models/Page';

/**
 * Helper to serialize Mongoose documents for Server Components
 */
function serializeDoc(doc) {
  if (!doc) return null;
  return JSON.parse(JSON.stringify(doc));
}

export async function getAllPages() {
  try {
    await connectToDatabase();
    const pages = await Page.find({}, 'title slug _id').lean();
    return { success: true, data: serializeDoc(pages) };
  } catch (error) {
    console.error('getAllPages Error:', error);
    return { success: false, error: error.message };
  }
}

export async function getPageBySlug(slug) {
  try {
    await connectToDatabase();
    const page = await Page.findOne({ slug }).lean();
    if (!page) {
      return { success: false, error: 'Page not found' };
    }
    return { success: true, data: serializeDoc(page) };
  } catch (error) {
    console.error('getPageBySlug Error:', error);
    return { success: false, error: error.message };
  }
}

export async function createPage(data) {
  try {
    if (data.slug) data.slug = data.slug.replace(/^\//, '');
    await connectToDatabase();
    const newPage = new Page(data);
    await newPage.save();
    return { success: true, data: serializeDoc(newPage.toObject()) };
  } catch (error) {
    console.error('createPage Error:', error);
    return { success: false, error: error.message };
  }
}

export async function updatePage(id, data) {
  try {
    if (data.slug) data.slug = data.slug.replace(/^\//, '');
    await connectToDatabase();
    const updatedPage = await Page.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    ).lean();
    
    if (!updatedPage) {
      return { success: false, error: 'Page not found' };
    }
    return { success: true, data: serializeDoc(updatedPage) };
  } catch (error) {
    console.error('updatePage Error:', error);
    return { success: false, error: error.message };
  }
}

export async function deletePage(id) {
  try {
    await connectToDatabase();
    const deletedPage = await Page.findByIdAndDelete(id).lean();
    if (!deletedPage) {
      return { success: false, error: 'Page not found' };
    }
    return { success: true, data: serializeDoc(deletedPage) };
  } catch (error) {
    console.error('deletePage Error:', error);
    return { success: false, error: error.message };
  }
}
