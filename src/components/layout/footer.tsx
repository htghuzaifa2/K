
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';

const footerLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Shipping Policy', href: '/shipping-policy' },
    { name: 'Return Policy', href: '/return-policy' },
    { name: 'How to Pay', href: '/how-to-pay' },
    { name: 'FAQ', href: '/faq' },
];

export function Footer() {
  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold font-headline">{APP_NAME}</Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Your premier destination for Pakistani fashion.
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="font-semibold tracking-wider text-foreground">Learn More</h3>
                <ul className="mt-4 space-y-2">
                  {footerLinks.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
