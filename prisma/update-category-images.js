// prisma/update-category-images.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = {
  // slug: publicPath
  'shoes': 'shoes.jpg',
  'boots': 'boots.jpg',
  'bags': 'bags.jpg',
  'belts': 'belts.jpg',
  'jackets': 'jackets.jpg',
  'gloves': 'gloves.jpg',
  'wallets': 'wallets.jpg',
  'tops': 'tops.jpg',
  'bottoms': 'bottoms.jpg',
  'caps-hats': 'caps-hats.jpg',
  'watches-straps': 'watches-straps.jpg',
  'accessories': 'accessories.jpg'
};

async function main() {
  for (const [slug, imagePath] of Object.entries(updates)) {
    try {
      const cat = await prisma.category.findUnique({ where: { slug } });
      if (!cat) {
        console.warn(`No category found for slug: ${slug}`);
        continue;
      }
      await prisma.category.update({
        where: { slug },
        data: { image: imagePath }
      });
      console.log(`Updated ${slug} -> ${imagePath}`);
    } catch (err) {
      console.error(`Error updating ${slug}:`, err);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
