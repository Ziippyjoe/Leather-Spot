// app/[category]/page.js
import { prisma } from "@/lib/prisma";
import Link from "next/link";

// --- Generate static params for known slugs ---
export async function generateStaticParams() {
  try {
    const categories = await prisma.category.findMany({
      select: { slug: true },
    });

    return categories.map((cat) => ({
      category: cat.slug, // Ensure the key matches the dynamic route [category]
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

// --- Page component ---
export default async function CategoryPage({ params: paramsPromise }) {
  // Await params to resolve the Promise
  const params = await paramsPromise;

  // Validate params
  if (!params || !params.category) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Invalid category slug.
      </div>
    );
  }

  const slug = params.category; // Access params.category after awaiting

  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: {
          include: { images: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!category) {
      return (
        <div className="min-h-screen flex items-center justify-center text-gray-600">
          Category not found.
        </div>
      );
    }

    return (
      <main className="mx-auto relative pt-16 pb-20 min-h-screen">
        <div className="px-9 w-full pb-0.5 pt-3 mb-4 bg-[#fdfdfd] z-50 uppercase font-semibold">
          <p className="text-xs font-mono mb-2">{category.name}</p>
        </div>

        {category.products.length === 0 ? (
          <div className="text-gray-500 px-16">No products found in this category.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 px-9">
            {category.products.map((product) => (
              <Link
                key={product.id}
                href={`/${category.slug}/${product.slug}`}
                className="group block mb-6"
              >
                <div className="relative overflow-hidden bg-[#eeeeee] h-120 flex items-center justify-center">
                  {product.images?.length > 0 ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500 ease-in-out"
                    />
                  ) : (
                    <div className="text-gray-600 font-medium">{product.name}</div>
                  )}
                </div>
                <div className="mt-3 px-2 flex justify-between mb-6 font-mono">
                  <h3 className="text-[11.5px] uppercase">{product.name}</h3>
                  <p className="text-[11.5px] font-sans">
                    ${(product.priceCents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    );
  } catch (error) {
    console.error("Error fetching category:", error);
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Error loading category.
      </div>
    );
  }
}