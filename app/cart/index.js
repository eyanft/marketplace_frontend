import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import ItemCard from "../../src/components/cards/ItemCart";
import SectionTitle from "../../src/components/text/CustomText";
import CheckoutButton from "../../src/components/buttons/FilledButton";
import { passOrder } from "../../src/services/order/orderService";
import { createPayment } from "../../src/services/payment/paymentService";
import { router } from "expo-router";
import { useZustandStore } from "../../src/store/zustand";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { getAuth } from "firebase/auth";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

export default function Index() {
  const { cart, updateQuantity, removeFromCart, clearCart, user } =
    useZustandStore();
  const [processing, setProcessing] = useState(false);
  console.log("Cart items:", user);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const firebaseID = user.firebaseID;
  const email = user?.email;
  const payload = {
    buyer: { firebaseID, email },
    totalAmount,
    orderItems: cart.map((item) => ({
      product: { id: item.id },
      quantity: item.quantity,
    })),
  };

  const { mutate: submitOrder, isLoading } = useMutation({
    mutationFn: createPayment,
    onSuccess: async (data) => {
      // data.data now contains { clientSecret: "...", paymentIntentId: "..." }
      await initPaymentSheet({
        paymentIntentClientSecret: data.data.clientSecret,
        merchantDisplayName: "Mercs",
      });

      const { error } = await presentPaymentSheet();

      // Store the clean PaymentIntent ID
      payload.stripePaymentIntentId = data.data.paymentIntentId;
      console.log("Payload with PaymentIntent ID:", payload);

      if (!error) {
        await passOrder(payload);
        Alert.alert("Success", "Your order has been placed.");

        clearCart();
        router.replace("/(tabs)/home");
      }
    },
    onError: (error) => {
      Alert.alert("Error", error.response?.data?.message || "Order failed");
    },
  });
  const onConfirm = () => {
    if (processing || isLoading) return;
    setProcessing(true);
    try {
      if (!firebaseID) {
        Alert.alert("Error", "You must be logged in to place an order.");
        return;
      }

      submitOrder(payload);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <View className="pt-24 p-2 gap-2">
      <SectionTitle className="text-5xl font-bold">My Bag</SectionTitle>
      <ScrollView
        className=" mt-4  h-2/3 "
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-4">
          {cart?.map((item, idx) => (
            <ItemCard
              key={idx}
              edit={true}
              product={item}
              onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
              onDecrease={() => {
                if (item.quantity > 1) {
                  updateQuantity(item.id, item.quantity - 1);
                } else {
                  removeFromCart(item.id);
                }
              }}
            />
          ))}
        </View>
      </ScrollView>
      <View className="flex flex-row justify-between w-full mt-4">
        <SectionTitle className="text-xl font-semibold opacity-50">
          Total Amount:
        </SectionTitle>
        <SectionTitle className="text-xl font-semibold ">
          {totalAmount} DT
        </SectionTitle>
      </View>
      <CheckoutButton disabled={isLoading || processing} onPress={onConfirm}>
        PURCHASE
      </CheckoutButton>
    </View>
  );
}
