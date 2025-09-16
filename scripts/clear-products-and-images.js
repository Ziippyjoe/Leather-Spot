// scripts/clear-products-and-images.js
import { prisma } from '../lib/prisma.js';

async function clearProductsAndImages() {
  try {
    // Start a transaction to ensure atomicity
    await prisma.$transaction([
      // Delete all images first (due to foreign key constraint)
      prisma.image.deleteMany({}),
      // Then delete all products
      prisma.product.deleteMany({}),
    ]);
    console.log('Successfully deleted all products and images.');
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error clearing products and images:', error);
  }
}

clearProductsAndImages();