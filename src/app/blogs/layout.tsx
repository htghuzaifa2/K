
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Blogs | ${APP_NAME}`,
  description: `Explore tech articles, tutorials, and insights from the ${APP_NAME} team. Your source for the latest in web development, gadgets, and design in Pakistan.`,
  openGraph: {
    title: `Blogs | ${APP_NAME}`,
    description: `Explore tech articles, tutorials, and insights from the ${APP_NAME} team.`,
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
