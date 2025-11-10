
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Blogs',
  description: `Explore articles, tutorials, and insights on the latest in tech, web development, and gadgets in Pakistan from the ${APP_NAME} team.`,
  openGraph: {
    title: `Blogs - ${APP_NAME}`,
    description: `Explore articles, tutorials, and insights on the latest in tech from ${APP_NAME}.`,
    url: `https://www.${APP_NAME}/blogs`,
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
