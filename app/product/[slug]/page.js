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
    return <div className="text-gray-500 min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 min-h-screen">{error}</div>;
  }

  if (!product) {
    return <div className="text-red-500 min-h-screen">Product not found</div>;
  }

  return (
    <main className="min-h-screen mx-auto mt-28 pb-38">
      <div className="w-full h-full flex flex-col md:flex-row border-b border-black/10">
        {/* Left Side: Main Image + All Images */}
        <div className="w-full md:w-1/2 bg-black/4">
          {product.images.length > 0 ? (
            <div className="flex flex-col">
              {/* Main Image */}
              <img
                src={product.images[0].url}
                alt={product.images[0].altText ?? product.name}
                className="w-full h-auto max-h-[55rem] object-cover"
              />
              {/* All Images */}
              {product.images.length > 1 && (
                <div className="flex flex-col">
                  {product.images.slice(1).map((image) => (
                    <img
                      key={image.url}
                      src={image.url}
                      alt={image.altText ?? product.name}
                      className="w-full h-auto max-h-[55rem] object-cover"
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
        <div className="w-full md:w-1/2 flex flex-col gap-6 md:sticky md:top-28 md:self-start py-12 px-12 md:px-34 bg-white">
          <h1 className="uppercase font-mono text-2xl font-semibold">{product.name}</h1>
          <div className="border-t border-gray-200"></div>
          
          {/* Price */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-sans text-gray-700">Price</span>
            <span className="text-lg font-medium text-gray-900">
              ${(product.priceCents / 100).toLocaleString()}
            </span>
          </div>

          {/* Description */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-mono text-gray-700 mb-2">Description</h3>
            <p className="text-sm font-sans text-gray-600">{product.description}</p>
          </div>

          {/* Product Details */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-mono text-gray-700 mb-2">Details</h3>
            <ul className="text-sm font-sans text-gray-600 space-y-1">
              {product.color && <li>Color: {product.color}</li>}
              {product.size && <li>Size: {product.size}</li>}
              {product.gender && <li>Gender: {product.gender}</li>}
              {product.stock != null && (
                <li>Availability: {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</li>
              )}
              <li>Material: Premium Full-Grain Leather</li>
              <li>Origin: Handcrafted in Craftsville, USA</li>
            </ul>
          </div>

          {/* Care Instructions */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-mono text-gray-700 mb-2">Care Instructions</h3>
            <ul className="text-sm font-sans text-gray-600 space-y-1">
              <li>Keep away from excessive moisture.</li>
              <li>Use a leather conditioner every 6 months.</li>
              <li>Store in a dust bag when not in use.</li>
            </ul>
          </div>

          {/* Shipping Info */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-mono text-gray-700 mb-2">Shipping & Returns</h3>
            <ul className="text-sm font-sans text-gray-600 space-y-1">
              <li>Free shipping on orders over $1,000.</li>
              <li>30-day return policy for unused items.</li>
              <li>Estimated delivery: 3-5 business days.</li>
            </ul>
          </div>

          {/* Add to Cart Button */}
          <div className="border-t border-gray-200 pt-4">
            <button
              className="w-full bg-black text-white px-6 py-3.5 hover:bg-gray-800 transition text-sm font-sans cursor-pointer"
              onClick={() => handleAddToCart(product.id)}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          {/* Back to Shop Link */}
          <div className="border-t border-gray-200 pt-4 text-center">
            <Link
              href="/shop"
              className="text-sm font-sans text-gray-600 hover:underline hover:text-black transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}