import React from "react";
import { Pressable, View } from "react-native";
import Text from "../../src/components/text/CustomText";
import Input from "../../src/components/input/CustomInput";
import { Link, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Button from "../../src/components/buttons/FilledButton";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../src/services/auth/authService";
import { useZustandStore } from "../../src/store/zustand";
import { getUserDetails } from "../../src/services/user/userService";

export default function Login() {
  const router = useRouter();
  const setUser = useZustandStore((state) => state.setUser);
  const { control, handleSubmit, setError } = useForm();

  const mutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const userData = await signIn(email, password);
      return userData.user.uid;
    },
    onSuccess: async (userId) => {
      const user = await getUserDetails(userId);
      setUser(user);
      router.replace("(tabs)/home");
    },
    onError: (error) => {
      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          setError("password", {
            type: "manual",
            message: "Email or password is incorrect",
          });
          break;
        case "auth/too-many-requests":
          setError("email", {
            type: "manual",
            message: "Too many attempts. Please try again later.",
          });
          break;
        case "auth/network-request-failed":
          setError("root", {
            type: "manual",
            message: "Network error. Please check your connection.",
          });
          break;
        default:
          setError("root", {
            type: "manual",
            message: "Something went wrong. Please try again.",
          });
      }
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <View className="flex flex-col p-6 pt-20 h-screen gap-5 bg-gray-100">
      <Text className="text-4xl font-bold text-gray-700 mb-16">Login</Text>

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
        rules={{ required: "Password is required" }}
      />

      <Link push href="/PasswordReset">
        <View className="flex-row justify-end items-center gap-3 w-full">
          <Text className="text-gray-700 font-medium text-lg">
            Forgot your password?
          </Text>
          <FontAwesome
            name="long-arrow-right"
            size={20}
            color="#FF5C00"
            className="mt-1"
          />
        </View>
      </Link>

      <Button onPress={handleSubmit(onSubmit)} disabled={mutation.isLoading}>
        {mutation.isLoading ? "Logging in..." : "LOGIN"}
      </Button>

      <View className="flex flex-col self-center w-64 h-16 mt-10">
        <Text className="text-gray-700 text-center text-lg font-medium">
          Or sign up with a social account
        </Text>
        <View className="flex flex-row justify-center gap-5 mt-5">
          <Pressable className="bg-white w-1/2 h-20 items-center justify-center p-2 rounded-full">
            <FontAwesome
              onPress={() => console.log("Google button pressed")}
              name="google"
              size={24}
              color="black"
            />
          </Pressable>
          <Pressable className="bg-white w-1/2 items-center justify-center p-2 rounded-full">
            <FontAwesome name="facebook" size={24} color="blue" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
