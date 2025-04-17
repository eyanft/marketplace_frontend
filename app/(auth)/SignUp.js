import React from "react";
import Button from "../../src/components/buttons/FilledButton";
import Text from "../../src/components/text/CustomText";
import Input from "../../src/components/input/CustomInput";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, View } from "react-native";
import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { register } from "../../src/services/auth/authService";

export default function SignUp() {
  const { control, handleSubmit, setError } = useForm();
  const onSubmit = async (data) => {
    try {
      await register(data);
    } catch (err) {
      if (err.response?.data.includes("EMAIL_EXISTS")) {
        setError("email", {
          type: "manual",
          message: "Email already in use.",
        });
      }
    }
  };
  return (
    <View className="flex flex-col p-6 pt-20 h-screen gap-5   bg-gray-100">
      <Text className="text-4xl font-bold text-gray-700  mb-16">Sign up</Text>
      <Input
        placeholder="Last Name"
        name="firstname"
        control={control}
        rules={{ required: "First Name is required" }}
      />
      <Input
        placeholder="First Name"
        name="lastname"
        control={control}
        rules={{ required: "Last Name is required" }}
      />
      <Input
        name="email"
        control={control}
        placeholder="Email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address",
          },
        }}
      />
      <Input
        name="password"
        control={control}
        placeholder="Password"
        secureTextEntry
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
          maxLength: {
            value: 20,
            message: "Password must be at least 20 characters",
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            message: "Password must include uppercase, lowercase, and a number",
          },
        }}
      />

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

      <Button onPress={handleSubmit(onSubmit)}>SIGN UP</Button>
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
