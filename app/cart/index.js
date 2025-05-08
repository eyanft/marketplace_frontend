import React from "react";
import { ScrollView, View } from "react-native";
import ItemCard from "../../src/components/cards/ItemCart";
import SectionTitle from "../../src/components/text/CustomText";
import CheckoutButton from "../../src/components/buttons/FilledButton";
import { router } from "expo-router";
import { useZustandStore } from "../../src/store/zustand";

export default function Index() {
  const { cart, updateQuantity, removeFromCart } = useZustandStore();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const onConfirm = () => {
    router.replace("/(tabs)/home");
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
