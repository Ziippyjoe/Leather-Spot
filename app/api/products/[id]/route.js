// app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';

export async function GET(request, { params }) {
  const { id } = await params; // Await params to resolve the Promise

  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { 
        category: true,
        images: true,
      },
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

export async function PUT(request, { params }) {
  const { id } = await params; // Await params
  const body = await request.json();

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { images: true },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const existingUrls = existingProduct.images.map(img => img.url);
    const newUrls = body.images.map(img => img.url);
    const imagesToDelete = existingProduct.images.filter(img => !newUrls.includes(img.url));

    for (const img of imagesToDelete) {
      const publicId = img.publicId || (img.url.match(/\/v\d+\/([^/]+)\.\w{3,4}$/)?.[1]);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
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
        images: {
          deleteMany: {
            url: { notIn: body.images.map(img => img.url) },
          },
          upsert: body.images.map((img, index) => ({
            where: { id: img.id || 0 },
            update: {
              url: img.url,
              publicId: img.public_id || null, // Store public_id
              altText: img.altText || `${body.name} - Image ${index + 1}`,
              isPrimary: img.isPrimary || index === 0,
            },
            create: {
              url: img.url,
              publicId: img.public_id || null, // Store public_id
              altText: img.altText || `${body.name} - Image ${index + 1}`,
              isPrimary: img.isPrimary || index === 0,
            },
          })),
        },
      },
      include: { category: true, images: true },
    });

    revalidatePath('/');
    revalidatePath(`/${updatedProduct.category.slug}`);
    revalidatePath(`/new-arrival/${updatedProduct.slug}`);

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params; // Await params

  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: true, images: true },
    });
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    for (const img of product.images || []) {
      const publicId = img.publicId || (img.url.match(/\/v\d+\/([^/]+)\.\w{3,4}$/)?.[1]);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await prisma.product.delete({ where: { id: parseInt(id) } });

    revalidatePath('/');
    revalidatePath(`/${product.category.slug}`);

    return NextResponse.json({ message: 'Product deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}