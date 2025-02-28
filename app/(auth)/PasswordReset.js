import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import Button from "../../src/components/buttons/FilledButton";
import Input from "../../src/components/input/CustomInput";
import Text from "../../src/components/text/CustomText";

export default function PasswordReset() {
  return (
    <View className="flex flex-col p-6 pt-20 h-screen gap-5   bg-gray-100">
      <Text className="text-4xl font-bold text-gray-700  mb-16">
        Forgot password
      </Text>
      <Text className="text-base font-bold text-gray-900">
        Please, enter your email address.You will receive a link to create a new
        password via email.
      </Text>
      <Input placeholder="Email" />

      <Button>SEND</Button>
    </View>
  );
}
