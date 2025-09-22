'use client';

import { Button, type ButtonProps } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';

type AddToCartButtonProps = {
  product: Product;
} & ButtonProps;

export function AddToCartButton({ product, ...props }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button size="icon" onClick={() => addToCart(product)} {...props}>
      <ShoppingCart className="h-4 w-4" />
      <span className="sr-only">Add to cart</span>
    </Button>
  );
}
