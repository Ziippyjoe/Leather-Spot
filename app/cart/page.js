'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSessionId } from '@/lib/useSessionId';

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sessionId = useSessionId();

  // Fetch cart data when sessionId is available
  useEffect(() => {
    async function fetchCart() {
      if (!sessionId) {
        console.log('No sessionId available');
        setError('Session not ready');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching cart with sessionId:', sessionId);
        const response = await fetch('/api/cart', {
          headers: { 'x-session-id': sessionId },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch cart: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Cart API response:', JSON.stringify(data, null, 2));
        setCart(data);
        setError(null); // Clear error on successful fetch
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError(err.message);
        setLoading(false);
      }
    }
    // Only fetch if sessionId is not a temporary UUID (contains at least one hyphen)
    if (sessionId && sessionId.includes('-')) {
      fetchCart();
    }
  }, [sessionId]);

  // Handle removing an item
  async function handleRemoveItem(cartItemId) {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({ cartItemId }),
      });
      if (!response.ok) {
        throw new Error('Failed to remove item');
      }
      const updatedCart = await response.json();
      console.log('Updated cart after removal:', JSON.stringify(updatedCart, null, 2));
      setCart(updatedCart);
      setError(null); // Clear error
      alert('Item removed from cart');
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Failed to remove item. Please try again.');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen mx-auto max-w-7xl px-4 py-12 text-gray-500 text-center text-2xl bg-white">
        Loading cart...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen mx-auto max-w-7xl px-4 py-12 text-red-500 text-center text-2xl bg-white">
        Error: {error}
      </div>
    );
  }

  if (!cart || !Array.isArray(cart?.items) || cart.items.length === 0) {
    return (
      <div className="min-h-screen mx-auto max-w-7xl px-4 py-12 bg-white">
        <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Calculate total
  const totalPrice = cart.items.reduce((sum, item) => {
    return sum + (item.product?.priceCents || 0) * item.quantity;
  }, 0);

  return (
    <main className="min-h-screen mx-auto max-w-7xl px-4 py-12 bg-white">
      <h1 className="text-lg mb-8 font-sans">Your Shopping Cart</h1>
      <div className="flex flex-col">
        {cart.items.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row gap-4 items-start border-b border-black/20 py-7">
            {/* Item Image */}
            {item.product?.images?.length > 0 ? (
              <img
                src={item.product.images[0].url}
                alt={item.product.name || 'Product image'}
                className="w-24 h-24 object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-gray-500">
                No image
              </div>
            )}
            {/* Item Details */}
            <div className="flex-1">
              <h2 className="font-mono uppercase text-sm">{item.product?.name || 'Unknown Product'}</h2>
              <p className="text-gray-600 text-sm">
                ${((item.product?.priceCents || 0) / 100).toLocaleString()} x {item.quantity}
              </p>
              <p className="text-gray-600 font-medium text-sm">
                Total: ${(((item.product?.priceCents || 0) * item.quantity) / 100).toLocaleString()}
              </p>
              <span className='flex gap-1.5 items-baseline'>
                <button className='border border-black/40 hover:border-black transition h-5 w-5.5 flex justify-center items-center text-xs'>
                    -1
                </button>
                <button className='border border-black/40 hover:border-black transition h-5 w-5.5 flex justify-center items-center text-xs'>
                    +1
                </button>
                <button
                    className="mt-2 text-red-500 hover:underline text-sm ml-4"
                    onClick={() => handleRemoveItem(item.id)}
                >
                    Remove
                </button>
              </span>
              
            </div>
          </div>
        ))}
        {/* Cart Total */}
        <div className="mt-12">
          <p className="text-lg font-sans">
            Total: ${(totalPrice / 100).toLocaleString()}
          </p>
        </div>
        {/* Actions */}
        <div className="mt-4 flex gap-4 text-sm">
          <Link
            href="/"
            className="bg-gray-200 text-gray-800 px-6 py-2 hover:bg-gray-300 transition"
          >
            Continue Shopping
          </Link>
          <button className="bg-black text-white px-6 py-2 hover:bg-black/75 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
}