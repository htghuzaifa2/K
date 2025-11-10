
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Developer Tools',
  description: `A collection of handy online developer tools for formatting, testing, and generation, provided by ${APP_NAME}.`,
  openGraph: {
    title: `Developer Tools | ${APP_NAME}`,
    description: `A collection of handy online tools for developers and designers, provided by ${APP_NAME}.`,
    url: `https://www.${APP_NAME}/tools`,
  },
};

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
