'use client';

import Image from 'next/image';
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
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { getWhatsAppNumber } from '@/app/dashboard/settings/actions';

export function CheckoutSheet({ children }: { children: ReactNode }) {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } =
    useCart();
  const total = getCartTotal();

  const handleOrder = async () => {
    const adminPhoneNumber = await getWhatsAppNumber();
    let message = 'Hello! I would like to order the following miniatures:\n\n';
    cartItems.forEach((item) => {
      message += `- ${item.name} (x${item.quantity}) - ₹${(
        item.price * item.quantity
      ).toFixed(2)}\n`;
    });
    message += `\nTotal: ₹${total.toFixed(2)}`;
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Sheet>
      {children}
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="pr-6">
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            Review your items and proceed to order.
          </SheetDescription>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1 pr-6">
              <div className="my-4 flex flex-col gap-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                      <Image
                        src={item.imageUrls[0]}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                        data-ai-hint={item.imageHints[0]}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ₹{item.price.toFixed(2)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value))
                          }
                          className="h-8 w-16"
                          aria-label={`Quantity for ${item.name}`}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </div>
                    </div>
                    <p className="font-medium">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto pt-4 pr-6">
              <div className="flex w-full flex-col gap-4">
                <div className="flex justify-between text-lg font-medium">
                  <p>Total</p>
                  <p>₹{total.toFixed(2)}</p>
                </div>
                <Button
                  onClick={handleOrder}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Order on WhatsApp
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <h3 className="text-lg font-medium">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground">
              Add some miniatures to get started!
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
