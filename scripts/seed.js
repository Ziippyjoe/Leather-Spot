// scripts/seed.js
import { prisma } from '@/lib/prisma';
async function seed() {
  await prisma.user.create({
    data: { firebaseId: 'temp', email: 'admin@example.com', isAdmin: true },
  });
}
seed().then(() => prisma.$disconnect());