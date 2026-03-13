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
    let navDoc = await Navigation.findOne({ documentName: 'main_header' });

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

    // Return plain object for Server Components
    return JSON.parse(JSON.stringify(navDoc.data));
  } catch (error) {
    console.error("Error fetching navigation data:", error);
    throw new Error("Failed to fetch navigation data");
  }
}

/**
 * Updates navigation data in MongoDB using a dot-notation path.
 * @param {string} path - Dot-notation path (e.g., 'siteConfig.searchPlaceholder' or 'topMenu.0.title')
 * @param {any} payload - The new value to set at that path
 */
export async function updateNavigationData(nodePath, payload) {
  try {
    await connectToDatabase();
    
    // Update using MongoDB dot notation
    const updateQuery = {};
    updateQuery[`data.${nodePath}`] = payload;

    const updated = await Navigation.findOneAndUpdate(
      { documentName: 'main_header' },
      { $set: updateQuery },
      { new: true }
    );

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
    await connectToDatabase();
    
    const updated = await Navigation.findOneAndUpdate(
      { documentName: 'main_header' },
      { $set: { data: fullData } },
      { new: true }
    );

    revalidatePath('/admin/header');
    revalidatePath('/');
    
    return { success: true, message: 'Changes saved successfully' };
  } catch (error) {
    console.error("Error saving full navigation data:", error);
    return { success: false, error: error.message };
  }
}
