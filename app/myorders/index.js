import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import Title from "../../src/components/text/CustomText";
import OrderCard from "../../src/components/cards/OrderCard";
export default function index() {
  const [active, setActive] = useState(0);

  const handlePress = (index) => {
    setActive(index === active ? null : index);
  };

  return (
    <View className="p-8 mt-16 gap-4">
      <Title className="text-5xl font-medium">My Orders</Title>
      <View className="flex flex-row justify-between mt-4">
        <Pressable
          className={`px-6 h-9  justify-center  rounded-full ${
            active === 0 ? "bg-black" : "bg-transparent"
          }`}
          onPress={() => handlePress(0)}
        >
          <Title className={active === 0 ? "text-white" : "text-black"}>
            Delivered
          </Title>
        </Pressable>

        <Pressable
          className={`px-6 h-9 justify-center rounded-full ${
            active === 1 ? "bg-black" : "bg-transparent"
          }`}
          onPress={() => handlePress(1)}
        >
          <Title className={active === 1 ? "text-white" : "text-black"}>
            Processing
          </Title>
        </Pressable>

        <Pressable
          className={`px-6 h-9 justify-center rounded-full ${
            active === 2 ? "bg-black" : "bg-transparent"
          }`}
          onPress={() => handlePress(2)}
        >
          <Title className={active === 2 ? "text-white" : "text-black"}>
            Canceled
          </Title>
        </Pressable>
      </View>
      <ScrollView
        className=" mt-4  h-2/3 "
        showsVerticalScrollIndicator={false}
      >
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </ScrollView>
    </View>
  );
}
