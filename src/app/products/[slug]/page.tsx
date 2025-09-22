import { getProductBySlug } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AddToCartButton } from '@/components/product/add-to-cart-button';
import { RelatedProducts } from '@/components/product/related-products';
import { Suspense } from 'react';
import { Separator } from '@/components/ui/separator';

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
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
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-4xl">{product.name}</CardTitle>
              <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{product.description}</CardDescription>
              <div className="mt-6">
                <AddToCartButton product={product} size="lg">
                  Add to Cart
                </AddToCartButton>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Separator className="my-12" />
      <Suspense fallback={<p className="text-center">Loading recommendations...</p>}>
        <RelatedProducts currentProduct={product} />
      </Suspense>
    </div>
  );
}
