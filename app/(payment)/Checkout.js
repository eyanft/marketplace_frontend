import React from "react";
import { TouchableOpacity } from "react-native";
import SectionText from "../../src/components/text/CustomText";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import SubmitButton from "../../src/components/buttons/FilledButton";
import AddressCard from "../../src/components/cards/AddressCard";
import { router } from "expo-router";
export default function Checkout() {
  const submitOrder = () => {
    router.navigate("/(payment)/SuccessPurchase");
  };
  return (
    <>
      <SafeAreaView className="bg-white shadow-xl">
        <View className="flex-row items-center justify-between p-4">
          <TouchableOpacity>
            <FontAwesome6 name="chevron-left" size={16} color="black" />
          </TouchableOpacity>
          <SectionText className="text-xl font-semibold ">Checkout</SectionText>
          <View className="w-6" />
        </View>
      </SafeAreaView>
      <View className="py-6 px-4 flex  gap-4">
        <SectionText className="ml-2 text-xl font-semibold ">
          Shipping address
        </SectionText>
        <AddressCard editable={false} defaultAddress={false} />
        <View>
          <View className="flex flex-row justify-between py-6 px-2">
            <SectionText className="text-xl font-medium">Payment</SectionText>
            <SectionText className="text-lg font-medium text-orange-500 mr-2">
              Change
            </SectionText>
          </View>
        </View>
        <SectionText className="ml-2 text-xl font-semibold ">
          Delivery Method
        </SectionText>
        <View className=" flex flex-row w-full h-32 gap-2 justify-between">
          <View className="bg-white w-1/2 h-full rounded-lg"></View>
          <View className="bg-white w-1/2 h-full rounded-lg"></View>
        </View>
        <View className="flex flex-row justify-between">
          <SectionText className="ml-2 text-xl font-normal opacity-50 ">
            Order:
          </SectionText>
          <SectionText className="ml-2 text-xl font-semibold ">
            112 DT
          </SectionText>
        </View>
        <View className="flex flex-row justify-between">
          <SectionText className="ml-2 text-xl font-normal opacity-50 ">
            Delivery:
          </SectionText>
          <SectionText className="ml-2 text-xl font-semibold ">
            112 DT
          </SectionText>
        </View>
        <View className="flex flex-row justify-between">
          <SectionText className="ml-2 text-xl font-semibold opacity-50 ">
            Summary:
          </SectionText>
          <SectionText className="ml-2 text-xl font-semibold ">
            112 DT
          </SectionText>
        </View>
        <SubmitButton onPress={submitOrder}>SUBMIT ORDER</SubmitButton>
      </View>
    </>
  );
}
