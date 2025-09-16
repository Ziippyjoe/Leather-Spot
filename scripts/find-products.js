// scripts/find-products.js
import { prisma } from '../lib/prisma.js';

async function findProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        slug: { in: ['test-product', 'hdhd'] },
      },
      include: { images: true },
    });
    console.log('Products:', products);
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error querying products:', error);
  }
}

findProducts();