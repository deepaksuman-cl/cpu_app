'use server';

import Navigation from '@/models/Navigation';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

/**
 * Fetches navigation data from MariaDB via Sequelize.
 * Auto-seeds from navigation.json if database is empty.
 */
export async function getNavigationData() {
  try {
    let navDoc = await Navigation.findOne({
      where: { documentName: 'main_header' }
    });

    if (!navDoc) {
      console.log("Database is empty. Seeding from navigation.json...");
      const filePath = path.join(process.cwd(), 'src', 'data', 'navigation.json');
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const defaultData = JSON.parse(fileContents);

      navDoc = await Navigation.create({
        documentName: 'main_header',
        data: defaultData
      });
    }

    return JSON.parse(JSON.stringify(navDoc.data));
  } catch (error) {
    console.error("Error fetching navigation data:", error);
    return { topMenu: [], siteConfig: {}, topBarInfo: {} }; 
  }
}

/**
 * Updates navigation data handles in JS since Sequelize doesn't support dot notation update for JSON directly.
 */
export async function updateNavigationData(nodePath, payload) {
  try {
    const navDoc = await Navigation.findOne({
      where: { documentName: 'main_header' }
    });

    if (!navDoc) throw new Error("Navigation document not found");

    const fullData = JSON.parse(JSON.stringify(navDoc.data));
    
    // Simple helper to set nested value
    const keys = nodePath.split('.');
    let current = fullData;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = payload;

    await Navigation.update(
      { data: fullData },
      { where: { documentName: 'main_header' } }
    );

    revalidatePath('/admin/header');
    revalidatePath('/');
    
    return { success: true, message: 'Settings updated successfully' };
  } catch (error) {
    console.error("Error updating navigation data:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Global update for the entire data object
 */
export async function saveFullNavigationData(fullData) {
  try {
    const cleanData = JSON.parse(JSON.stringify(fullData));
    
    await Navigation.update(
      { data: cleanData },
      { where: { documentName: 'main_header' } }
    );

    revalidatePath('/admin/header');
    revalidatePath('/');
    
    return { success: true, message: 'Changes saved successfully' };
  } catch (error) {
    console.error("Error saving full navigation data:", error);
    return { success: false, error: error.message };
  }
}
