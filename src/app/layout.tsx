
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/theme-provider';
import { CartProvider } from '@/context/cart-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { APP_NAME } from '@/lib/constants';
import { ScrollToTop } from '@/components/scroll-to-top';
import { PrefetchController } from '@/components/prefetch-controller';
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} - Pakistan's Tech & Gadgets Store`,
    template: `%s | ${APP_NAME}`,
  },
  description: 'Shop the latest tech, gadgets, and accessories in Pakistan at kimi.pk. Discover a curated collection of high-quality electronics with seamless online shopping, expert blogs, and free tools.',
  openGraph: {
    title: `${APP_NAME} - Pakistan's Tech & Gadgets Store`,
    description: 'Shop the latest tech, gadgets, and accessories in Pakistan at kimi.pk. Discover a curated collection of high-quality electronics with seamless online shopping, expert blogs, and free tools.',
    url: `https://www.${APP_NAME}`,
    siteName: APP_NAME,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} - Pakistan's Tech & Gadgets Store`,
    description: 'Shop the latest tech, gadgets, and accessories in Pakistan at kimi.pk. Discover a curated collection of high-quality electronics with seamless online shopping, expert blogs, and free tools.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${roboto.variable}`}>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Toaster />
            <ScrollToTop />
            <PrefetchController />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
