// scripts/list-cloudinary-assets.js
import dotenv from 'dotenv';
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function listAssets() {
  try {
    const result = await cloudinary.api.resources({
      resource_type: 'image',
      max_results: 500,
    });
    console.log('Cloudinary assets:', result.resources);
  } catch (error) {
    console.error('Error listing assets:', error);
  }
}

listAssets();