'use server';

import Media from '@/models/Media';
import { connectToDatabase } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

// ✅ Upload dir is at PROJECT ROOT /uploads/media (NOT inside /public/)
// This avoids write-permission errors on cPanel/production servers where /public is read-only.
// Files are served via the existing /api/media/[...path] route handler.
const getUploadDir = () => path.join(process.cwd(), 'uploads', 'media');

// URL prefix — served by /api/media/[...path] route
const getMediaUrl = (fileName) => `/api/media/media/${fileName}`;

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
    // Ensure directory exists (recursive = no error if already exists)
    await fs.mkdir(uploadDir, { recursive: true });

    const processedMedia = [];

    for (const file of files) {
      if (!(file instanceof Blob)) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const originalName = file.name || 'unnamed-file';
      const fileSize = file.size || 0;

      // 🛡️ DUPLICATE CHECK: Match by original filename — return existing record
      const trimmedName = originalName.trim();
      const existingMedia = await Media.findOne({ where: { originalName: trimmedName } });
      if (existingMedia) {
        processedMedia.push({ ...existingMedia.toJSON(), duplicate: true });
        continue;
      }

      // Sanitize filename (spaces → hyphens, remove special chars)
      const sanitizedName = trimmedName.replace(/[^a-zA-Z0-9.-]/g, '-').replace(/-+/g, '-');
      const uniqueSuffix = Math.random().toString(36).substring(2, 7);
      const fileName = `${Date.now()}-${uniqueSuffix}-${sanitizedName}`;
      const filePath = path.join(uploadDir, fileName);

      // Write to persistent disk
      await fs.writeFile(filePath, buffer);

      const media = await Media.create({
        displayName: originalName,
        originalName: originalName,
        url: getMediaUrl(fileName),        // ✅ served via API route
        isExternal: false,
        mimeType: file.type || 'application/octet-stream',
        size: fileSize,
      });
      processedMedia.push(media.toJSON());
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


/**
 * 🚀 AUTO-DOWNLOAD SYSTEM:
 * Instead of just saving the link (which causes CORS/404 issues in browsers), 
 * we "pull" the content to our server.
 */
export async function saveExternalMedia(url) {
  try {
    await connectToDatabase();
    if (!url) throw new Error('URL is required');

    // 1. Fetch the remote content
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    if (!response.ok) throw new Error(`Failed to fetch remote asset: ${response.statusText}`);

    const buffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const fileSize = buffer.length;

    // 2. Resolve Filename & Extension
    const urlPath = new URL(url).pathname;
    let originalName = urlPath.split('/').pop() || 'remote-asset';
    
    // Add extension if missing but known from Mime
    if (!originalName.includes('.') && contentType.includes('/')) {
      const ext = contentType.split('/')[1].split(';')[0];
      originalName = `${originalName}.${ext}`;
    }

    const uploadDir = getUploadDir();
    await fs.mkdir(uploadDir, { recursive: true });

    // 🛡️ DUPLICATE CHECK: Match by filename — same URL always produces the same filename
    const existingMedia = await Media.findOne({ where: { originalName: originalName } });
    if (existingMedia) {
      return { success: true, data: JSON.parse(JSON.stringify(existingMedia)), error: null, duplicate: true };
    }

    // 3. Unique Local Filename
    const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, '-');
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}-${sanitizedName}`;
    const filePath = path.join(uploadDir, fileName);

    // 4. Save to Persistent Disk
    await fs.writeFile(filePath, buffer);

    // 5. Create Database Local Record (Convert External to Local)
    const media = await Media.create({
      displayName: originalName,
      originalName: originalName,
      url: getMediaUrl(fileName),          // ✅ served via API route
      isExternal: false, // It's local now
      mimeType: contentType,
      size: fileSize,
      altText: `Imported from ${new URL(url).hostname}`,
    });

    revalidatePath('/', 'layout');
    return { success: true, data: JSON.parse(JSON.stringify(media)), error: null };
  } catch (error) {
    console.error('saveExternalMedia Import Error:', error);
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
