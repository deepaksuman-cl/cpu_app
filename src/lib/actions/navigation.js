'use server';

import { connectToDatabase } from '@/lib/db';
import Navigation from '@/models/Navigation';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';

/**
 * Fetches navigation data from MongoDB.
 * Auto-seeds from navigation.json if database is empty.
 */
export async function getNavigationData() {
  try {
    await connectToDatabase();
    let navDoc = await Navigation.findOne({ documentName: 'main_header' }).lean();

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

    // Return plain object for Server Components with deep cleaning
    return JSON.parse(JSON.stringify(navDoc.data));
  } catch (error) {
    console.error("Error fetching navigation data:", error);
    // Return empty config instead of throwing to prevent total page crash
    return { topMenu: [], siteConfig: {}, topBarInfo: {} }; 
  }
}

/**
 * Updates navigation data in MongoDB using a dot-notation path.
 * @param {string} path - Dot-notation path (e.g., 'siteConfig.searchPlaceholder' or 'topMenu.0.title')
 * @param {any} payload - The new value to set at that path
 */
export async function updateNavigationData(nodePath, payload) {
  try {
    const cleanPayload = JSON.parse(JSON.stringify(payload));
    await connectToDatabase();
    
    // Update using MongoDB dot notation
    const updateQuery = {};
    updateQuery[`data.${nodePath}`] = cleanPayload;

    const updated = await Navigation.findOneAndUpdate(
      { documentName: 'main_header' },
      { $set: updateQuery },
      { new: true }
    ).lean();

    if (!updated) {
      throw new Error("Navigation document not found");
    }

    revalidatePath('/admin/header');
    revalidatePath('/'); // Revalidate main portal too
    
    return { success: true, message: 'Settings updated successfully' };
  } catch (error) {
    console.error("Error updating navigation data:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Global update for the entire data object (useful for complex array additions/deletions)
 */
export async function saveFullNavigationData(fullData) {
  try {
    // CRITICAL: Clean fullData to remove React 19 Proxies/Temporary Client References
    const cleanData = JSON.parse(JSON.stringify(fullData));
    
    await connectToDatabase();
    
    const updated = await Navigation.findOneAndUpdate(
      { documentName: 'main_header' },
      { $set: { data: cleanData } },
      { new: true }
    ).lean();

    revalidatePath('/admin/header');
    revalidatePath('/');
    
    return { success: true, message: 'Changes saved successfully' };
  } catch (error) {
    console.error("Error saving full navigation data:", error);
    return { success: false, error: error.message };
  }
}
