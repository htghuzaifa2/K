
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/theme-provider';
import { CartProvider } from '@/context/cart-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { APP_NAME } from '@/lib/constants';
import { ScrollToTop } from '@/components/scroll-to-top';
import ExternalPrefetch from "@/components/ExternalPrefetch";
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

const logoUrl = '/favicon.ico';

export const metadata: Metadata = {
  metadataBase: new URL(`https://www.${APP_NAME}`),
  title: {
    default: `${APP_NAME} - Pakistan's Tech & Gadgets Store`,
    template: `%s | ${APP_NAME}`,
  },
  description: 'Shop the latest tech, gadgets, and accessories in Pakistan at kimi.pk. Discover curated electronics, expert blogs, and free online tools.',
  manifest: '/manifest.json',
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  icons: {
    icon: logoUrl,
    shortcut: logoUrl,
    apple: logoUrl,
  },
  openGraph: {
    title: {
      default: `${APP_NAME} - Pakistan's Tech & Gadgets Store`,
      template: `%s | ${APP_NAME}`,
    },
    description: 'Shop the latest tech, gadgets, and accessories in Pakistan at kimi.pk. Discover curated electronics, expert blogs, and free online tools.',
    url: `https://www.${APP_NAME}`,
    siteName: APP_NAME,
    images: [
      {
        url: logoUrl,
        width: 1200,
        height: 630,
        alt: `${APP_NAME} Logo`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: `${APP_NAME} - Pakistan's Tech & Gadgets Store`,
      template: `%s | ${APP_NAME}`,
    },
    description: 'Shop the latest tech, gadgets, and accessories in Pakistan at kimi.pk. Discover curated electronics, expert blogs, and free online tools.',
    images: [logoUrl],
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${roboto.variable} scroll-smooth`}>
      <head>
        <meta name="theme-color" content="#F26322" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://i.postimg.cc" />
        <link rel="dns-prefetch" href="https://i.postimg.cc" />
         <link rel="preconnect" href="https://static.cloudflareinsights.com" />
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
      </head>
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
            <ExternalPrefetch />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
