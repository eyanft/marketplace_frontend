import React from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import CustomText from "../../src/components/text/CustomText";
import FilledButton from "../../src/components/buttons/FilledButton";
export default function SuccessPurchase() {
  return (
    <View className="flex-1 items-center justify-center px-4 relative">
      <View className="w-64 h-64">
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{ uri: "https://i.imgur.com/nFyr6sN.png" }}
        />
      </View>

      <CustomText className="font-black text-4xl mt-10">Success!</CustomText>
      <CustomText>Your order will be delivered soon.</CustomText>
      <CustomText>Thank you for choosing our app!</CustomText>

      <View className="absolute bottom-6 w-full px-4">
        <FilledButton>CONTINUE SHOPPING</FilledButton>
      </View>
    </View>
  );
}
