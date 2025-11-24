
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Categories',
  description: 'Browse all product categories available at kimi.pk. Find tech, gadgets, accessories, and more.',
};

export default function CategoriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
