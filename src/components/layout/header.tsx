'use client';

import Link from 'next/link';
import { Logo } from '@/components/icons';
import { ThemeToggle } from '@/components/theme-toggle';
import { CartIcon } from '@/components/cart/cart-icon';
import { SearchOverlay } from '@/components/search/search-overlay';
import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'All Products', href: '/products' },
  { name: 'Lawn Suits', href: '/products/category/lawn-suits' },
  { name: 'Bridal Dresses', href: '/products/category/bridal-dresses' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">{APP_NAME}</span>
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <SearchOverlay />
          <CartIcon />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
