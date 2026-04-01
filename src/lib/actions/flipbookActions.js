'use server';

import { Flipbook } from '@/models';
import { connectToDatabase } from '@/lib/db';
import { Op } from 'sequelize';

export async function getFlipbookBySlug(slug) {
  try {
    await connectToDatabase();

    // Normalize: strip leading slashes from the URL param
    const cleanSlug = slug.replace(/^\/+/, '');

    // Try both stored formats: with and without leading slash (backward compat)
    const flipbook = await Flipbook.findOne({
      where: {
        slug: { [Op.in]: [cleanSlug, `/${cleanSlug}`] },
        isActive: true,
      }
    });
    
    if (!flipbook) return { success: false, data: null, error: 'Flipbook not found' };
    
    return { success: true, data: JSON.parse(JSON.stringify(flipbook)), error: null };
  } catch (error) {
    console.error('getFlipbookBySlug Error:', error);
    return { success: false, data: null, error: error.message };
  }
}
