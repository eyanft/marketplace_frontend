import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import Button from "../../src/components/buttons/FilledButton";
import Input from "../../src/components/input/CustomInput";
import Text from "../../src/components/text/CustomText";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../src/services/auth/authService";

export default function PasswordReset() {
  const { control, handleSubmit, setError } = useForm();

  const mutation = useMutation({
    mutationFn: async (email) => {
      await forgotPassword(email);
    },
    onError: (err) => {
      switch (err.code) {
        case "auth/user-not-found":
          setError("email", {
            type: "manual",
            message: "No account found with this email.",
          });
          break;

        case "auth/invalid-email":
          setError("email", {
            type: "manual",
            message: "Invalid email address.",
          });
          break;

        default:
          setError("root", {
            type: "manual",
            message: "Something went wrong. Please try again.",
          });
      }
    },
    onSuccess: () => {
      console.log("Password reset link sent successfully.");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data.email);
  };

  return (
    <View className="flex flex-col p-6 pt-20 h-screen gap-5 bg-gray-100">
      <Text className="text-4xl font-bold text-gray-700 mb-16">
        Forgot password
      </Text>
      <Text className="text-base font-bold text-gray-900">
        Please, enter your email address. You will receive a link to create a
        new password via email.
      </Text>

      <Input
        name="email"
        control={control}
        placeholder="Email"
        rules={{
          required: "Email is required",
        }}
      />

      <Button onPress={handleSubmit(onSubmit)} disabled={mutation.isLoading}>
        {mutation.isLoading ? "Sending..." : "SEND"}
      </Button>
    </View>
  );
}
