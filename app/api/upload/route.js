// app/api/upload/route.js
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'image', upload_preset: 'leather_spot_unsigned' }, // Replace with your preset name
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    if (!result.secure_url) {
      throw new Error('Upload failed: No secure_url returned');
    }

    return NextResponse.json({ secure_url: result.secure_url });
  } catch (error) {
    console.error('Upload route error:', error.message, error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}