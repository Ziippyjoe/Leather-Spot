import Link from 'next/link';
import { prisma } from '@/lib/prisma';

// Server Component: Fetch data
export default async function ProductPage({ params }) {
  // Await params to get slug
  const { slug } = await params;

  // Validate slug
  if (!slug || typeof slug !== 'string') {
    return <div className="text-red-500">Invalid product slug</div>;
  }

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { images: true, category: true },
    });

    if (!product) {
      return <div className="text-red-500">Product not found</div>;
    }

    return (
      <main className="min-h-screen mx-auto">

        <div className="w-full flex flex-col md:flex-row gap-8">
          {/* Left Side: Main Image + All Images */}
          <div className="w-1/2">
            {product.images.length > 0 ? (
              <div className="flex flex-col">
                {/* Main Image */}
                <img
                  src={product.images[0].url}
                  alt={product.images[0].altText ?? product.name}
                  className="w-full h-auto max-h-[48rem] object-cover"
                />
                {/* All Images */}
                {product.images.length > 1 && (
                  <div className="flex flex-col gap-2">
                    {product.images.slice(1).map((image) => (
                      <img
                        key={image.url}
                        src={image.url}
                        alt={image.altText ?? product.name}
                        className="w-full h-auto max-h-[47rem] object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
                No image
              </div>
            )}
          </div>

          {/* Right Side: Product Details (Sticky) */}
          <div className="w-1/2 flex flex-col gap-4 md:sticky md:top-4 md:self-start py-40 px-40">
            <h1 className="text-xl">{product.name}</h1>
            <p className="text-sm">
              ${(product.priceCents / 100).toLocaleString()}
            </p>
            <p className="text-gray-700">{product.description}</p>

            <ul className="text-gray-600">
              {product.color && <li>Color: {product.color}</li>}
              {product.size && <li>Size: {product.size}</li>}
              {product.gender && <li>Gender: {product.gender}</li>}
              {product.stock != null && <li>Stock: {product.stock}</li>}
            </ul>

            <button className="mt-4 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition text-sm">
              Add to Bag
            </button>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Prisma query error:', error);
    return <div className="text-red-500">Error loading product: {error.message}</div>;
  }
}