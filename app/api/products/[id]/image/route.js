// app/api/products/[id]/image/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';

export async function DELETE(request, { params }) {
  const { id } = await params; // Await params to resolve the Promise
  const productId = parseInt(id);
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
  }

  try {
    // Find the image in the database to get publicId
    const image = await prisma.image.findFirst({
      where: { url: imageUrl, productId },
    });

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Use publicId if available, else extract from URL
    let publicId = image.publicId;
    if (!publicId) {
      const publicIdMatch = imageUrl.match(/\/v\d+\/([^/]+)\.\w{3,4}$/);
      if (!publicIdMatch) {
        return NextResponse.json({ error: 'Invalid image URL' }, { status: 400 });
      }
      publicId = publicIdMatch[1];
    }

    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== 'ok') {
      return NextResponse.json({ error: 'Failed to delete image from Cloudinary' }, { status: 500 });
    }

    // Delete the image from the Image table
    await prisma.image.deleteMany({
      where: { url: imageUrl, productId },
    });

    // Fetch product for revalidation
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { category: true },
    });

    if (product) {
      revalidatePath('/');
      revalidatePath(`/${product.category.slug}`);
      revalidatePath(`/new-arrival/${product.slug}`);
    }

    return NextResponse.json({ message: 'Image deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Failed to delete image: ' + error.message }, { status: 500 });
  }
}