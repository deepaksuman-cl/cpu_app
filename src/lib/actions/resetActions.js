'use server';

import db from '@/models/index';
import { connectToDatabase } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

/**
 * TRUE GLOBAL RESET: The Nuclear Option.
 * 1. Backs up sensitive tables (Media, Page) to JSON.
 * 2. Drops and Recreates all tables (force: true).
 * 3. Seeds EVERYTHING from scratch using V2 relational logic.
 */
export async function globalReset() {
  const sequelize = db.sequelize;
  const { Media, Page } = db;
  
  try {
    console.log('☢️ STARTING GLOBAL RESET & REBUILD...');
    // await connectToDatabase();

    // --- STEP 1: Backup Stage (Safety First) ---
    console.log('💾 Backing up Media and Page Builder data...');
    const dataDir = path.join(process.cwd(), 'src', 'data');
    
    let mediaItems = [];
    let pages = [];

    try {
      mediaItems = await Media.findAll();
    } catch (e) {
      console.log('⚠️ Skipping Media backup: Table does not exist.');
    }

    try {
      pages = await Page.findAll();
    } catch (e) {
      console.log('⚠️ Skipping Pages backup: Table does not exist.');
    }
    
    await fs.writeFile(path.join(dataDir, 'media_backup.json'), JSON.stringify(mediaItems, null, 2));
    await fs.writeFile(path.join(dataDir, 'pages_backup.json'), JSON.stringify(pages, null, 2));
    console.log(`✅ Backup Phase Complete: ${mediaItems.length} media items, ${pages.length} pages.`);

    // --- STEP 2: Nuclear Wipe ---
    console.log('💥 Wiping Database (force: true)...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('✅ Database Rebuilt (Schema is now 100% pristine).');

    // --- STEP 3: Total Seeding ---
    console.log('🌱 Triggering Total System Seeding...');
    const { seedDatabase } = await import('@/lib/actions/seedActions.js');
    const seedRes = await seedDatabase();
    
    if (!seedRes.success) {
      throw new Error(`Seeding Failed: ${seedRes.error}`);
    }

    revalidatePath('/', 'layout');
    revalidatePath('/admin', 'layout');

    console.log('🏁 GLOBAL RESET COMPLETED SUCCESSFULLY.');
    return { 
      success: true, 
      message: 'Global Reset Successful! The database has been wiped and rebuilt with 100% functional V2 data.' 
    };

  } catch (error) {
    console.error('❌ GLOBAL RESET FAILED:', error.message);
    return { success: false, error: error.message };
  }
}
