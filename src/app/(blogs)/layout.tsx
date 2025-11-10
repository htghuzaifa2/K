
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Blogs - ${APP_NAME}`,
  description: `Explore articles, tutorials, and insights on the latest in tech from ${APP_NAME}.`,
  openGraph: {
    title: `Blogs - ${APP_NAME}`,
    description: `Explore articles, tutorials, and insights on the latest in tech from ${APP_NAME}.`,
  },
};

export default function BlogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        {children}
    </div>
  );
}
