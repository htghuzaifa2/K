
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function HeaderSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setIsOpen(false);
      return;
    };
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setIsOpen(false);
    setQuery('');
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="flex items-center justify-end">
       <div className={cn(
            "flex items-center transition-all duration-300 ease-in-out",
            isOpen ? "w-40 lg:w-64" : "w-0"
        )}>
            <form onSubmit={handleSearch} className={cn("relative w-full transition-opacity duration-300", isOpen ? "opacity-100" : "opacity-0")}>
                 <Input
                    ref={inputRef}
                    type="search"
                    placeholder="Search products..."
                    className="h-9 pr-10"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onBlur={() => { if(!query) setIsOpen(false) }}
                />
                 <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Search</span>
                </Button>
            </form>
       </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(!isOpen)} 
        className={cn(
            "transition-opacity",
            !isOpen && "md:w-auto"
        )}
       >
        {isOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
        <span className="sr-only">{isOpen ? 'Close search' : 'Open search'}</span>
      </Button>
    </div>
  );
}
