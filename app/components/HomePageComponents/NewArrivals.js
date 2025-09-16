import { prisma } from '@/lib/prisma';
import NewArrivalsClient from './NewArrivalsClient';

async function fetchNewArrivals() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    include: { images: true },
  });
  return products;
}

export default async function NewArrivals() {
  const products = await fetchNewArrivals();
  return <NewArrivalsClient products={products} />;
}
