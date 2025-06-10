import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { getTimeAgo } from "../../utils/shimmer/dateUtils";

export default function OrderCard({ order }) {
  const navigateToDetails = () => {
    router.navigate(`/myorders/${order.id}`);
  };
  return (
    <View className="bg-white p-4 rounded-lg shadow-md mb-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold">Order №{order.id}</Text>
        <Text className="text-sm text-gray-500">
          {getTimeAgo(order.createdAt)}
        </Text>
      </View>

      <View className="mt-2">
        {/* <Text className="text-sm text-gray-500">
          Tracking number:
          <Text className=" text-black font-bold">IW3475453455</Text>
        </Text> */}
        <View className="flex-row justify-between items-center">
          <Text className="text-sm text-gray-500">
            Quantity:{" "}
            <Text className=" text-black font-bold">
              {order.orderItems.length}
            </Text>
          </Text>
          <Text className="text-sm text-gray-500">
            Total Amount:{" "}
            <Text className=" text-black font-bold">{order.totalPrice} DT</Text>
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mt-4 ">
        <Pressable
          className="flex-row items-center justify-center "
          onPress={navigateToDetails}
        >
          <Text className=" text-black rounded-full border  h-10 w-24 text-center leading-9   border-black font-base">
            Details
          </Text>
        </Pressable>
        <Text className="text-green-500 font-base">{order.status}</Text>
      </View>
    </View>
  );
}
