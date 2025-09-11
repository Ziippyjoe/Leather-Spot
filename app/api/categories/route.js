// app/api/categories/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const includeProducts = url.searchParams.get('includeProducts') === 'true';

    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: includeProducts
        ? {
            products: {
              take: 6,
              orderBy: { createdAt: 'desc' },
              include: {
                images: {
                  where: { isPrimary: true },
                },
              },
            },
          }
        : undefined,
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('GET /api/categories error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
