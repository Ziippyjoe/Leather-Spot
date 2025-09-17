// app/components/CategoryList.jsx
import Link from 'next/link';

export default async function CategoryList() {
  // Use an env var in production; localhost is fine for dev.
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${base}/api/categories?includeProducts=true`, { cache: 'no-store' });
  if (!res.ok) {
    return <div className="text-red-500">Failed to load categories</div>;
  }
  const categories = await res.json();

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-2xl font-mono uppercase mb-10 text-center">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 uppercase">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/${cat.slug}`} className="group block mb-4">
            <div className="relative overflow-hidden bg-black/5 h-75 flex items-center justify-center ">
              { /* Prefer category.image, fallback to first product primary image if available */ }
              {cat.image ? (
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-108 duration-400 ease-in-out"
                />
              ) : cat.products && cat.products.length > 0 && cat.products[0].images?.length ? (
                <img
                  src={cat.products[0].images[0].url}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-108"
                />
              ) : (
                <div className="text-gray-600 font-medium">{cat.name}</div>
              )}
            </div>

            <div className="mt-3 text-center">
              <h3 className="text-sm text-gray-900 ">{cat.name}</h3>
              {/* {cat.description ? (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{cat.description}</p>
              ) : null} */}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
