// File: src/lib/actions/upload.js
'use server';

import { writeFile, mkdir } from 'fs/promises';
import { revalidatePath } from 'next/cache';
import path from 'path';

// 🟢 NAYA aur Bulletproof function (Axios hata diya)
export async function uploadImageFromUrl(url, category = 'general') {
  try {
    if (!url) {
      return { success: false, error: 'No URL provided.' };
    }

    // 1. Native Fetch se image download karna
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Image ka sahi extension (jpg, png) pata lagana
    const contentType = response.headers.get('content-type') || '';
    let ext = '.jpg'; // Default extension
    if (contentType.includes('png')) ext = '.png';
    else if (contentType.includes('webp')) ext = '.webp';
    else if (contentType.includes('gif')) ext = '.gif';
    else if (contentType.includes('svg')) ext = '.svg';

    // 3. Dynamic Folder Path
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', year, month, category);

    // 4. Folder banana
    await mkdir(uploadDir, { recursive: true });

    // 5. Ekdam Clean aur Safe File Name banana (Bina kisi special characters ke)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `url-img-${uniqueSuffix}${ext}`; 
    const filePath = path.join(uploadDir, filename);

    // 6. Image save karna
    await writeFile(filePath, buffer);

    // 7. Global Revalidation
    revalidatePath('/', 'layout');

    // 8. Public URL generate karna
    const fileUrl = `/uploads/${year}/${month}/${category}/${filename}`;

    return { 
      success: true, 
      url: fileUrl, 
      message: 'Image uploaded from URL successfully!' 
    };

  } catch (error) {
    console.error("URL Upload Error:", error);
    // Frontend ko actual error bhejna taaki pata chale kya issue hai
    return { success: false, error: error.message || 'Failed to upload image from URL.' }; 
  }
}

// 🟢 Purana File Upload wala function waisa hi rahega
export async function uploadImage(formData) {
  try {
    const file = formData.get('file');
    const category = formData.get('category') || 'general'; 

    if (!file) {
      return { success: false, error: 'No file uploaded.' };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', year, month, category);
    await mkdir(uploadDir, { recursive: true });

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // Clean filename for local uploads too
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-'); 
    const filename = `${uniqueSuffix}-${cleanFileName}`; 
    
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Global Revalidation
    revalidatePath('/', 'layout');

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