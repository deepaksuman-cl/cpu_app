'use server';

import Media from '@/models/Media';
import { connectToDatabase } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

// Safe resolution of upload directory in cPanel
const getUploadDir = () => path.join(process.cwd(), 'uploads', 'media');

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
    
    // Attempt to get multiple files with key 'file' or 'files'
    const files = formData.getAll('file').concat(formData.getAll('files'));
    
    if (files.length === 0) throw new Error('No files uploaded');

    const uploadDir = getUploadDir();
    // 🛡️ Bulletproof: Ensure directory exists without crashing
    await fs.mkdir(uploadDir, { recursive: true });

    const processedMedia = [];

    for (const file of files) {
      if (!(file instanceof Blob)) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const originalName = file.name || 'unnamed-file';
      const fileSize = file.size || 0;

      // Duplicate Check: Same name and same byte size
      const existingMedia = await Media.findOne({
        where: {
          originalName: originalName,
          size: fileSize
        }
      });

      if (existingMedia) {
        throw new Error(`File '${originalName}' already exists in library!`);
      }

      // 🛡️ Bulletproof: Sanitize filename (spaces to hyphens, remove special chars) & ensure uniqueness
      const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, '-').replace(/-+/g, '-');
      const uniqueSuffix = Math.random().toString(36).substring(2, 7);
      const fileName = `${Date.now()}-${uniqueSuffix}-${sanitizedName}`;
      const filePath = path.join(uploadDir, fileName);

      // Write to persistent disk
      await fs.writeFile(filePath, buffer);

      const media = await Media.create({
        displayName: originalName,
        originalName: originalName,
        url: `/api/media/media/${fileName}`,
        isExternal: false,
        mimeType: file.type || 'application/octet-stream',
        size: fileSize,
      });
      processedMedia.push(media);
    }

    revalidatePath('/', 'layout');

    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(processedMedia)), 
      count: processedMedia.length,
      error: null 
    };
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

    revalidatePath('/', 'layout');
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
    revalidatePath('/', 'layout');
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
      const filePath = path.join(getUploadDir(), fileName);
      try {
        await fs.unlink(filePath);
      } catch (unlinkError) {
        console.warn('Physical file deletion failed (non-fatal):', unlinkError);
      }
    }

    await Media.destroy({ where: { id } });
    revalidatePath('/', 'layout');
    return { success: true, error: null };
  } catch (error) {
    console.error('deleteMedia Error:', error);
    return { success: false, error: error.message };
  }
}
