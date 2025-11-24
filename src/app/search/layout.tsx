
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Search',
  description: `Search for products on ${APP_NAME}. Find exactly what you're looking for from our wide range of tech and gadgets.`,
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
