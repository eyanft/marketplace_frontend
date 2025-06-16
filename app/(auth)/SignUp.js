import React, { useState } from "react";
import { Image, Pressable, StatusBar, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Colors } from "../../config/colors";
import Button from "../../src/components/ui/Button";
import { Input } from "../../src/components/input/Input";
import Text from "../../src/components/text/CustomText";
import { register } from "../../src/services/auth/authService";

export default function SignUp() {
  const router = useRouter();
  const { control, handleSubmit, setError, setValue, watch } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const mutation = useMutation({
    mutationFn: async (data) => {
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
      console.log("Registration successful");
    },
  });

  const onSubmit = (data) => {
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
              <Input
                name="firstname"
                control={control}
                placeholder="First Name"
                style={styles.input}
                rules={{ required: "First Name is required" }}
                onFocus={() => setFocusedInput('firstname')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
            <View style={[styles.inputBottomLine, focusedInput === 'firstname' && styles.inputBottomLineActive]} />
          </View>

          {/* Last Name input */}
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <View style={styles.inputRow}>
              <Feather name="user" size={16} color="#616161" />
              <Input
                name="lastname"
                control={control}
                placeholder="Last Name"
                style={styles.input}
                rules={{ required: "Last Name is required" }}
                onFocus={() => setFocusedInput('lastname')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
            <View style={[styles.inputBottomLine, focusedInput === 'lastname' && styles.inputBottomLineActive]} />
          </View>

          {/* Email input */}
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputRow}>
              <Feather name="mail" size={16} color="#616161" />
              <Input
                name="email"
                control={control}
                placeholder="user@email.com"
                style={styles.input}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                }}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
            <View style={[styles.inputBottomLine, focusedInput === 'email' && styles.inputBottomLineActive]} />
          </View>

          {/* Phone input */}
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <View style={styles.inputRow}>
              <Feather name="phone" size={16} color="#616161" />
              <Input
                name="phoneNumber"
                control={control}
                placeholder="+216 00-000-000"
                style={styles.input}
                keyboardType="phone-pad"
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+\d{2}\s?\d{3}-\d{4}-\d{3}$/,
                    message: "Phone number must be in format +00 000-0000-000",
                  },
                }}
                onFocus={() => setFocusedInput('phoneNumber')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>
            <View style={[styles.inputBottomLine, focusedInput === 'phoneNumber' && styles.inputBottomLineActive]} />
          </View>

          {/* Password input */}
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputRow}>
              <Feather name="lock" size={16} color="#616161" />
              <Input
                name="password"
                control={control}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                style={styles.input}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be at most 20 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message: "Password must include uppercase, lowercase, and a number",
                  },
                }}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={16}
                  color="#616161"
                />
              </Pressable>
            </View>
            <View style={[styles.inputBottomLine, focusedInput === 'password' && styles.inputBottomLineActive]} />
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
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: 600,
    top: -280,
  },
  contentContainer: {
    marginTop: 130,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingBottom: 20,
    zIndex: 1,
  },
  headingText: {
    color: '#212121',
    fontSize: 32,
    fontWeight: '700',
    fontFamily: 'Rubik',
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
    color: '#212121',
    fontSize: 16,
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
  loginButton: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  signUpText: {
    color: '#9e9e9e',
    fontSize: 14,
  },
  signUpLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 4,
  },
});
