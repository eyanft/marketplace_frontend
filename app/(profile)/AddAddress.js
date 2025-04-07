import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../src/components/input/CustomInput";
import Button from "../../src/components/buttons/FilledButton";
import SectionText from "../../src/components/text/CustomText";
export default function AddAddress() {
  return (
    <>
      <SafeAreaView className="bg-white shadow-xl">
        <View className="flex-row items-center justify-between p-4">
          <TouchableOpacity>
            <FontAwesome6 name="chevron-left" size={16} color="black" />
          </TouchableOpacity>
          <SectionText className="text-xl font-semibold ">
            Adding Shipping Address
          </SectionText>
          <View className="w-6" />
        </View>
      </SafeAreaView>
      <View className="py-6 px-4 flex  gap-4">
        <Input placeholder="Full name" />
        <Input placeholder="Address" />
        <Input placeholder="City" />
        <Input placeholder="State/Province/Region" />
        <Input placeholder="Zip Code" />
        <Input placeholder="Country" />
        <Button>SAVE ADDRESS</Button>
      </View>
    </>
  );
}
