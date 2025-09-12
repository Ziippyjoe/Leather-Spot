import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const { images, slug, priceCents, categoryId, ...rest } = data;

    const newProduct = await prisma.product.create({
      data: {
        ...rest,
        slug,
        priceCents,
        category: { connect: { id: categoryId } },
        images: {
          create: images.map((url, index) => ({
            url,
            altText: `${rest.name} - Image ${index + 1}`,
            isPrimary: index === 0,
          })),
        },
      },
      include: { images: true, category: true },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}