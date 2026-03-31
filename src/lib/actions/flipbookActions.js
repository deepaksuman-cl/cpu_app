'use server';

import { Flipbook } from '@/models';
import { connectToDatabase } from '@/lib/db';

export async function getFlipbookBySlug(slug) {
  try {
    await connectToDatabase();
    const flipbook = await Flipbook.findOne({
      where: { slug, isActive: true }
    });
    
    if (!flipbook) return { success: false, data: null, error: 'Flipbook not found' };
    
    return { success: true, data: JSON.parse(JSON.stringify(flipbook)), error: null };
  } catch (error) {
    console.error('getFlipbookBySlug Error:', error);
    return { success: false, data: null, error: error.message };
  }
}
