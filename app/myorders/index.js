import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import Title from "../../src/components/text/CustomText";
import OrderCard from "../../src/components/cards/OrderCard";
import { useQuery } from "@tanstack/react-query";
import { useZustandStore } from "../../src/store/zustand";
import {
  getUserListedOrders,
  getUserOrders,
} from "../../src/services/order/orderService";
import { useLocalSearchParams } from "expo-router";
export default function index() {
  const { user } = useZustandStore();
  const [active, setActive] = useState(0);
  const { type } = useLocalSearchParams();
  console.log(type);
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userOrders", user?.firebaseID],
    queryFn: () =>
      type === "seller" ? getUserListedOrders() : getUserOrders(),
    enabled: !!user,
  });
  const handlePress = (index) => {
    setActive(index === active ? null : index);
  };
  const statusMap = {
    0: null,
    1: "COMPLETED",
    2: "PENDING",
    3: "CANCELED",
  };
  const filteredOrders = orders?.filter((order) => {
    const status = statusMap[active];
    return !status || order.status === status;
  });
  return (
    <View className="p-8 mt-16 gap-4">
      <Title className="text-5xl font-medium">My Orders</Title>
      <View className="flex flex-row justify-between mt-4">
        <Pressable
          className={`px-6 h-9  justify-center  rounded-full ${
            active === 1 ? "bg-black" : "bg-transparent"
          }`}
          onPress={() => handlePress(1)}
        >
          <Title className={active === 1 ? "text-white" : "text-black"}>
            Delivered
          </Title>
        </Pressable>

        <Pressable
          className={`px-6 h-9 justify-center rounded-full ${
            active === 2 ? "bg-black" : "bg-transparent"
          }`}
          onPress={() => handlePress(2)}
        >
          <Title className={active === 2 ? "text-white" : "text-black"}>
            Processing
          </Title>
        </Pressable>

        <Pressable
          className={`px-6 h-9 justify-center rounded-full ${
            active === 3 ? "bg-black" : "bg-transparent"
          }`}
          onPress={() => handlePress(3)}
        >
          <Title className={active === 3 ? "text-white" : "text-black"}>
            Canceled
          </Title>
        </Pressable>
      </View>
      <ScrollView
        className=" mt-4  h-2/3 "
        showsVerticalScrollIndicator={false}
      >
        {filteredOrders?.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </ScrollView>
    </View>
  );
}
