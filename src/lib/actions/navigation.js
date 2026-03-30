'use server';

import Navigation from '@/models/Navigation';
import { connectToDatabase } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { cache } from 'react';
import fs from 'fs';
import path from 'path';

/**
 * Fetches navigation data from MariaDB via Sequelize.
 * Auto-seeds from navigation.json if database is empty.
 */
export const getNavigationData = cache(async () => {
  const defaultNav = { 
    topMenu: [], 
    siteConfig: { 
      topBar: { latestNewsLabel: 'News', helpdeskLabel: 'HelpDesk' },
      searchPlaceholder: 'Search...',
      sidebar: { closeLabel: 'Close' }
    }, 
    topBarInfo: { newsTicker: [], topStripLinks: [] }, 
    mobileConfig: { bottomTabs: [] },
    sideMenu: { exploreMore: [], directLinks: [] }
  };
  try {
    await connectToDatabase();

    let navDoc = await Navigation.findOne({
      where: { documentName: 'main_header' }
    });

    if (!navDoc) {
      return defaultNav; // Return default if not seeded yet, db.js will handle seeding
    }

    // Direct access after getting plain object for maximum speed.
    return navDoc.get({ plain: true }).data || defaultNav;
  } catch (error) {
    console.error("Error fetching navigation data:", error.message);
    return defaultNav; 
  }
});

/**
 * Updates navigation data handles in JS since Sequelize doesn't support dot notation update for JSON directly.
 */
export async function updateNavigationData(nodePath, payload) {
  try {
    await connectToDatabase();
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

    revalidatePath('/', 'layout');
    
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
    await connectToDatabase();
    const cleanData = JSON.parse(JSON.stringify(fullData));
    
    await Navigation.update(
      { data: cleanData },
      { where: { documentName: 'main_header' } }
    );

    revalidatePath('/', 'layout');
    
    return { success: true, message: 'Changes saved successfully' };
  } catch (error) {
    console.error("Error saving full navigation data:", error);
    return { success: false, error: error.message };
  }
}
