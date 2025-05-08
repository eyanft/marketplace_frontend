import { Slot, Stack } from "expo-router";
import "../config/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartCard from "../src/components/cards/CartCard";
import { useZustandStore } from "../src/store/zustand";

export default function RootLayout() {
  const queryClient = new QueryClient();
  const { cart } = useZustandStore();
  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
      <CartCard cartItemCount={cart.length} />
    </QueryClientProvider>
  );
}
