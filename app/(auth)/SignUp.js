import React from "react";
import Button from "../../src/components/buttons/FilledButton";
import Text from "../../src/components/text/CustomText";
import Input from "../../src/components/input/CustomInput";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, View } from "react-native";
import { Link } from "expo-router";

export default function SignUp() {
  return (
    <View className="flex flex-col p-6 pt-20 h-screen gap-5   bg-gray-100">
      <Text className="text-4xl font-bold text-gray-700  mb-16">Sign up</Text>
      <Input placeholder="Name" />
      <Input placeholder="Email" />
      <Input placeholder="Password" />

      <Link push href="/Login">
        <View className="flex-row justify-end items-center gap-3 w-full">
          <Text className="text-gray-700 font-medium text-lg">
            Already have an account?
          </Text>
          <FontAwesome
            name="long-arrow-right"
            size={20}
            color="#FF5C00"
            className="mt-1"
          />
        </View>
      </Link>

      <Button>SIGN UP</Button>
      <View className="flex flex-col  self-center w-64 h-16  mt-10">
        <Text className="text-gray-700 text-center text-lg font-medium">
          Or sign up with social account
        </Text>
        <View className="flex flex-row justify-center gap-5 mt-5">
          <Pressable className="bg-white w-1/2 h-20 items-center justify-center p-2 rounded-full">
            <FontAwesome name="google" size={24} color="black" />
          </Pressable>
          <Pressable className="bg-white w-1/2 items-center justify-center p-2 rounded-full">
            <FontAwesome name="facebook" size={24} color="blue" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
