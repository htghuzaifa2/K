'use client';

import { getProductBySlug } from '@/lib/products';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AddToCartButton } from '@/components/product/add-to-cart-button';
import { RelatedProducts } from '@/components/product/related-products';
import { Suspense, useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { AppProduct } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Maximize } from 'lucide-react';
import { FullscreenImage } from '@/components/product/fullscreen-image';
import ProductLoading from './loading';

export default function ProductPage() {
  const [product, setProduct] = useState<AppProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      setLoading(true);
      const fetchedProduct = await getProductBySlug(slug);
      setProduct(fetchedProduct);
      setLoading(false);
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return <ProductLoading />;
  }

  if (!product) {
    notFound();
  }

  const hasDetails = product.longDescription || (product.specifications && Object.keys(product.specifications).length > 0);

  return (
    <>
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((img, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <CardContent className="relative aspect-square p-0">
                      <Image
                        src={img}
                        alt={`${product.name} image ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        data-ai-hint="product image"
                      />
                       <div className="absolute top-2 left-2 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white">
                        ID: {product.id}
                      </div>
                      <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/75 hover:text-white"
                          onClick={() => setFullscreenImage(img)}
                        >
                          <Maximize className="h-4 w-4" />
                          <span className="sr-only">View fullscreen</span>
                        </Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div>
          <Card className="flex h-full flex-col">
            <CardHeader>
              <CardTitle className="font-headline text-4xl">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <CardDescription className="text-base">{product.description}</CardDescription>
              <p className="text-3xl font-bold text-primary">PKR {product.price}</p>
            </CardContent>
            <div className="p-6 pt-0">
              <AddToCartButton product={product} size="lg" className="w-full">
                Add to Cart
              </AddToCartButton>
            </div>
          </Card>
        </div>
      </div>
      
      {hasDetails && (
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList>
              {product.longDescription && <TabsTrigger value="description">Description</TabsTrigger>}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              )}
            </TabsList>
            {product.longDescription && (
              <TabsContent value="description">
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose max-w-none text-card-foreground" dangerouslySetInnerHTML={{ __html: product.longDescription.replace(/\n/g, '<br />') }} />
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <TabsContent value="specifications">
                 <Card>
                  <CardContent className="pt-6">
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
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      )}

      <Separator className="my-12" />
      <Suspense fallback={<p className="text-center">Loading recommendations...</p>}>
        <RelatedProducts currentProduct={product} />
      </Suspense>
    </div>
    <FullscreenImage
        imageUrl={fullscreenImage}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setFullscreenImage(null);
          }
        }}
      />
    </>
  );
}
