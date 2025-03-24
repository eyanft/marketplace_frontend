import React from "react";
import { ScrollView, View } from "react-native";
import ItemCard from "../../src/components/cards/ItemCart";
import SectionTitle from "../../src/components/text/CustomText";
import CheckoutButton from "../../src/components/buttons/FilledButton";
import { router } from "expo-router";

export default function Index() {
  const onConfirm = () => {
    router.push("/(payment)/Checkout");
  };
  return (
    <View className="pt-24 p-2 gap-2">
      <SectionTitle className="text-5xl font-bold">My Bag</SectionTitle>
      <ScrollView
        className=" mt-4  h-2/3 "
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-4">
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </View>
      </ScrollView>
      <View className="flex flex-row justify-between w-full mt-4">
        <SectionTitle className="text-xl font-semibold opacity-50">
          Total Amount:
        </SectionTitle>
        <SectionTitle className="text-xl font-semibold ">124 DT</SectionTitle>
      </View>
      <CheckoutButton onPress={onConfirm}>CHECK OUT</CheckoutButton>
    </View>
  );
}
