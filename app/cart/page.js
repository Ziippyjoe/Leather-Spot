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

  // Handle incrementing item quantity
  async function handleIncrement(cartItemId) {
    try {
      const response = await fetch('/api/cart', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({ cartItemId, action: 'increment' }),
      });
      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }
      const updatedCart = await response.json();
      console.log('Updated cart after increment:', JSON.stringify(updatedCart, null, 2));
      setCart(updatedCart);
      setError(null); // Clear error
    } catch (err) {
      console.error('Error incrementing item quantity:', err);
      setError('Failed to update quantity. Please try again.');
    }
  }

  // Handle decrementing item quantity
  async function handleDecrement(cartItemId, currentQuantity) {
    if (currentQuantity <= 1) {
      // Optionally remove item if quantity would go below 1
      if (confirm('Do you want to remove this item from the cart?')) {
        handleRemoveItem(cartItemId);
      }
      return;
    }

    try {
      const response = await fetch('/api/cart', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({ cartItemId, action: 'decrement' }),
      });
      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }
      const updatedCart = await response.json();
      console.log('Updated cart after decrement:', JSON.stringify(updatedCart, null, 2));
      setCart(updatedCart);
      setError(null); // Clear error
    } catch (err) {
      console.error('Error decrementing item quantity:', err);
      setError('Failed to update quantity. Please try again.');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen mx-auto max-w-7xl px-4 py-12 text-gray-500 text-center text-sm bg-white flex items-center justify-center">
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
      <div className="min-h-screen mx-auto max-w-7xl pb-20 pt-28 bg-white px-6">
        <h1 className="mb-4 w-full text-sm italic sticky top-0 pt-13 pb-2 bg-white border-b border-black/10 z-20">Shopping Cart</h1>
        <p className="text-gray-500 text-sm">Your cart is empty.</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block text-sm">
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
    <main className="min-h-screen mx-auto max-w-7xl pb-20 pt-24 bg-white px-6">
      <h1 className="mb-4 w-full text-sm italic sticky top-18 pt-13 pb-2 bg-white border-b border-black/10 z-20">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          {cart.items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-4 items-start border-b border-black/15 py-7">
              {/* Item Image */}
              {item.product?.images?.length > 0 ? (
                <img
                  src={item.product.images[0].url}
                  alt={item.product.name || 'Product image'}
                  className="w-37 object-cover bg-black/4"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-gray-500">
                  No image
                </div>
              )}
              {/* Item Details */}
              <div className="flex mt-20 justify-between w-full">
                <span className="flex flex-col gap-3">
                  <h2 className="font-mono uppercase text-xs">{item.product?.name || 'Unknown Product'}</h2>
                  <p className="text-gray-600 text-xs">
                    ${((item.product?.priceCents || 0) / 100).toLocaleString()} x {item.quantity}
                  </p>
                  <span className="flex gap-2">
                    <button
                      className="transition h-6 w-5 font-light font-sans text-2xl flex justify-center items-center cursor-pointer hover:text-gray-800"
                      onClick={() => handleDecrement(item.id, item.quantity)}
                    >
                      -
                    </button>
                    <button
                      className="transition h-6 w-5 text-2xl font-sans font-light flex justify-center items-center cursor-pointer hover:text-gray-800"
                      onClick={() => handleIncrement(item.id)}
                    >
                      +
                    </button>
                  </span>
                </span>
                <span className="flex flex-col justify-between items-baseline">
                  <p className="text-gray-600 font-medium text-xs">
                    ${(((item.product?.priceCents || 0) * item.quantity) / 100).toLocaleString()}
                  </p>
                  <button
                    className="mt-2 text-red-500 hover:underline text-xs ml-4"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Sticky Total and Checkout */}
        <div className="lg:w-97 pl-10">
          <div className="sticky top-38 py-6 border border-black/11 px-6 h-100">
            <div className="flex justify-between items-center italic text-sm font-medium">
              <span>Subtotal</span>
              <span>${(totalPrice / 100).toLocaleString()}</span>
            </div>
            <div className="mt-4 flex flex-col gap-4 text-sm">
              <button className="bg-black text-white px-6 py-3 hover:bg-black/75 transition text-xs font-sans">
                CHECKOUT
              </button>
              <Link
                href="/"
                className="bg-gray-200 text-gray-800 px-6 py-2 hover:bg-gray-300 transition text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}