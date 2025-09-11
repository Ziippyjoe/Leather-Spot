// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
  {
    name: 'Shoes',
    slug: 'shoes',
    description: 'Classic and contemporary leather shoes for daily wear and special occasions.',
    image: 'https://via.placeholder.com/1200x800?text=Shoes'
  },
  {
    name: 'Boots',
    slug: 'boots',
    description: 'Durable leather boots — rugged, refined, and built to last.',
    image: 'https://via.placeholder.com/1200x800?text=Boots'
  },
  {
    name: 'Bags',
    slug: 'bags',
    description: 'Premium leather bags: totes, satchels, crossbody and briefcases.',
    image: 'https://via.placeholder.com/1200x800?text=Bags'
  },
  {
    name: 'Belts',
    slug: 'belts',
    description: 'Crafted leather belts in classic and contemporary styles.',
    image: 'https://via.placeholder.com/1200x800?text=Belts'
  },
  {
    name: 'Jackets',
    slug: 'jackets',
    description: 'Statement leather jackets — timeless cuts and refined finishes.',
    image: 'https://via.placeholder.com/1200x800?text=Jackets'
  },
  {
    name: 'Gloves',
    slug: 'gloves',
    description: 'Comfortable, elegant leather gloves for warmth and style.',
    image: 'https://via.placeholder.com/1200x800?text=Gloves'
  },
  {
    name: 'Wallets',
    slug: 'wallets',
    description: 'Slim and secure leather wallets and card holders.',
    image: 'https://via.placeholder.com/1200x800?text=Wallets'
  },
  {
    name: 'Tops',
    slug: 'tops',
    description: 'Tops and shirts with leather details and premium finishes.',
    image: 'https://via.placeholder.com/1200x800?text=Tops'
  },
  {
    name: 'Bottoms',
    slug: 'bottoms',
    description: 'Leather pants and skirts designed for a bold, modern look.',
    image: 'https://via.placeholder.com/1200x800?text=Bottoms'
  },
  {
    name: 'Caps & Hats',
    slug: 'caps-hats',
    description: 'Stylish caps and hats featuring leather craftsmanship.',
    image: 'https://via.placeholder.com/1200x800?text=Caps+%26+Hats'
  },
  {
    name: 'Watches & Straps',
    slug: 'watches-straps',
    description: 'Watch straps and watches with leather accents.',
    image: 'https://via.placeholder.com/1200x800?text=Watches+%26+Straps'
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Keychains, bracelets, straps and small leather goods.',
    image: 'https://via.placeholder.com/1200x800?text=Accessories'
  }
];

async function main() {
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        image: cat.image
      },
      create: cat
    });
    console.log(`Seeded: ${cat.slug}`);
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
