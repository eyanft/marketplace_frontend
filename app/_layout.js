import { Slot, Stack, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import "../config/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartCard from "../src/components/cards/CartCard";
import { useZustandStore } from "../src/store/zustand";
import { registerForPushNotificationsAsync } from "../src/utils/notifications";
import { Colors } from "../config/colors";

export default function RootLayout() {
  const queryClient = new QueryClient();
  const { cart } = useZustandStore();
  const router = useRouter();

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
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
          name="categories"
          options={{
            title: "Categories",
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
            headerShown: false,
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
            headerShown: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
