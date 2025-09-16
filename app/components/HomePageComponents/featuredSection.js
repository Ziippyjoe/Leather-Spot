import Link from 'next/link';

export default function FeaturedCategories() {
  return (
    <Link href="/collections/archive">
      <section className="relative bg-black z-[1300] cursor-pointer group">
        <div className="relative flex w-full h-[105vh] overflow-hidden">
          {/* Background Image with Rotation */}
          <div className="absolute inset-0">
            <img
              src="/featured.jpg"
              alt="featured editorial"
              className="w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/20 transition" />
          </div>

          {/* Content */}
          <div className="absolute left-10 bottom-20 z-10 flex flex-col px-10 md:px-20 py-10 text-white/90">
            <h2 className="text-2xl md:text-2xl italic leading-tight font-mono mb-2">
              The Archive Re-release
            </h2>
            <span className="inline-block text-white/80 font-sans text-xs tracking-wide underline transition group-hover:text-white">
              Explore Collection
            </span>
          </div>
        </div>
      </section>
    </Link>
  );
}
