
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold font-headline">{APP_NAME}</Link>
            <nav className="flex gap-4">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
              <Link href="/products" className="text-sm text-muted-foreground hover:text-primary">Products</Link>
            </nav>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-right">
            Your premier destination for Pakistani fashion.
          </p>
        </div>
        <div className="mt-6 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
