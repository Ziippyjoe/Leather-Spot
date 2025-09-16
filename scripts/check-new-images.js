// scripts/check-new-images.js
import { prisma } from '../lib/prisma.js';

async function checkNewImages() {
  try {
    const images = await prisma.image.findMany({
      where: {
        productId: { in: [39, 40] },
      },
    });
    console.log('New product images:', images);
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error querying images:', error);
  }
}

checkNewImages();