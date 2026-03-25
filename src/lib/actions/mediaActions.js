'use server';

import Media from '@/models/Media';
import { connectToDatabase } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'media');

async function ensureUploadDir() {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
}

export async function getAllMedia() {
  try {
    await connectToDatabase();
    const media = await Media.findAll({
      order: [['createdAt', 'DESC']]
    });
    return { success: true, data: JSON.parse(JSON.stringify(media)), error: null };
  } catch (error) {
    console.error('getAllMedia Error:', error);
    return { success: false, data: null, error: error.message };
  }
}

export async function uploadLocalMedia(formData) {
  try {
    await connectToDatabase();
    const file = formData.get('file');
    if (!file) throw new Error('No file uploaded');

    await ensureUploadDir();

    const buffer = Buffer.from(await file.arrayBuffer());
    const originalName = file.name;
    const extension = path.extname(originalName);
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${extension}`;
    const filePath = path.join(UPLOAD_DIR, fileName);

    await fs.writeFile(filePath, buffer);

    const media = await Media.create({
      displayName: originalName,
      originalName: originalName,
      url: `/uploads/media/${fileName}`,
      isExternal: false,
      mimeType: file.type,
      size: file.size,
    });

    return { success: true, data: JSON.parse(JSON.stringify(media)), error: null };
  } catch (error) {
    console.error('uploadLocalMedia Error:', error);
    return { success: false, data: null, error: error.message };
  }
}

export async function saveExternalMedia(url) {
  try {
    await connectToDatabase();
    if (!url) throw new Error('URL is required');

    const media = await Media.create({
      displayName: url.split('/').pop() || 'External Link',
      url: url,
      isExternal: true,
      altText: '',
    });

    return { success: true, data: JSON.parse(JSON.stringify(media)), error: null };
  } catch (error) {
    console.error('saveExternalMedia Error:', error);
    return { success: false, data: null, error: error.message };
  }
}

export async function updateMedia(id, data) {
  try {
    await connectToDatabase();
    await Media.update(data, {
      where: { id }
    });
    const updatedMedia = await Media.findByPk(id);
    return { success: true, data: JSON.parse(JSON.stringify(updatedMedia)), error: null };
  } catch (error) {
    console.error('updateMedia Error:', error);
    return { success: false, data: null, error: error.message };
  }
}

export async function deleteMedia(id) {
  try {
    await connectToDatabase();
    const media = await Media.findByPk(id);
    if (!media) throw new Error('Media not found');

    if (!media.isExternal) {
      const fileName = media.url.split('/').pop();
      const filePath = path.join(UPLOAD_DIR, fileName);
      try {
        await fs.unlink(filePath);
      } catch (unlinkError) {
        console.warn('Physical file deletion failed (non-fatal):', unlinkError);
      }
    }

    await Media.destroy({ where: { id } });
    return { success: true, error: null };
  } catch (error) {
    console.error('deleteMedia Error:', error);
    return { success: false, error: error.message };
  }
}
