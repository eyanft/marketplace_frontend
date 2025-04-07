import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Pressable, SafeAreaView, TouchableOpacity, View } from "react-native";
import SectionText from "../../src/components/text/CustomText";
import AddressCard from "../../src/components/cards/AddressCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
export default function AddressList() {
  const onAddAddress = () => {
    router.push("/(profile)/AddAddress");
  };
  return (
    <>
      <SafeAreaView className="bg-white shadow-xl">
        <View className="flex-row items-center justify-between p-4">
          <TouchableOpacity>
            <FontAwesome6 name="chevron-left" size={16} color="black" />
          </TouchableOpacity>
          <SectionText className="text-xl font-semibold ">
            Shipping Addresses
          </SectionText>
          <View className="w-6" />
        </View>
      </SafeAreaView>
      <View className="py-6 px-4 flex  gap-4">
        <AddressCard editable={true} defaultAddress={true} />
      </View>
      <View className=" w-full h-24">
        <Pressable onPress={onAddAddress}>
          <Ionicons
            className="self-end mr-3"
            name="add-circle-sharp"
            size={40}
            color="black"
          />
        </Pressable>
      </View>
    </>
  );
}
