'use client';

import { createContext } from 'react';
import type { CartItem, Miniature } from '@/lib/types';

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Miniature) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);
