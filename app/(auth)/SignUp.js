import React, { useState } from "react";
import {
  Image,
  Pressable,
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { Colors } from "../../config/colors";
import Button from "../../src/components/ui/Button";
import { Input } from "../../src/components/input/Input";
import Text from "../../src/components/text/CustomText";
import { register } from "../../src/services/auth/authService";
import { registerForPushNotificationsAsync } from "../../src/utils/notifications";

export default function SignUp() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const mutation = useMutation({
    mutationFn: async (data) => {
      console.log("Submitting registration data:", data); // Check the data
      data.deviceID = await registerForPushNotificationsAsync();
      await register(data);
    },
    onError: (err) => {
      if (err.response?.data.includes("EMAIL_EXISTS")) {
        setError("email", {
          type: "manual",
          message: "Email already in use.",
        });
      }
      if (err.response?.data.includes("PHONE_NUMBER_EXISTS")) {
        setError("phoneNumber", {
          type: "manual",
          message: "Phone number already in use.",
        });
      }
    },
    onSuccess: () => {
      router.replace("/login");
    },
  });

  const onSubmit = (data) => {
    if (data.phoneNumber && !data.phoneNumber.startsWith("+216")) {
      data.phoneNumber = `+216${data.phoneNumber}`;
    }
    mutation.mutate(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../../assets/images/Vector 2.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        <View style={styles.contentContainer}>
          <Text style={styles.headingText}>Sign up</Text>
          <View style={styles.headingLine} />

          {/* First Name input */}
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>First Name</Text>
            <View style={styles.inputRow}>
              <Feather name="user" size={16} color="#616161" />
              <Controller
                control={control}
                name="firstname"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="First Name"
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
                rules={{
                  required: "First Name is required",
                  pattern: {
                    value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                    message: "First Name must only contain letters",
                  },
                }}
              />
            </View>
            <View
              style={[
                styles.inputBottomLine,
                focusedInput === "firstname" && styles.inputBottomLineActive,
              ]}
            />
            {errors.firstname && (
              <Text style={styles.errorText}>{errors.firstname.message}</Text>
            )}
          </View>

          {/* Last Name input */}
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <View style={styles.inputRow}>
              <Feather name="user" size={16} color="#616161" />
              <Controller
                control={control}
                name="lastname"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Last Name"
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
                rules={{
                  required: "Last Name is required",
                  pattern: {
                    value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                    message: "Last Name must only contain letters",
                  },
                }}
              />
            </View>
            <View
              style={[
                styles.inputBottomLine,
                focusedInput === "lastname" && styles.inputBottomLineActive,
              ]}
            />
            {errors.lastname && (
              <Text style={styles.errorText}>{errors.lastname.message}</Text>
            )}
          </View>

          {/* Email input */}
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputRow}>
              <Feather name="mail" size={16} color="#616161" />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="user@email.com"
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

          {/* Phone Number input */}
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputRow}>
              <Feather name="phone" size={16} color="#616161" />
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="+216 00-000-000"
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="phone-pad"
                  />
                )}
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{8}$/,
                    message: "Phone number must be 8 digits",
                  },
                }}
              />
            </View>
            <View
              style={[
                styles.inputBottomLine,
                focusedInput === "phoneNumber" && styles.inputBottomLineActive,
              ]}
            />
            {errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
            )}
          </View>

          {/* Password input */}
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputRow}>
              <Feather name="lock" size={16} color="#616161" />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Enter your password"
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPassword}
                  />
                )}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "Password must include uppercase, lowercase, and a number",
                  },
                }}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={16}
                  color="#616161"
                />
              </Pressable>
            </View>
            <View
              style={[
                styles.inputBottomLine,
                focusedInput === "password" && styles.inputBottomLineActive,
              ]}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>

          {/* Create Account button */}
          <Button
            variant="default"
            style={styles.loginButton}
            onPress={handleSubmit(onSubmit)}
            disabled={mutation.isLoading}
          >
            <Text style={styles.loginButtonText}>
              {mutation.isLoading ? "Creating Account..." : "Create Account"}
            </Text>
          </Button>

          {/* Already have an account */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Already have an Account? </Text>
            <Link href="/login">
              <Text style={styles.signUpLink}>Login</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: 600,
    top: -280,
  },
  contentContainer: {
    marginTop: 130,
    backgroundColor: "transparent",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingBottom: 20,
    zIndex: 1,
  },
  headingText: {
    color: "#212121",
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "Rubik",
    marginBottom: 2,
  },
  headingLine: {
    width: 80,
    height: 2.5,
    backgroundColor: Colors.primary,
    marginBottom: 28,
    borderRadius: 2,
  },
  inputBlock: {
    marginBottom: 15,
  },
  inputLabel: {
    color: "#212121",
    fontSize: 16,
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
  loginButton: {
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 15,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  signUpText: {
    color: "#9e9e9e",
    fontSize: 14,
  },
  signUpLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 4,
  },
  errorText: {
    color: Colors.primary,
    fontSize: 12,
    marginTop: 4,
  },
});
