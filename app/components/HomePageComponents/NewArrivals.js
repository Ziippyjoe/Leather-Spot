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
    <section className="min-h-150 py-24 px-6 max-w-7xl mx-auto bg-white">
      <h2 className="text-2xl font-mono uppercase mb-6 text-center">New Arrivals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.slug}`} className="group">
            <div className="border border-black/10 p-4">
              <img
                src={product.images[0]?.url || '/images/placeholder.jpg'}
                alt={product.name}
                className="w-full h-75 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-sm font-mono uppercase mt-2">{product.name}</h3>
              <p className="text-gray-600 text-sm">
                ${(product.priceCents / 100).toFixed(2)}
              </p>
              <p className="text-blue-500 text-sm mt-2 group-hover:underline">
                View Details
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}