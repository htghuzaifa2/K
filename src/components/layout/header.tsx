
'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { CartIcon } from '@/components/cart/cart-icon';
import { SearchOverlay } from '@/components/search/search-overlay';
import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'All Products', href: '/products' },
  { name: 'Categories', href: '/categories' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link
            href={href}
            prefetch={false}
            className={cn(
                'relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
                'after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full',
                isActive ? 'text-primary after:w-full' : ''
            )}
        >
            {children}
        </Link>
    );
}

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <span className="font-bold text-lg font-headline">{APP_NAME}</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
                <SearchOverlay />
                <CartIcon />
                <ThemeToggle />
            </div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-6 p-6">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)} prefetch={false}>
                <span className="font-bold text-lg font-headline">{APP_NAME}</span>
              </Link>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                      prefetch={false}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex items-center gap-4 mt-4">
                    <SearchOverlay />
                    <CartIcon />
                    <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
