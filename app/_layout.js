import { Slot, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import "../config/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartCard from "../src/components/cards/CartCard";
import { useZustandStore } from "../src/store/zustand";
import { STRIPE_PUBLISHABLE_KEY } from "@env";
import { registerForPushNotificationsAsync } from "../src/utils/notifications";
import { StripeProvider } from "@stripe/stripe-react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { cart } = useZustandStore();
  const router = useRouter();

  // useEffect(() => {
  //   if (cart?.length === 0) {
  //     router.replace("/(tabs)/home");
  //   }
  // }, [cart]);
  return (
    <StripeProvider
      publishableKey={STRIPE_PUBLISHABLE_KEY}
      merchantIdentifier="merchant.com.example"
    >
      <QueryClientProvider client={queryClient}>
        <CartCard cartItemCount={cart.length} />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "black",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="myorders/[id]"
            options={{
              title: "Order Details",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="categories"
            options={{
              title: "Categories",
            }}
          />
          <Stack.Screen
            name="cart/index"
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="(auth)/login"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(auth)/SignUp"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(auth)/PasswordReset"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(reviews)/rating-reviews"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(profile)/Settings"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="myorders/index"
            options={{
              title: "",
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="product/[id]"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="product/index"
            options={{
              title: "Products",
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="chat/index"
            options={{
              title: "",
              headerTitleAlign: "center",
            }}
          />
        </Stack>
      </QueryClientProvider>
    </StripeProvider>
  );
}
