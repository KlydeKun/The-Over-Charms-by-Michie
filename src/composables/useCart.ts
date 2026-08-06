import {
  computed,
  inject,
  onMounted,
  provide,
  ref,
  watch,
  type ComputedRef,
  type InjectionKey,
  type Ref,
} from "vue";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartContextValue {
  items: Ref<CartItem[]>;
  totalItems: ComputedRef<number>;
  subTotal: ComputedRef<number>;
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
  const STORAGE_KEY = "the-oven-charm-v1";
  const items = ref<CartItem[]>([]);

  const totalItems = computed<number>(() =>
    items.value.reduce((total, item) => total + item.quantity, 0),
  );

  const subTotal = computed<number>(() =>
    items.value.reduce((total, item) => total + item.price * item.quantity, 0),
  );

  function addItem(item: CartItem) {
    const existingItem = items.value.find(
      (cartItem) => cartItem.id === item.id,
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
      return;
    }

    items.value.push(item);
  }

  function removeItem(id: string) {
    const itemIndex = items.value.findIndex((item) => item.id === id);
    if (itemIndex !== -1) items.value.splice(itemIndex, 1);
  }

  function updateQuantity(id: string, quantity: number) {
    const item = items.value.find((cartItem) => cartItem.id === id);
    if (!item) return;

    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    item.quantity = quantity;
  }

  function clearCart() {
    items.value.splice(0);
  }

  onMounted(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        items.value = JSON.parse(raw);
      }
    } catch (error) {
      console.error("Failed to parse storage:", error);
    }
  });

  watch(
    items,
    (newLines) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newLines));
      } catch (error) {
        console.error("Failed to save to storage:", error);
      }
    },
    { deep: true },
  );

  const cart = {
    items,
    totalItems,
    subTotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
  provideCart(cart);

  return cart;
}

export function formatPrice(n: number) {
  return `₱${n.toFixed(2)}`;
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
