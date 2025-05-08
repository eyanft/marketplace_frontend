import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function OrderCard() {
  const navigateToDetails = () => {
    router.navigate("/myorders/[id]", { id: 1 });
  };
  return (
    <View className="bg-white p-4 rounded-lg shadow-md mb-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold">Order №1947034</Text>
        <Text className="text-sm text-gray-500">05-12-2019</Text>
      </View>

      <View className="mt-2">
        <Text className="text-sm text-gray-500">
          Tracking number:
          <Text className=" text-black font-bold">IW3475453455</Text>
        </Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-sm text-gray-500">
            Quantity: <Text className=" text-black font-bold">3</Text>
          </Text>
          <Text className="text-sm text-gray-500">
            Total Amount: <Text className=" text-black font-bold">112$</Text>
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
        <Text className="text-green-500 font-base">Delivered</Text>
      </View>
    </View>
  );
}
