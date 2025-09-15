'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { CheckoutSheet } from './checkout-sheet';
import { SheetTrigger } from './ui/sheet';

export function CartButton() {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <CheckoutSheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {itemCount}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
    </CheckoutSheet>
  );
}
