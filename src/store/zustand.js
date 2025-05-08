import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useZustandStore = create((set, get) => ({
  user: null,
  cart: [],
  filters: {
    minPrice: "",
    maxPrice: "",
    selectedCategory: "",
    rating: "",
  },

  setCart: (cartItems) =>
    set((state) => ({
      cart: state.cart ? [...state.cart, ...cartItems] : cartItems,
    })),
  clearCart: () => set({ cart: [] }),
  addToCart: (product) => {
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    });
  },
  updateQuantity: (productId, newQuantity) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      ),
    }));
  },
  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    }));
  },

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () =>
    set({
      filters: {
        minPrice: "",
        maxPrice: "",
        selectedCategory: "",
        rating: "",
      },
    }),

  setUser: async (userData) => {
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData });
  },

  loadUser: async () => {
    const storedUser = await AsyncStorage.getItem("user");

    if (storedUser) {
      set({ user: JSON.parse(storedUser) });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("user");
    set({ user: null });
  },
}));
