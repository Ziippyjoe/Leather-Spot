// scripts/test-env.js
import dotenv from 'dotenv';
dotenv.config();

console.log('Environment variables:', {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? 'loaded' : 'missing',
  DATABASE_URL: process.env.DATABASE_URL,
});