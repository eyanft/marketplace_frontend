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
import { Colors } from "../../config/colors";
export default function index() {
  const { user } = useZustandStore();
  const [active, setActive] = useState(1);
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
      <View className="flex flex-row justify-between mt-4 bg-white  rounded-full  ">
        <Pressable
          style={{
            paddingHorizontal: 24,
            height: 36,
            justifyContent: "center",
            borderRadius: 9999,
            backgroundColor: active === 1 ? Colors.primary : "transparent",
          }}
          onPress={() => handlePress(1)}
        >
          <Title style={{ color: active === 1 ? "#fff" : "#000" }}>
            Delivered
          </Title>
        </Pressable>

        <Pressable
          style={{
            paddingHorizontal: 24,
            height: 36,
            justifyContent: "center",
            borderRadius: 9999,
            backgroundColor: active === 2 ? Colors.primary : "transparent",
          }}
          onPress={() => handlePress(2)}
        >
          <Title style={{ color: active === 2 ? "#fff" : "#000" }}>
            Processing
          </Title>
        </Pressable>

        <Pressable
          style={{
            paddingHorizontal: 24,
            height: 36,
            justifyContent: "center",
            borderRadius: 9999,
            backgroundColor: active === 3 ? Colors.primary : "transparent",
          }}
          onPress={() => handlePress(3)}
        >
          <Title style={{ color: active === 3 ? "#fff" : "#000" }}>
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
