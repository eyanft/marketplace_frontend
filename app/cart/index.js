import React from "react";
import { ScrollView, View } from "react-native";
import ItemCard from "../../src/components/cards/ItemCart";
import SectionTitle from "../../src/components/text/CustomText";
import CheckoutButton from "../../src/components/buttons/FilledButton";
import { passOrder } from "../../src/services/order/orderService";
import { router } from "expo-router";
import { useZustandStore } from "../../src/store/zustand";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { getAuth } from "firebase/auth";

export default function Index() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useZustandStore();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const { mutate: submitOrder, isLoading } = useMutation({
    mutationFn: passOrder,
    onSuccess: (data) => {
      Alert.alert("Success", "Your order has been placed.");
      clearCart();
      router.replace("/(tabs)/home");
    },
    onError: (error) => {
      Alert.alert("Error", error.response?.data?.message || "Order failed");
    },
  });
  const onConfirm = () => {
    const firebaseID = getAuth().currentUser?.uid;
    if (!firebaseID) {
      Alert.alert("Error", "You must be logged in to place an order.");
      return;
    }
    const payload = {
      buyer: { firebaseID },
      status: "PENDING",
      orderItems: cart.map((item) => ({
        product: { id: item.id },
        quantity: item.quantity,
      })),
    };

    submitOrder(payload);
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
      <CheckoutButton onPress={onConfirm}>CHECK OUT</CheckoutButton>
    </View>
  );
}
