import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Colors } from "../../config/colors";
import Button from "../../src/components/ui/Button";
import { Card, CardContent } from "../../src/components/ui/Card";
import { Input } from "../../src/components/input/Input";
import Text from "../../src/components/text/CustomText";
import Checkbox from "../../src/components/buttons/Checkbox";
import { signIn, register } from "../../src/services/auth/authService";
import { getUserDetails } from "../../src/services/user/userService";
import { useZustandStore } from "../../src/store/zustand";
import { Controller } from "react-hook-form";
// import { auth } from "../../src/services/firebaseConfig";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth, { FacebookAuthProvider } from "@react-native-firebase/auth";
import { WEB_CLIENT_ID, API_BASE_URL } from "@env";
import { registerForPushNotificationsAsync } from "../../src/utils/notifications";

export default function Login() {
  const router = useRouter();
  const setUser = useZustandStore((state) => state.setUser);
  const [fcmToken, setFcmToken] = useState(null);
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
  });
  // useEffect(() => {
  //   const setupPushNotifications = async () => {
  //     try {
  //       const token = await registerForPushNotificationsAsync();
  //       setFcmToken(token);
  //     } catch (error) {
  //       console.error("Error setting up push notifications:", error);
  //     }
  //   };

  //   setupPushNotifications();
  // }, []);
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.signOut();

      const response = await GoogleSignin.signIn();

      if (response.type === "cancelled") {
        console.log("User cancelled Google Sign-In");
        return;
      }

      if (!response.data) {
        console.log("No data received from Google Sign-In");
        return;
      }
      const googleCredential = auth.GoogleAuthProvider.credential(
        response.data.idToken
      );

      const userCredential = await auth().signInWithCredential(
        googleCredential
      );
      const firebaseUser = userCredential.user;

      console.log("Firebase authentication successful:", firebaseUser.uid);

      const googleUserData = {
        firebaseID: firebaseUser.uid,
        email: firebaseUser.email,
        firstname: firebaseUser.displayName?.split(" ")[0] || "",
        lastname: firebaseUser.displayName?.split(" ").slice(1).join(" ") || "",
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        emailVerified: firebaseUser.emailVerified,
        deviceID: fcmToken,
        signInMethod: "google",
      };

      const result = await register(googleUserData);

      console.log("Backend response:", result.data);

      if (result.data.isNewUser) {
        console.log("Welcome new user!");
        // Optional: Show welcome screen
      } else {
        console.log("Welcome back!");
      }

      // Navigate to main app or set user state
      // navigation.navigate('Home');
      setUser(result.data.user);
      router.replace("/(tabs)/home");
      return result.data;
    } catch (error) {
      console.error("Google Sign-In error:", error);

      if (error.code === "SIGN_IN_CANCELLED") {
        console.log("User cancelled sign-in");
      } else if (error.code === "12500") {
        console.log("Configuration error - check OAuth consent screen");
      } else {
        Alert.alert("Error", "Sign-in failed. Please try again.");
      }

      throw error;
    }
  };
  const handleFacebookSignIn = async () => {
    try {
      // Facebook login
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);
      if (result.isCancelled) {
        console.log("User cancelled Facebook Sign-In");
        return;
      }
      // Get access token
      const data = await AccessToken.getCurrentAccessToken();
      console.log("Facebook access token:", data.accessToken);
      const facebookCredential = FacebookAuthProvider.credential(
        data.accessToken
      );
      console.log("azeaazeaee", facebookCredential);
      const userCredential = await auth().signInWithCredential(
        facebookCredential
      );
      const firebaseUser = userCredential.user;
      console.log("azeae", firebaseUser);
      // Same backend call as Google
      const facebookUserData = {
        firebaseID: firebaseUser.uid,
        email: firebaseUser.email,
        firstname: firebaseUser.displayName?.split(" ")[0] || "",
        lastname: firebaseUser.displayName?.split(" ").slice(1).join(" ") || "",
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        emailVerified: true,
        deviceID: fcmToken,
        signInMethod: "facebook",
      };
      const backendResult = await register(facebookUserData);
      Alert.alert("Success!", "Logged in with Facebook");
      navigation.navigate("Home");
    } catch (error) {
      // console.error("Facebook Sign-in error:", error.code);
      if (error.code === "auth/account-exists-with-different-credential") {
        Alert.alert(
          "Account Already Exists",
          "You already have an account with this email. Please use Google Sign-In instead.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Switch to Google",
              onPress: () => signInWithGoogle(),
            },
          ]
        );
      }
    }
  };

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const mutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const userData = await signIn(email, password);
      return userData.user.uid;
    },
    onSuccess: async () => {
      try {
        const user = await getUserDetails();
        setUser(user);
        router.replace("(tabs)/home");
      } catch (error) {
        setError("root", {
          type: "manual",
          message: "Something went wrong. Please try again.",
        });
        // If API fails, we can still proceed with Firebase auth
        // Set a basic user object with Firebase data
        // const firebaseUser = auth.currentUser;
        // if (firebaseUser) {
        //   setUser({
        //     uid: firebaseUser.uid,
        //     email: firebaseUser.email,
        //     // Add other default fields as needed
        //   });
        // }
      }
    },
    onError: (error) => {
      console.log(error);
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
          setError("root", {
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
    console.log("Form data being submitted:", data);
    if (!data.email || !data.password) {
      console.log("Email or password is missing from form data");
      return;
    }
    mutation.mutate({
      email: data.email.trim(),
      password: data.password,
    });
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
          {/* Sign in heading */}
          <Text style={styles.headingText}>Sign in</Text>
          <View style={styles.headingLine} />

          {/* Email input */}
          <View style={styles.inputBlock}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputRow}>
              <Feather name="mail" size={16} color="#616161" />
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="user@email.com"
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onFocus={() => setFocusedInput("email")}
                  />
                )}
              />
            </View>

            <View
              style={[
                styles.inputBottomLine,
                focusedInput === "email" && styles.inputBottomLineActive,
              ]}
            />
            {errors.email && (
              <Text style={{ color: Colors.primary, marginTop: 4 }}>
                {errors.email.message}
              </Text>
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
                rules={{ required: "Password is required" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Enter your password"
                    style={styles.input}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onFocus={() => setFocusedInput("password")}
                    secureTextEntry={!showPassword}
                  />
                )}
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
              <Text style={{ color: Colors.primary, marginTop: 4 }}>
                {errors.password.message}
              </Text>
            )}
            {errors.root && (
              <Text style={{ color: Colors.primary, marginTop: 4 }}>
                {errors.root.message}
              </Text>
            )}
          </View>

          {/* Remember Me and Forgot Password */}
          <View style={styles.rowBetween}>
            <Checkbox
              checked={rememberMe}
              onChange={setRememberMe}
              label="Remember Me"
              style={styles.checkbox}
            />
            <Pressable onPress={() => router.push("/PasswordReset")}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </Pressable>
          </View>

          {/* Login button */}
          <Button
            variant="default"
            style={styles.loginButton}
            onPress={handleSubmit(onSubmit)}
            disabled={mutation.isLoading}
          >
            <Text style={styles.loginButtonText}>
              {mutation.isLoading ? "Logging in..." : "Login"}
            </Text>
          </Button>

          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>Or login with</Text>
            <View style={styles.orLine} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <Button
              variant="outline"
              style={styles.socialButton}
              onPress={signInWithGoogle}
            >
              <Feather
                name="mail"
                size={20}
                color="#616161"
                style={styles.socialButtonIcon}
              />
              <Text style={styles.socialButtonText}>Email</Text>
            </Button>
            <Button
              variant="outline"
              style={styles.socialButton}
              onPress={handleFacebookSignIn}
            >
              <Feather
                name="facebook"
                size={20}
                color="#1877F2"
                style={styles.socialButtonIcon}
              />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </Button>
          </View>

          {/* Sign up text */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an Account? </Text>
            <Link href="/SignUp">
              <Text style={styles.signUpLink}>Sign up</Text>
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
    top: -240,
  },
  contentContainer: {
    marginTop: 170,
    backgroundColor: "transparent",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
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
    marginBottom: 32,
    borderRadius: 2,
  },
  inputBlock: {
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  inputLabel: {
    color: "#212121",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minHeight: 48,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    padding: 0,
    color: "#212121",
    fontSize: 15,
    marginLeft: 8,
    backgroundColor: "transparent",
    height: 40,
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
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  checkbox: {
    paddingVertical: 4,
  },
  forgotPassword: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  loginButton: {
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 32,
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
  orContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginBottom: 24,
  },
  orLine: {
    height: 1,
    flex: 1,
    backgroundColor: "#e0e0e0",
  },
  orText: {
    color: "black",
    fontSize: 14,
    marginHorizontal: 8,
  },
  socialButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  socialButtonIcon: {
    marginRight: 8,
  },
  socialButtonText: {
    color: "#616161",
    fontSize: 14,
  },
});
