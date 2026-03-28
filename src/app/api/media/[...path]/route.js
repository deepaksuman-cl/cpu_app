import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const stat = promisify(fs.stat);

export async function GET(request, { params }) {
  try {
    const param = await params;
    const filePathArray = param.path;
    console.log('Requested file path array:', param);
    if (!filePathArray || filePathArray.length === 0) {
      return new NextResponse('Not Found', { status: 404 });
    }

    // Join the path segments
    const relativePath = filePathArray.join('/');
    // Map to public/uploads directory
    const fullPath = path.join(process.cwd(), 'uploads', relativePath);

    // Security Check: Prevent directory traversal
    const uploadsDir = path.join(process.cwd(), 'uploads');
    console.log('Requested file path:', uploadsDir, fullPath);
    if (!fullPath.startsWith(uploadsDir)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Check if file exists
    try {
      await stat(fullPath);
    } catch (e) {
      return new NextResponse('Not Found', { status: 404 });
    }

    // Detect Content-Type based on extension
    const ext = path.extname(fullPath).toLowerCase();
    let contentType = 'application/octet-stream';
    
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.pdf': 'application/pdf',
      '.mp4': 'video/mp4',
    };

    if (mimeTypes[ext]) {
      contentType = mimeTypes[ext];
    }

    // Read and return the file
    const fileBuffer = await readFile(fullPath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

  } catch (error) {
    console.error('Media API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
