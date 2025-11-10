
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Tools - ${APP_NAME}`,
  description: `A collection of handy online tools for developers and designers, provided by ${APP_NAME}.`,
  openGraph: {
    title: `Tools - ${APP_NAME}`,
    description: `A collection of handy online tools for developers and designers, provided by ${APP_NAME}.`,
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
