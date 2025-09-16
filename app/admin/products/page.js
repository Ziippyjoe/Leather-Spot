// app/admin/products/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load products.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 py-20 min-h-screen">
      <h1 className="text-3xl font-mono uppercase mb-10 text-center">Manage Products</h1>
      <Link href="/admin/add-product" className="text-blue-500 hover:underline mb-6 inline-block">Add New Product</Link>
      {products.length === 0 ? (
        <div className="text-gray-500 text-center">No products found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="group block">
              <div className="relative overflow-hidden bg-black/5 h-80 flex items-center justify-center">
                {product.images?.length > 0 ? (
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="text-gray-600">{product.name}</div>
                )}
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm font-mono">{product.name}</p>
                <Link href={`/admin/edit-product/${product.id}`} className="text-blue-500 hover:underline">Edit</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}