
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShoppingCart, Share2, Copy } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { AppProduct } from '@/lib/products';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/hooks/use-cart';

type ProductDetailsClientProps = {
  product: AppProduct;
};

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        slug: product.slug,
    };
    addToCart(cartProduct);
  }

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    const onSelect = (api: CarouselApi) => {
      setCurrent(api.selectedScrollSnap() + 1);
    };
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const handleDotClick = (index: number) => {
    api?.scrollTo(index);
  };

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Copied to clipboard!",
      description: "You can now share the link with others.",
    });
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this product: ${product.name}`,
        url: window.location.href,
      }).catch((error) => {
        // Silently fail if the user cancels the share dialog.
        if (error.name !== 'AbortError') {
          console.error(error);
        }
      });
    } else {
      copyUrlToClipboard();
    }
  };

  const hasDetails = product.longDescription || (product.specifications && Object.keys(product.specifications).length > 0);

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <Carousel 
                setApi={setApi} 
                className="w-full"
                opts={{
                    loop: true,
                }}
            >
              <CarouselContent>
                {product.images.map((img, index) => (
                  <CarouselItem key={index}>
                    <Card className="overflow-hidden">
                      <CardContent className="relative aspect-square p-0">
                        <Image
                          src={img}
                          alt={`${product.name} image ${index + 1}`}
                          fill
                          className="object-contain"
                          priority={index === 0}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          data-ai-hint="product image"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
             {product.images.length > 1 && (
              <div className="mt-4 flex justify-center gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={cn(
                      'h-2 w-2 rounded-full transition-all',
                      current === index + 1 ? 'w-4 bg-primary' : 'bg-muted'
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-6">
            <h1 className="font-headline text-4xl font-bold tracking-tight lg:text-5xl">{product.name}</h1>
            <p className="text-3xl font-bold text-primary">PKR {product.price}</p>
            <p className="text-lg text-muted-foreground">{product.description}</p>
            
            <div className="flex items-center gap-4">
              <Button size="lg" className="flex-grow text-lg" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" aria-label="Share" onClick={shareProduct}>
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" aria-label="Copy link" onClick={copyUrlToClipboard}>
                <Copy className="h-5 w-5" />
              </Button>
            </div>

            {hasDetails && (
              <Accordion type="single" collapsible className="w-full">
                {product.longDescription && (
                  <AccordionItem value="description">
                    <AccordionTrigger>Description</AccordionTrigger>
                    <AccordionContent>
                      <div className="prose max-w-none text-card-foreground" dangerouslySetInnerHTML={{ __html: product.longDescription.replace(/\n/g, '<br />') }} />
                    </AccordionContent>
                  </AccordionItem>
                )}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <AccordionItem value="specifications">
                    <AccordionTrigger>Specifications</AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableBody>
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <TableRow key={key}>
                              <TableCell className="font-medium">{key}</TableCell>
                              <TableCell>{value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
