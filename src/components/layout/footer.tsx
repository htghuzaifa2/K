
import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';

const footerLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Shipping Policy', href: '/shipping-policy' },
    { name: 'Return Policy', href: '/return-policy' },
    { name: 'FAQ', href: '/faq' },
];

export function Footer() {
  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
                {footerLinks.map((link) => (
                    <Link key={link.name} href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                        {link.name}
                    </Link>
                ))}
            </nav>
            <p className="mt-6 text-center text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}
