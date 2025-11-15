
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `All Categories | ${APP_NAME}`,
  description: `Browse all product categories available at ${APP_NAME}. Find tech, gadgets, accessories, and more.`,
};

export default function CategoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
