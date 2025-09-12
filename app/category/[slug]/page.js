import Link from 'next/link';
import { prisma } from '@/lib/prisma';

// Server Component: Fetch data
export default async function CategoryPage({ params }) {
  // Await params to get slug
  const { slug } = await params;

  // Validate slug
  if (!slug || typeof slug !== 'string') {
    return <div className="text-red-500">Invalid category slug</div>;
  }

  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          include: { images: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!category) {
      return <div className="text-red-500">Category not found</div>;
    }

    return (
      <main className="mx-auto relative pt-20">
        <div className="px-12 w-full py-2 mb-8">
          <h1 className="text-2xl font-semibold font-mono mb-2">{category.name}</h1>
          {category.description && (
            <p className="text-gray-600 text-sm">{category.description}</p>
          )}
        </div>

        {category.products.length === 0 ? (
          <div className="text-gray-500">No products found in this category.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0.5">
            {category.products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden bg-gray-100 h-110 flex items-center justify-center">
                  {product.images?.length > 0 ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-gray-600 font-medium">
                      {product.name}
                    </div>
                  )}
                </div>
                <div className="mt-3 p-3">
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 font-semibold font-sans">
                    ${(product.priceCents / 100).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    );
  } catch (error) {
    console.error('Prisma query error:', error);
    return <div className="text-red-500">Error loading category: {error.message}</div>;
  }
}