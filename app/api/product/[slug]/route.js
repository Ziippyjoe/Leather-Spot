import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { slug } = await params; // Await params
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'Invalid product slug' }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { slug },
      include: { images: true },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}