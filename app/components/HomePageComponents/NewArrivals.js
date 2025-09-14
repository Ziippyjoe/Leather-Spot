import Link from 'next/link';
import { prisma } from '@/lib/prisma';

async function fetchNewArrivals() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 4,
    include: { images: true },
  });
  return products;
}

export default async function NewArrivals() {
  const products = await fetchNewArrivals();

  return (
    <section className="min-h-150 py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-mono uppercase mb-6 text-center">New Arrivals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/new-arrival/${product.slug}`} className="group">
            <img
                src={product.images[0]?.url || '/images/placeholder.jpg'}
                alt={product.name}
                className="w-full h-90 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            <div className='p-2 flex gap-4 justify-between'>
              <h3 className="text-xs font-mono uppercase">{product.name}</h3>
              <p className="text-gray-600 text-xs">
                ${(product.priceCents / 100)}
              </p>
              
            </div>
            <p className="text-blue-500 text-xs mt-2 group-hover:underline p-2">
                View Details
              </p>
          </Link>
        ))}
      </div>
    </section>
  );
}