import Link from 'next/link';
import { prisma } from '@/lib/prisma';

// Server Component: Fetch data
export default async function CategoryPage({ params }) {
  // Await params to get slug
  const { category } = await params;

  // Validate slug
  if (!category || typeof category !== 'string') {
    return <div className="text-red-500">Invalid category slug</div>;
  }

  try {
    const category = await prisma.category.findUnique({
      where: { category },
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
      <main className="mx-auto relative pt-28 pb-20 min-h-screen">
        <div className="sticky top-28 px-15 w-full pb-0.5 pt-2 mb-4 bg-[#fdfdfd] z-50">
          <p className="font-xs font-mono mb-2">{category.name}</p>
          
        </div>

        {category.products.length === 0 ? (
          <div className="text-gray-500 px-16">No products found in this category.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 px-15">
            {category.products.map((product) => (
              <Link
                key={product.id}
                href={`/${category.slug}/${product.slug}`}
                className="group block mb-6"
              >
                <div className="relative overflow-hidden bg-black/8 h-110 flex items-center justify-center">
                  {product.images?.length > 0 ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500 ease-in-out"
                    />
                  ) : (
                    <div className="text-gray-600 font-medium">
                      {product.name}
                    </div>
                  )}
                </div>
                <div className="mt-3 px-2 flex justify-between mb-6 font-mono ">
                  <h3 className="text-[11.5px] uppercase">{product.name}</h3>
                  <p className="text-[11.5px] font-sans">
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