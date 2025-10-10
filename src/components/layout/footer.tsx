
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold font-headline">{APP_NAME}</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your premier destination for the latest tech gadgets and electronics. Delivering across Pakistan with fast, reliable shipping.
            </p>
          </div>
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
