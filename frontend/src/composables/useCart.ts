import { inject, provide, type InjectionKey } from "vue";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity?: (id: string, quantity: number) => void;
  clearCart?: () => void;
}

export const CartContextKey: InjectionKey<CartContextValue> =
  Symbol("CartContext");

export function useCart(): CartContextValue {
  const ctx = inject(CartContextKey);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function provideCart(value: CartContextValue): void {
  provide(CartContextKey, value);
}
export function formatPrice(n: number) {
  return `₱${n.toFixed(2)}`;
}
