import React from "react";
import Button from "../../src/components/buttons/FilledButton";
import { Text, View } from "react-native";

export default function login() {
  return (
    <View className="h-screen bg-green-900">
      <Button />
      <View className="text-white ">Login</View>
    </View>
  );
}
