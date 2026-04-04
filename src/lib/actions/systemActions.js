'use server';

import HomePage from '@/models/HomePage';
import { connectToDatabase } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getCustomCss() {
  try {
    await connectToDatabase();
    const homePage = await HomePage.findOne({ where: { name: 'Home' } });
    if (!homePage || !homePage.seo) return { success: true, customCss: '' };
    return { success: true, customCss: homePage.seo.customCss || '' };
  } catch (error) {
    console.error('❌ Error in getCustomCss:', error.message);
    return { success: false, customCss: '', error: error.message };
  }
}

export async function saveCustomCss(cssString) {
  try {
    await connectToDatabase();
    const homePage = await HomePage.findOne({ where: { name: 'Home' } });
    if (homePage) {
      const updatedSeo = { ...homePage.seo, customCss: cssString };
      await homePage.update({ seo: updatedSeo });
      revalidatePath('/', 'layout');
      return { success: true };
    }
    return { success: false, error: 'Home Page record not found. Please ensure it exists first.' };
  } catch (error) {
    console.error('❌ Error in saveCustomCss:', error.message);
    return { success: false, error: error.message };
  }
}
