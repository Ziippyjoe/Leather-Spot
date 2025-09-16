// app/api/add-product/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        priceCents: body.priceCents,
        categoryId: body.categoryId,
        gender: body.gender,
        size: body.size,
        color: body.color,
        style: body.style,
        stock: body.stock,
        isFeatured: body.isFeatured,
        isArchived: body.isArchived,
        createdById: body.createdById || null, // Set to null if no auth
        images: {
          create: body.images.map((img) => ({
            url: img.url,
            publicId: img.public_id || null,
            altText: img.altText,
            isPrimary: img.isPrimary,
          })),
        },
      },
      include: { category: true, images: true },
    });

    revalidatePath('/');
    revalidatePath(`/${product.category.slug}`);
    revalidatePath(`/new-arrival/${product.slug}`);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: `Failed to create product: ${error.message}` }, { status: 500 });
  }
}