import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 7.25a6.1 6.1 0 0 0-4.25-4.25C13.5 2 12 3.5 12 6.5v6.5a4.5 4.5 0 1 0 4.5 4.5c0-1.74-1.46-3-3-3a3 3 0 0 0-3 3V10a1 1 0 0 1-1-1V6.5a4.5 4.5 0 1 1 9 0Z" />
    </svg>
)

export function Footer() {
  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold font-headline">{APP_NAME}</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your premier destination for the latest trends in Pakistani fashion. Delivering across Pakistan with fast, reliable shipping.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Learn More</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Shipping Policy</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Return Policy</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Follow Us</h3>
              <div className="mt-4 flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">Facebook</span><Facebook className="h-6 w-6" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">Instagram</span><Instagram className="h-6 w-6" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">X (Twitter)</span><Twitter className="h-6 w-6" /></Link>
                <Link href="#" className="text-muted-foreground hover:text-primary"><span className="sr-only">TikTok</span><TikTokIcon className="h-6 w-6" /></Link>
              </div>
            </div>
             <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact Us</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="mailto:contact@kimi.pk" className="text-sm text-muted-foreground hover:text-primary">contact@kimi.pk</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
