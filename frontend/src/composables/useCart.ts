import { inject, provide, reactive, type InjectionKey } from "vue";

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

export function useProvideCart(): CartContextValue {
  const items = reactive<CartItem[]>([]);

  function addItem(item: CartItem) {
    const existingItem = items.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
      return;
    }

    items.push(item);
  }

  function removeItem(id: string) {
    const itemIndex = items.findIndex((item) => item.id === id);
    if (itemIndex !== -1)
      items.splice(itemIndex, 1);
  }

  function updateQuantity(id: string, quantity: number) {
    const item = items.find((cartItem) => cartItem.id === id);
    if (!item)
      return;

    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    item.quantity = quantity;
  }

  function clearCart() {
    items.splice(0);
  }

  const cart = { items, addItem, removeItem, updateQuantity, clearCart };
  provideCart(cart);

  return cart;
}

export function formatPrice(n: number) {
  return `₱${n.toFixed(2)}`;
}
