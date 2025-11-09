
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollArea } from '../ui/scroll-area';
import { UpdateItemQuantity } from './update-item-quantity';
import { WHATSAPP_PHONE_NUMBER, WHATSAPP_MESSAGE_HEADER, BLUR_DATA_URL } from '@/lib/constants';
import { Separator } from '../ui/separator';
import { CreditCard, ShoppingCart, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

type CartDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { cartItems, subtotal, shippingCost, total, clearCart, removeFromCart } = useCart();

  const handleCheckout = () => {
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
    const codNote = `\n(Note: An additional Rs. 50 fee applies for Cash on Delivery orders)`;
    
    const message = `${WHATSAPP_MESSAGE_HEADER}\n\n${itemsText}\n${breakdownText}${codNote}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Your Cart ({cartItems.length})</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-grow pr-6">
              <div className="flex flex-col gap-5 py-6">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-start gap-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.images[0].altText}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        data-ai-hint="product image"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                      />
                    </div>
                    <div className="flex flex-grow flex-col gap-2">
                       <div className="flex items-start justify-between">
                         <Link href={`/products/${item.product.slug}`} className="font-semibold hover:underline" onClick={() => onOpenChange(false)}>
                            {item.product.name}
                          </Link>
                         <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground" onClick={() => removeFromCart(item.product.id)}>
                            <X className="h-4 w-4" />
                            <span className="sr-only">Remove item</span>
                         </Button>
                       </div>
                      <p className="text-sm text-muted-foreground">PKR {item.product.price}</p>
                      <div className="flex items-center justify-between">
                         <UpdateItemQuantity productId={item.product.id} quantity={item.quantity} />
                         <p className="text-sm font-medium">PKR {item.product.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto flex-col gap-4 bg-secondary/50 p-6">
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">Subtotal</p>
                        <p className="font-medium">PKR {subtotal}</p>
                    </div>
                     <div className="flex justify-between">
                        <p className="text-muted-foreground">Shipping</p>
                        <p className="font-medium">PKR {shippingCost}</p>
                    </div>
                     <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
                        <p>Total</p>
                        <p>PKR {total}</p>
                    </div>
                </div>
              <p className="text-center text-xs text-muted-foreground">
                Note: An additional Rs. 50 fee applies for Cash on Delivery orders.
              </p>
              <div className="grid grid-cols-2 gap-4">
                 <Button variant="outline" onClick={clearCart}>
                    <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
                  </Button>
                  <Button onClick={handleCheckout} className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" /> Checkout
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-grow flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-primary/10 p-4 text-primary">
                <ShoppingCart className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some products to get started!</p>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Continue Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
