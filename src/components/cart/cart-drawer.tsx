
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollArea } from '../ui/scroll-area';
import { UpdateItemQuantity } from './update-item-quantity';
import { WHATSAPP_PHONE_NUMBER, WHATSAPP_MESSAGE_HEADER, BLUR_DATA_URL } from '@/lib/constants';
import { Separator } from '../ui/separator';

type CartDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { cartItems, cartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    const itemsText = cartItems
      .map(
        (item) =>
          `- ${item.product.name} (x${item.quantity}) - PKR ${item.product.price * item.quantity}`
      )
      .join('\n');
    const totalText = `\n*Total: PKR ${cartTotal}*`;
    const message = `${WHATSAPP_MESSAGE_HEADER}\n\n${itemsText}\n${totalText}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-grow pr-4">
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.images[0].altText}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        data-ai-hint="product image"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                      />
                    </div>
                    <div className="flex-grow">
                      <Link href={`/products/${item.product.slug}`} className="font-medium hover:underline">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">PKR {item.product.price}</p>
                      <UpdateItemQuantity productId={item.product.id} quantity={item.quantity} />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto flex-col gap-4">
              <Separator />
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>PKR {cartTotal}</span>
              </div>
              <Button onClick={handleCheckout} className="w-full">
                Checkout via WhatsApp
              </Button>
              <Button variant="outline" onClick={clearCart}>
                Clear Cart
              </Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-grow flex-col items-center justify-center gap-4 text-center">
            <SheetDescription>Your cart is empty.</SheetDescription>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Continue Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
