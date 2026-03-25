'use server';

import HomePage from '@/models/HomePage';
import fs from 'fs/promises';
import path from 'path';

/**
 * Fetches the dynamic Home Page configuration.
 * If no record exists, it auto-seeds from src/data/home.json.
 */
export async function getHomePageData() {
  try {
    let homePage = await HomePage.findOne({ where: { name: 'Home' } });
    
    if (!homePage) {
      // Auto-Seed from JSON file
      console.log('🏘️ Auto-seeding Home Page data from home.json...');
      const filePath = path.join(process.cwd(), 'src/data/home.json');
      const jsonData = await fs.readFile(filePath, 'utf-8');
      const sections = JSON.parse(jsonData);
      
      homePage = await HomePage.create({
        name: 'Home',
        sections: sections,
        seo: {
          title: 'Career Point University Kota | Top Private University in Rajasthan',
          description: 'Experience world-class education at Career Point University Kota. 100+ programs, 42 LPA highest package, and a vibrant campus life.',
          keywords: 'CPU Kota, Career Point University, Best University in Rajasthan, Private University Kota',
          ogImage: 'https://cpur.in/wp-content/uploads/2024/01/bg_12-1.jpg'
        }
      });
    }
    
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(homePage)),
      error: null 
    };
  } catch (error) {
    console.error('❌ Error in getHomePageData:', error.message);
    return { success: false, data: null, error: error.message };
  }
}

/**
 * Updates the Home Page dynamic configuration.
 */
export async function updateHomePageData(sections, seo) {
  try {
    const homePage = await HomePage.findOne({ where: { name: 'Home' } });
    if (homePage) {
      const updateData = {};
      if (sections) updateData.sections = sections;
      if (seo) updateData.seo = seo;
      
      await homePage.update(updateData);
      return { success: true, error: null };
    }
    return { success: false, error: 'Home Page record not found' };
  } catch (error) {
    console.error('❌ Error in updateHomePageData:', error.message);
    return { success: false, error: error.message };
  }
}
