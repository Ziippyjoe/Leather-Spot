'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSessionId } from '@/lib/useSessionId';

// Helper function to fetch product data
async function fetchProduct(slug) {
  try {
    const response = await fetch(`/api/product/${slug}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const sessionId = useSessionId();

  // Fetch product data on mount
  useEffect(() => {
    async function loadProduct() {
      const { slug } = await params;
      if (!slug || typeof slug !== 'string') {
        setError('Invalid product slug');
        setLoading(false);
        return;
      }

      const fetchedProduct = await fetchProduct(slug);
      if (!fetchedProduct) {
        setError('Product not found');
        setLoading(false);
        return;
      }

      setProduct(fetchedProduct);
      setLoading(false);
    }
    loadProduct();
  }, [params]);

  // Handle Add to Cart
  async function handleAddToCart(productId) {
    if (!sessionId) {
      alert('Session not ready. Please try again.');
      return;
    }

    try {
      const response = await fetch('/api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      alert('Product added to cart successfully!');
      router.push('/cart'); // Redirect to cart page
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    }
  }

  if (loading) {
    return <div className="text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-red-500">Product not found</div>;
  }

  return (
    <main className="min-h-screen mx-auto">
      <div className="w-full flex flex-col md:flex-row">
        {/* Left Side: Main Image + All Images */}
        <div className="w-1/2">
          {product.images.length > 0 ? (
            <div className="flex flex-col">
              {/* Main Image */}
              <img
                src={product.images[0].url}
                alt={product.images[0].altText ?? product.name}
                className="w-full h-auto max-h-[44rem] object-cover pl-40"
              />
              {/* All Images */}
              {product.images.length > 1 && (
                <div className="flex flex-col">
                  {product.images.slice(1).map((image) => (
                    <img
                      key={image.url}
                      src={image.url}
                      alt={image.altText ?? product.name}
                      className="w-full h-auto max-h-[45rem] object-cover pl-40"
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-80 bg-black/10 flex items-center justify-center">
              No image
            </div>
          )}
        </div>

        {/* Right Side: Product Details (Sticky) */}
        <div className="w-1/2 flex flex-col gap-4 md:sticky md:top-4 md:self-start py-33 pl-35 pr-48">
          <h1>{product.name}</h1>
          <p className="text-sm">
            ${(product.priceCents / 100).toLocaleString()}
          </p>
          <p className="text-gray-700 text-xs">{product.description}</p>

          <ul className="text-gray-600 text-sm">
            {product.color && <li>Color: {product.color}</li>}
            {product.size && <li>Size: {product.size}</li>}
            {product.gender && <li>Gender: {product.gender}</li>}
            {product.stock != null && <li>Stock: {product.stock}</li>}
          </ul>

          <button
            className="mt-4 bg-black text-white px-6 py-2.5 hover:bg-gray-800 transition text-sm"
            onClick={() => handleAddToCart(product.id)}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </main>
  );
}