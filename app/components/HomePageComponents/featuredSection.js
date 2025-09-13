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
  // const categories = await fetchFeaturedCategories(); // Use this if fetching from database
  const categories = featuredCategories; // Static data for now

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto bg-white">
      <h2 className="text-2xl font-mono uppercase mb-6 text-center">Featured Sale</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/shop?category=${category.slug}`}
            className="group"
          >
            <div className="border border-black/10 overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 text-center">
                <h3 className="text-sm font-mono uppercase">{category.name}</h3>
                <p className="text-blue-500 text-sm mt-2 group-hover:underline">
                  Shop Now
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}