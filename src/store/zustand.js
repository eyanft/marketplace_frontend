import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useZustandStore = create((set, get) => ({
  user: null,

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
