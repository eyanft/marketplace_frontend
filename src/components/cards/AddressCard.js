import React, { useState } from "react";
import { Pressable, View } from "react-native";
import SectionText from "../text/CustomText";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";

export default function AddressCard({ editable, defaultAddress, ...props }) {
  const [isChecked, setChecked] = useState(false);
  const onAddressChange = () => {
    editable
      ? router.push("/(profile)/AddressList")
      : router.push("/(profile)/AddressList");
  };
  return (
    <View className="p-4 w-full h-46 bg-white shadow-xl rounded-lg">
      <View className="flex flex-row justify-between ">
        <SectionText className="text-lg font-medium">John Doe</SectionText>
        <Pressable onPress={onAddressChange}>
          <SectionText className="text-lg font-medium text-orange-500">
            {editable ? "Edit" : "Change"}
          </SectionText>
        </Pressable>
      </View>

      <SectionText className="mt-4 text-lg font-normal ">
        1234 Main St
      </SectionText>
      <SectionText className="text-lg font-normal ">
        Springfield, IL 62701
      </SectionText>
      {defaultAddress && (
        <View className="flex flex-row gap-3 mt-4 items-center">
          <Checkbox
            color={isChecked ? "black" : undefined}
            value={isChecked}
            onValueChange={setChecked}
          />
          <SectionText className="text-lg font-normal ">
            Use as the shipping address
          </SectionText>
        </View>
      )}
    </View>
  );
}
