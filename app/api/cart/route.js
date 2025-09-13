import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request) {
  try {
    const sessionId = request.headers.get('x-session-id');
    if (!sessionId) {
      console.log('GET /api/cart: No sessionId provided');
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: {
            product: {
              include: { images: true },
            },
          },
        },
      },
    });

    
    return NextResponse.json(cart || { items: [] }, { status: 200 });
  } catch (error) {
    console.error('GET /api/cart: Error fetching cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const sessionId = request.headers.get('x-session-id');
    const { cartItemId } = await request.json();

    if (!sessionId || !cartItemId) {
      console.log('DELETE /api/cart: Missing sessionId or cartItemId');
      return NextResponse.json({ error: 'Session ID and cart item ID required' }, { status: 400 });
    }

    // Verify cart exists
    const cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: { items: true },
    });

    if (!cart) {
      console.log('DELETE /api/cart: Cart not found for sessionId:', sessionId);
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    // Verify item exists in cart
    const itemExists = cart.items.some((item) => item.id === cartItemId);
    if (!itemExists) {
      console.log('DELETE /api/cart: Cart item not found:', cartItemId);
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
    }

    // Delete the cart item
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    // Fetch updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: {
            product: {
              include: { images: true },
            },
          },
        },
      },
    });

    console.log('DELETE /api/cart: Updated cart:', JSON.stringify(updatedCart, null, 2)); // Debug log
    return NextResponse.json(updatedCart || { items: [] }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/cart: Error removing cart item:', error);
    return NextResponse.json({ error: 'Failed to remove item' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const sessionId = request.headers.get('x-session-id');
    const { cartItemId, action } = await request.json();

    // Check if required data is provided
    if (!sessionId || !cartItemId || !['increment', 'decrement'].includes(action)) {
      console.log('PATCH /api/cart: Missing or invalid sessionId, cartItemId, or action', { sessionId, cartItemId, action });
      return NextResponse.json({ error: 'Session ID, cart item ID, and valid action required' }, { status: 400 });
    }

    // Check if the cart exists
    const cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: { items: true },
    });

    if (!cart) {
      console.log('PATCH /api/cart: Cart not found for sessionId:', sessionId);
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    // Check if the cart item exists
    const cartItem = cart.items.find((item) => item.id === cartItemId);
    if (!cartItem) {
      console.log('PATCH /api/cart: Cart item not found:', cartItemId);
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
    }

    // Prevent decrementing below 1
    if (action === 'decrement' && cartItem.quantity <= 1) {
      console.log('PATCH /api/cart: Cannot decrement quantity below 1 for cartItemId:', cartItemId);
      return NextResponse.json({ error: 'Cannot decrement quantity below 1' }, { status: 400 });
    }

    // Update the quantity (increment or decrement)
    const updatedQuantity = action === 'increment' ? cartItem.quantity + 1 : cartItem.quantity - 1;
    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: updatedQuantity },
    });

    // Fetch the updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: {
            product: {
              include: { images: true },
            },
          },
        },
      },
    });

    console.log('PATCH /api/cart: Updated cart:', JSON.stringify(updatedCart, null, 2));
    return NextResponse.json(updatedCart || { items: [] }, { status: 200 });
  } catch (error) {
    console.error('PATCH /api/cart: Error updating cart item:', error);
    return NextResponse.json({ error: 'Failed to update quantity' }, { status: 500 });
  }
}