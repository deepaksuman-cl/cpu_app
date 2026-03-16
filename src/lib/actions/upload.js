// File: src/lib/actions/upload.js
'use server';

import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import axios from 'axios'; // 🔴 Naya install kiya hua axios

// Helper function to get filename from URL
function getFilenameFromUrl(url) {
  const parts = url.split('/');
  return parts[parts.length - 1];
}

export async function uploadImage(formData) {
  try {
    const file = formData.get('file');
    const category = formData.get('category') || 'general'; 

    if (!file) {
      return { success: false, error: 'No file uploaded.' };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Dynamic Folder Path (Year/Month/Category)
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // '03' for March
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', year, month, category);

    // 2. Folder banana
    await mkdir(uploadDir, { recursive: true });

    // 3. Image ka unique naam banana
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}-${file.name.replace(/\s+/g, '-')}`; 
    const filePath = path.join(uploadDir, filename);

    // 4. File save karna
    await writeFile(filePath, buffer);

    // 5. Public URL generate karna
    const fileUrl = `/uploads/${year}/${month}/${category}/${filename}`;

    return { 
      success: true, 
      url: fileUrl, 
      message: 'Image uploaded successfully!' 
    };

  } catch (error) {
    console.error("Upload Error:", error);
    return { success: false, error: 'Failed to upload image.' };
  }
}

// 🔴 NAYA FUNCTION: URL SE IMAGE UPLOAD KARNA 🔴
export async function uploadImageFromUrl(url, category = 'general') {
  try {
    if (!url) {
      return { success: false, error: 'No URL provided.' };
    }

    // 1. URL se image download karna using axios
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);

    // 2. Dynamic Folder Path (Year/Month/Category)
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // '03' for March
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', year, month, category);

    // 3. Folder banana
    await mkdir(uploadDir, { recursive: true });

    // 4. Image ka name aur path banana
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const originalFilename = getFilenameFromUrl(url) || 'image.jpg';
    const filename = `${uniqueSuffix}-${originalFilename.replace(/\s+/g, '-')}`; 
    const filePath = path.join(uploadDir, filename);

    // 5. Image save karna
    await writeFile(filePath, buffer);

    // 6. Public URL generate karna
    const fileUrl = `/uploads/${year}/${month}/${category}/${filename}`;

    return { 
      success: true, 
      url: fileUrl, 
      message: 'Image uploaded from URL successfully!' 
    };

  } catch (error) {
    console.error("URL Upload Error:", error);
    return { success: false, error: 'Failed to upload image from URL.' };
  }
}