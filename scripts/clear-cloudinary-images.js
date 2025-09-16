// scripts/clear-cloudinary-images.js
import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function clearImages() {
  try {
    console.log('Cloudinary config:', {
      cloud_name: cloudinary.config().cloud_name,
      api_key: cloudinary.config().api_key ? 'loaded' : 'missing',
      api_secret: cloudinary.config().api_secret ? 'loaded' : 'missing',
    });

    const result = await cloudinary.api.delete_all_resources({
      resource_type: 'image',
      invalidate: true,
    });
    console.log('Cloudinary deletion result:', result);
  } catch (error) {
    console.error('Error deleting Cloudinary images:', {
      message: error.message,
      name: error.name,
      http_code: error.http_code,
    });
  }
}

clearImages();