
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
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
import { ScrollArea } from '@/components/ui/scroll-area';

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

function NavLink({ href, children, className }: { href: string; children: React.ReactNode, className?: string }) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link
            href={href}
            className={cn(
                'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
                isActive ? 'text-primary' : '',
                className
            )}
        >
            {children}
        </Link>
    );
}

function MobileNavLink({ href, children, closeMenu }: { href: string; children: React.ReactNode; closeMenu: () => void }) {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <Link
            href={href}
            onClick={closeMenu}
            className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                isActive ? "text-primary font-semibold" : ""
            )}
        >
            <div className="text-base font-medium">{children}</div>
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
                    <Button variant="ghost" className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary p-0 h-auto focus-visible:ring-0">
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
            <SearchOverlay />
            <CartIcon />
            <ThemeToggle />

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
                <SheetHeader className="p-6 pb-0">
                    <SheetTitle>
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                            <span className="font-bold text-lg font-headline">{APP_NAME}</span>
                        </Link>
                    </SheetTitle>
                </SheetHeader>
              <ScrollArea className="flex-1">
                <nav className="flex flex-col gap-2 p-6">
                  {mainNavItems.map((item) => (
                    <MobileNavLink
                      key={item.href}
                      href={item.href}
                      closeMenu={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </MobileNavLink>
                  ))}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="more-items" className="border-b-0">
                        <AccordionTrigger className="p-3 text-base font-medium hover:no-underline rounded-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            More
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                            <div className="flex flex-col gap-1 pl-4">
                                {moreNavItems.map((item) => (
                                    <MobileNavLink
                                        key={item.href}
                                        href={item.href}
                                        closeMenu={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </MobileNavLink>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
