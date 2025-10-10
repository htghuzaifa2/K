
'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { CartIcon } from '@/components/cart/cart-icon';
import { SearchOverlay } from '@/components/search/search-overlay';
import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'All Products', href: '/products' },
];

const categoryItems = [
    { name: 'Lawn Suits', href: '/products/category/lawn-suits' },
    { name: 'Bridal Dresses', href: '/products/category/bridal-dresses' },
];

const otherNavItems = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-lg font-headline">{APP_NAME}</span>
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
             <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus:outline-none">
                Categories <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categoryItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href}>{item.name}</Link>
                    </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {otherNavItems.map((item) => (
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
