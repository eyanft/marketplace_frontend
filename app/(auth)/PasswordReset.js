import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../src/services/auth/authService";
import { Colors } from "../../config/colors";
import Button from "../../src/components/ui/Button";
import { Input } from "../../src/components/input/Input";
import Text from "../../src/components/text/CustomText";

export default function PasswordReset() {
  const { control, handleSubmit, setError } = useForm();
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
      console.log("Password reset link sent successfully.");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data.email);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Feather name="key" size={32} color={Colors.primary} />
      </View>
      <Text style={styles.title}>Forgot password</Text>
      <Text style={styles.subtitle}>
        Please, enter your email address. You will receive a link to create a new password via email.
      </Text>
      <View style={styles.inputBlock}>
        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.inputRow}>
          <Feather name="mail" size={16} color="#616161" />
          <Input
            name="email"
            control={control}
            placeholder="Enter your email"
            style={styles.input}
            rules={{ required: "Email is required" }}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
          />
        </View>
        <View style={[styles.inputBottomLine, focusedInput === 'email' && styles.inputBottomLineActive]} />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary + '22',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#212121',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 0,
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  inputBlock: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    color: '#212121',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    padding: 0,
    color: '#212121',
    fontSize: 15,
    marginLeft: 8,
  },
  inputBottomLine: {
    height: 2,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 1,
    marginTop: 2,
  },
  inputBottomLineActive: {
    backgroundColor: Colors.primary,
  },
  button: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
});
