import { NextResponse } from 'next/server';
import { uploadLocalMedia } from '@/lib/actions/mediaActions';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('image'); // EditorJS default field name is 'image'
    
    if (!file) {
      return NextResponse.json({ success: 0, message: 'No file provided' }, { status: 400 });
    }

    // Wrap the file in a new FormData because uploadLocalMedia expects it
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    const result = await uploadLocalMedia(uploadFormData);

    if (result.success && result.data && result.data.length > 0) {
      const media = result.data[0];
      return NextResponse.json({
        success: 1,
        file: {
          url: media.url // Public URL served via /api/media/[...path]
        }
      });
    }

    return NextResponse.json({ success: 0, message: result.error || 'Upload failed' }, { status: 500 });

  } catch (error) {
    console.error('Editor Upload API Error:', error);
    return NextResponse.json({ success: 0, message: 'Internal Server Error' }, { status: 500 });
  }
}
