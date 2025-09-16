// scripts/check-database.js
import { prisma } from '../lib/prisma.js';

async function checkDatabase() {
  try {
    const products = await prisma.product.findMany();
    const images = await prisma.image.findMany();
    const cartItems = await prisma.cartItem.findMany();
    console.log('Products:', products);
    console.log('Images:', images);
    console.log('CartItems:', cartItems);
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error checking database:', error);
  }
}

checkDatabase();