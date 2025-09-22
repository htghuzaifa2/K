'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

type UpdateItemQuantityProps = {
  productId: string;
  quantity: number;
};

export function UpdateItemQuantity({ productId, quantity }: UpdateItemQuantityProps) {
  const { updateQuantity } = useCart();

  return (
    <div className="mt-2 flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-6 w-6"
        onClick={() => updateQuantity(productId, quantity - 1)}
      >
        <Minus className="h-3 w-3" />
        <span className="sr-only">Decrease quantity</span>
      </Button>
      <span className="w-6 text-center text-sm">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-6 w-6"
        onClick={() => updateQuantity(productId, quantity + 1)}
      >
        <Plus className="h-3 w-3" />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  );
}
