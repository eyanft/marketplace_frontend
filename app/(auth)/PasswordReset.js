import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../src/services/auth/authService";
import { Colors } from "../../config/colors";
import Button from "../../src/components/ui/Button";
import { Input } from "../../src/components/input/Input";
import Text from "../../src/components/text/CustomText";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

export default function PasswordReset() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [focusedInput, setFocusedInput] = useState(null);

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
      Toast.show({
        type: "success",
        position: "top",
        text1: "Success",
        text2: "Password reset link has been sent to your email.",
        visibilityTime: 3000,
      });
      router.replace("/login");
    },
  });

  const onSubmit = (data) => {
    // Directly use the email without modification (email validation happens with regex)
    console.log("Submitted data: ", data);
    mutation.mutate(data.email);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Feather name="key" size={32} color={Colors.primary} />
      </View>
      <Text style={styles.title}>Forgot password</Text>
      <Text style={styles.subtitle}>
        Please, enter your email address. You will receive a link to create a
        new password via email.
      </Text>
      <View style={styles.inputBlock}>
        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.inputRow}>
          <Feather name="mail" size={16} color="#616161" />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Enter your email"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            }}
          />
        </View>
        <View
          style={[
            styles.inputBottomLine,
            focusedInput === "email" && styles.inputBottomLineActive,
          ]}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
      </View>

      <Button
        variant="default"
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={mutation.isLoading}
      >
        <Text style={styles.buttonText}>
          {mutation.isLoading ? "Sending..." : "Reset password"}
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary + "22",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#212121",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 0,
  },
  subtitle: {
    fontSize: 15,
    color: "#888",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  inputBlock: {
    width: "100%",
    marginBottom: 20,
  },
  inputLabel: {
    color: "#212121",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    padding: 0,
    color: "#212121",
    fontSize: 15,
    marginLeft: 8,
  },
  inputBottomLine: {
    height: 2,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 1,
    marginTop: 2,
  },
  inputBottomLineActive: {
    backgroundColor: Colors.primary,
  },
  button: {
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: Colors.primary,
    fontSize: 12,
    marginTop: 4,
  },
});
