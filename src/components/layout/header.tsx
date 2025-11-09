
'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { CartIcon } from '@/components/cart/cart-icon';
import { SearchOverlay } from '@/components/search/search-overlay';
import { APP_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const mainNavItems = [
  { name: 'Home', href: '/' },
  { name: 'All Products', href: '/products' },
  { name: 'Categories', href: '/categories' },
];

const moreNavItems = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Shipping Policy', href: '/shipping-policy' },
    { name: 'Return Policy', href: '/return-policy' },
    { name: 'FAQ', href: '/faq' },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link
            href={href}
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
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-lg font-headline">{APP_NAME}</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {mainNavItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.name}
              </NavLink>
            ))}
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary p-0 h-auto">
                        More
                        <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {moreNavItems.map((item) => (
                        <DropdownMenuItem key={item.href} asChild>
                            <Link href={item.href}>{item.name}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
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
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="font-bold text-lg font-headline">{APP_NAME}</span>
              </Link>
                <nav className="flex flex-col gap-4">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="more-items" className="border-b-0">
                        <AccordionTrigger className="text-lg font-medium py-0 hover:no-underline">
                            More
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                            <div className="flex flex-col gap-4 pl-4">
                                {moreNavItems.map((item) => (
                                    <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-lg font-medium text-muted-foreground"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                    {item.name}
                                    </Link>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                  </Accordion>
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
