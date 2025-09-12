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