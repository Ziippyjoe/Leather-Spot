import Link from 'next/link';

// Sample data (replace with Prisma query if you have a Category model)
const featuredCategories = [
  { id: 'bags', name: 'Leather Bags', image: '/images/categories/bags.jpg', slug: 'bags' },
  { id: 'wallets', name: 'Wallets', image: '/images/categories/wallets.jpg', slug: 'wallets' },
  { id: 'jackets', name: 'Leather Jackets', image: '/images/categories/jackets.jpg', slug: 'jackets' },
];

// Optional: Fetch from Prisma (uncomment if you have a Category model)
/*
async function fetchFeaturedCategories() {
  const categories = await prisma.category.findMany({
    where: { featured: true },
    select: { id: true, name: true, image: true, slug: true },
    take: 3,
  });
  return categories;
}
*/

export default function FeaturedCategories() {

  return (
    <section className="py-24 mx-auto ">
      <h2 className="text-2xl font-mono uppercase mb-6 text-center">Featured</h2>
      <div className="flex w-full h-220">
          <div className='h-full w-[40%] bg-amber-900/70'>
            <img src="/featuredleft.jpeg" alt="featured editorial" className="w-full h-full object-cover object-top" />
          </div>
          <div className='h-full w-[60%] bg-black'></div>
      </div>
    </section>
  );
}