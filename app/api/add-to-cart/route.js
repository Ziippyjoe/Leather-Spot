import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

// Generate or get sessionId (stored in localStorage)
function getSessionId(request) {
  const sessionId = request.headers.get('x-session-id') || uuidv4();
  return sessionId;
}

export async function POST(request) {
  try {
    const { productId, quantity } = await request.json();
    if (!productId || !Number.isInteger(productId) || !Number.isInteger(quantity) || quantity < 1) {
      return NextResponse.json({ error: 'Invalid product ID or quantity' }, { status: 400 });
    }

    // Check if product exists and has stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, stock: true },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (product.stock != null && product.stock < quantity) {
      return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 });
    }

    // Get or create sessionId for guest cart
    const sessionId = getSessionId(request);

    // Find or create cart
    let cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: { items: true },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { sessionId },
        include: { items: true },
      });
    }

    // Check if product is already in cart
    const existingItem = cart.items.find((item) => item.productId === productId);

    if (existingItem) {
      // Update quantity
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      // Add new cart item
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      });
    }

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

    return NextResponse.json(updatedCart || { items: [] }, { status: 200 });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}