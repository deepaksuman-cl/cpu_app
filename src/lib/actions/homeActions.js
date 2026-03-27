'use server';

import HomePage from '@/models/HomePage';
import { connectToDatabase } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

/**
 * Fetches the dynamic Home Page configuration.
 * If no record exists, it auto-seeds from src/data/home.json.
 */
export async function getHomePageData() {
  try {
    await connectToDatabase();

    let homePage = await HomePage.findOne({ where: { name: 'Home' } });
    
    if (!homePage) {
      return { success: true, data: { sections: {}, seo: {} }, error: 'Seeding in progress' };
    }
    
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(homePage)),
      error: null 
    };
  } catch (error) {
    console.error('❌ Error in getHomePageData:', error.message);
    return { success: false, data: { sections: {}, seo: {} }, error: error.message };
  }
}

/**
 * Updates the Home Page dynamic configuration.
 */
export async function updateHomePageData(sections, seo) {
  try {
    await connectToDatabase();
    const homePage = await HomePage.findOne({ where: { name: 'Home' } });
    if (homePage) {
      const updateData = {};
      if (sections) updateData.sections = sections;
      if (seo) updateData.seo = seo;
      
      await homePage.update(updateData);
      revalidatePath('/', 'layout');
      return { success: true, error: null };
    }
    return { success: false, error: 'Home Page record not found' };
  } catch (error) {
    console.error('❌ Error in updateHomePageData:', error.message);
    return { success: false, error: error.message };
  }
}
