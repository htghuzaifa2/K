
'use client';

import { useCart } from '@/hooks/use-cart';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { CreditCard, ShoppingCart } from 'lucide-react';
import { WHATSAPP_PHONE_NUMBER, WHATSAPP_MESSAGE_HEADER, BLUR_DATA_URL } from '@/lib/constants';
import { toast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const { cartItems, subtotal, shippingCost, total } = useCart();

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Your cart is empty',
        description: 'Please add items to your cart before checking out.',
      });
      return;
    }

    const itemsText = cartItems
      .map(
        (item) =>
          `- ${item.product.name} (x${item.quantity}) - PKR ${item.product.price * item.quantity}`
      )
      .join('\n');
      
    const breakdownText = `\nSubtotal: PKR ${subtotal}\nShipping: PKR ${shippingCost}\n*Total: PKR ${total}*`;
    const codNote = `\n\n(Note: An additional Rs. 50 fee applies for Cash on Delivery orders, which will be added by our team upon confirmation.)`;
    
    const message = `${WHATSAPP_MESSAGE_HEADER}\n\n${itemsText}\n${breakdownText}${codNote}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  if (cartItems.length === 0) {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
             <div className="flex flex-grow flex-col items-center justify-center gap-4 text-center px-6">
                <div className="rounded-full bg-primary/10 p-4 text-primary">
                    <ShoppingCart className="h-12 w-12" />
                </div>
                <h1 className="text-3xl font-bold font-headline mt-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground max-w-md">Looks like you haven't added anything to your cart yet. Browse our products to find something you like!</p>
                <Button asChild className="mt-4">
                    <Link href="/products">Continue Shopping</Link>
                </Button>
            </div>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold font-headline text-primary tracking-tight">Checkout</h1>
        <p className="mt-3 text-lg text-muted-foreground">Review your order and confirm</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              {cartItems.map(item => (
                <div key={item.product.id} className="flex items-center gap-4 py-4">
                   <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                     <Image
                        src={item.product.images[0].url}
                        alt={item.product.images[0].altText}
                        fill
                        className="object-contain"
                        sizes="80px"
                        data-ai-hint="product image"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                      />
                   </div>
                   <div className="flex-grow">
                     <Link href={`/products/${item.product.slug}`} className="font-semibold hover:underline">
                        {item.product.name}
                     </Link>
                     <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                   </div>
                   <div className="text-right">
                     <p className="font-medium">PKR {item.product.price * item.quantity}</p>
                     <p className="text-sm text-muted-foreground">PKR {item.product.price} each</p>
                   </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
            <Card className="sticky top-20">
                <CardHeader>
                    <CardTitle>Total Cost</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2 text-base">
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Subtotal</p>
                            <p className="font-medium">PKR {subtotal}</p>
                        </div>
                         <div className="flex justify-between">
                            <p className="text-muted-foreground">Shipping</p>
                            <p className="font-medium">PKR {shippingCost}</p>
                        </div>
                    </div>
                    <Separator />
                     <div className="flex justify-between text-xl font-bold">
                        <p>Total</p>
                        <p>PKR {total}</p>
                    </div>
                    <p className="text-xs text-muted-foreground pt-2">
                        Note: An additional Rs. 50 fee for Cash on Delivery will be confirmed by our team via WhatsApp.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button size="lg" className="w-full" onClick={handleConfirmOrder}>
                        <CreditCard className="mr-2 h-5 w-5"/> Confirm Order via WhatsApp
                    </Button>
                </CardFooter>
            </Card>
        </div>

      </div>
    </div>
  );
}
