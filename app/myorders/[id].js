import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import {
  Button,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SectionText from "../../src/components/text/CustomText";
import OrderItem from "../../src/components/cards/ItemCart";
import { ScrollView } from "react-native";
export default function OrderDetail() {
  return (
    <>
      <SafeAreaView className="bg-white shadow-xl">
        <View className="flex-row items-center justify-between p-4">
          <TouchableOpacity>
            <FontAwesome6 name="chevron-left" size={16} color="black" />
          </TouchableOpacity>
          <SectionText className="text-xl font-semibold ">
            Order Details
          </SectionText>
          <View className="w-6" />
        </View>
      </SafeAreaView>
      <View className="p-2 mt-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-semibold">Order №1947034</Text>
          <Text className="text-sm text-gray-500">05-12-2019</Text>
        </View>
        <View className="mt-2">
          <View className="flex-row justify-between items-center">
            <Text className="text-sm text-gray-500">
              Tracking number:
              <Text className=" text-black font-bold"> IW3475453455</Text>
            </Text>
            <Text className="text-green-500 font-base">Delivered</Text>
          </View>
        </View>
        <Text className="text-lg font-semibold mt-4">3 items</Text>
        <ScrollView className=" mt-4  h-2/3 ">
          <View className="gap-4">
            <OrderItem edit={false} />
            <OrderItem edit={false} />
            <OrderItem edit={false} />
            <OrderItem edit={false} />
          </View>
        </ScrollView>
        <View className="flex flex-row justify-between w-full mt-4 h-12 px-4">
          <Pressable className=" w-48 text-center border border-black rounded-full items-center justify-center">
            <Text className="text-black text-center">Reorder</Text>
          </Pressable>

          <Pressable className="w-48 bg-orange-600 rounded-full items-center justify-center shadow-xl">
            <Text className="text-white text-center">Leave feedback</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}
