import React, { useState, useRef } from "react";
import {
  Pressable,
  Switch,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import Title from "../../src/components/text/CustomText";
import CustomInput from "../../src/components/input/CustomInput";
import { Input } from "../../src/components/input/Input";
import { Animated, Modal } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useZustandStore } from "../../src/store/zustand";
import { changePassword, signIn } from "../../src/services/auth/authService";
import Button from "../../src/components/ui/Button";
import { Card, CardContent } from "../../src/components/ui/Card";
import Badge from "../../src/components/ui/Badge";
import { updateUserDetails } from "../../src/services/user/userService";
import { useMutation } from "@tanstack/react-query";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "../../config/colors";

export default function Settings() {
  const user = useZustandStore((state) => state.user);
  const setUserModifications = useZustandStore((state) => state.setUser);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const [focusedInput, setFocusedInput] = useState(null);
  const [focusedPasswordInput, setFocusedPasswordInput] = useState(null);
  
  const { control, handleSubmit, setError, watch, reset } = useForm({
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
  });

  const newPassword = watch("newpassword");
  const confirmPassword = watch("confirmpassword");
  const [notif, setNotif] = useState(true);
  const [sheetVisible, setSheetVisible] = useState(false);

  const changePasswordMutation = useMutation({
    mutationFn: async (newPassword) => {
      await changePassword(newPassword);
    },
    onError: (error) => {
      console.error("Error changing password:", error.message);
    },
    onSuccess: () => {
      handleCloseSheet();
      ToastAndroid.show(
        "Password changed successfully",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data) => {
      const newUser = { firebaseID: user.firebaseID, ...data };
      await updateUserDetails(newUser);
      await setUserModifications(newUser);
    },
    onError: (error) => {
      console.error("Error updating user info:", error.message);
    },
    onSuccess: () => {
      ToastAndroid.show(
        "Profile Updated",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    },
  });

  const handleChangePassword = () => {
    setSheetVisible(true);
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseSheet = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSheetVisible(false);
    });
    reset({
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
    });
  };

  const handleSavePassword = async (data) => {
    try {
      await signIn(user.email, data.oldpassword);
      if (newPassword !== confirmPassword) {
        setError("confirmpassword", { message: "Passwords do not match" });
        return;
      }
      changePasswordMutation.mutate(newPassword);
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("oldpassword", { message: "Old password is incorrect" });
      } else {
        console.error("Password change failed:", error.message);
      }
    }
  };

  const changePersonalInfo = (data) => {
    updateUserMutation.mutate(data);
  };

  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-6 pt-16">
          {/* Header */}
          <View className="mb-8">
            <Title className="text-4xl font-bold text-gray-900 mb-2">Settings</Title>
            <Title className="text-base text-gray-600">Manage your account preferences</Title>
          </View>

          {/* Personal Information Section */}
          <Card className="mb-6">
            <CardContent>
              <View className="flex-row items-center mb-4 ">
                <Title className="text-xl font-semibold text-gray-900">Personal Information</Title>
                <Badge variant="default" style={{ marginLeft: 16 }}>
                  <Text className="text-white text-xs px-2 py-1 pr-2">Required</Text>
                </Badge>
              </View>
              
              <View className="space-y-4">
                {/* First Name Input */}
                <View style={styles.inputBlock}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  <View style={styles.inputRow}>
                    <Feather name="user" size={16} color="#616161" />
                    <Controller
                      control={control}
                      name="firstname"
                      rules={{ required: "First Name is required" }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          placeholder="Enter your first name"
                          style={styles.input}
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          onFocus={() => setFocusedInput('firstname')}
                        />
                      )}
                    />
                  </View>
                  <View style={[styles.inputBottomLine, focusedInput === 'firstname' && styles.inputBottomLineActive]} />
                </View>

                {/* Last Name Input */}
                <View style={styles.inputBlock}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  <View style={styles.inputRow}>
                    <Feather name="user" size={16} color="#616161" />
                    <Controller
                      control={control}
                      name="lastname"
                      rules={{ required: "Last Name is required" }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          placeholder="Enter your last name"
                          style={styles.input}
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          onFocus={() => setFocusedInput('lastname')}
                        />
                      )}
                    />
                  </View>
                  <View style={[styles.inputBottomLine, focusedInput === 'lastname' && styles.inputBottomLineActive]} />
                </View>

                {/* Email Input */}
                <View style={styles.inputBlock}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <View style={styles.inputRow}>
                    <Feather name="mail" size={16} color="#616161" />
                    <Controller
                      control={control}
                      name="email"
                      rules={{ required: "Email is required" }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          placeholder="Enter your email"
                          style={styles.input}
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          onFocus={() => setFocusedInput('email')}
                        />
                      )}
                    />
                  </View>
                  <View style={[styles.inputBottomLine, focusedInput === 'email' && styles.inputBottomLineActive]} />
                </View>
              </View>
            </CardContent>
          </Card>

          {/* Security Section */}
          <Card className="mb-6">
            <CardContent>
              <View className="flex-row items-center justify-between mb-4">
                <View>
                  <Title className="text-xl font-semibold text-gray-900">Security</Title>
                  <Title className="text-sm text-gray-600 mt-1">Keep your account safe</Title>
                </View>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onPress={handleChangePassword}
                  style={{ borderColor: '#ff5c00' }}
                >
                  <Text className="text-orange-600 font-medium">Change</Text>
                </Button>
              </View>
            </CardContent>
          </Card>

          {/* Notifications Section */}
          <Card className="mb-6">
            <CardContent>
              <Title className="text-xl font-semibold text-gray-900 mb-4">Notifications</Title>
              <View className="flex-row justify-between items-center py-3 border-b border-gray-100">
                <View>
                  <Text className="text-base font-medium text-gray-900">Sales & Promotions</Text>
                  <Text className="text-sm text-gray-600 mt-1">Get notified about special offers</Text>
                </View>
                <Switch
                  value={notif}
                  onValueChange={() => setNotif((prev) => !prev)}
                  trackColor={{ false: "#e5e7eb", true: "#ff5c00" }}
                  thumbColor={notif ? "#ffffff" : "#ffffff"}
                  ios_backgroundColor="#e5e7eb"
                />
              </View>
            </CardContent>
          </Card>

          {/* Bottom spacer for fixed button */}
          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      {/* Fixed Save Button with Blur Background */}
      <View style={styles.buttonOverlayContainer}>
        <View style={styles.overlayGradient} />
        <View style={styles.buttonContainer}>
          <Button 
            variant="default" 
            size="lg" 
            onPress={handleSubmit(changePersonalInfo)}
            style={styles.saveButton}
          >
            <Text className="text-white font-semibold text-base">Save Changes</Text>
          </Button>
        </View>
      </View>

      {/* Password Change Modal */}
      <Modal
        transparent={true}
        visible={sheetVisible}
        animationType="none"
        onRequestClose={handleCloseSheet}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
          activeOpacity={1}
          onPress={handleCloseSheet}
        >
          <Animated.View
            className="bg-white"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingVertical: 24,
              paddingHorizontal: 24,
              transform: [{ translateY }],
            }}
          >
            <TouchableOpacity activeOpacity={1}>
              <View>
                {/* Handle */}
                <View
                  style={{
                    width: 40,
                    height: 5,
                    backgroundColor: "#e5e7eb",
                    borderRadius: 3,
                    alignSelf: "center",
                    marginBottom: 20,
                  }}
                />

                <View className="mb-6">
                  <Title className="text-2xl font-bold text-gray-900 text-center mb-2">
                    Change Password
                  </Title>
                  <Title className="text-sm text-gray-600 text-center">
                    Enter your current password and choose a new one
                  </Title>
                </View>

                <View className="space-y-4 mb-6">
                  {/* Current Password Input */}
                  <View style={styles.inputBlock}>
                    <Text style={styles.inputLabel}>Current Password</Text>
                    <View style={styles.inputRow}>
                      <Feather name="lock" size={16} color="#616161" />
                      <Controller
                        control={control}
                        name="oldpassword"
                        rules={{ required: "Current password is required" }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            placeholder="Enter current password"
                            style={styles.input}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            onFocus={() => setFocusedPasswordInput('oldpassword')}
                            secureTextEntry
                          />
                        )}
                      />
                    </View>
                    <View style={[styles.inputBottomLine, focusedPasswordInput === 'oldpassword' && styles.inputBottomLineActive]} />
                  </View>

                  {/* New Password Input */}
                  <View style={styles.inputBlock}>
                    <Text style={styles.inputLabel}>New Password</Text>
                    <View style={styles.inputRow}>
                      <Feather name="lock" size={16} color="#616161" />
                      <Controller
                        control={control}
                        name="newpassword"
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
                            message:
                              "Password must include uppercase, lowercase, and a number",
                          },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            placeholder="Enter new password"
                            style={styles.input}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            onFocus={() => setFocusedPasswordInput('newpassword')}
                            secureTextEntry
                          />
                        )}
                      />
                    </View>
                    <View style={[styles.inputBottomLine, focusedPasswordInput === 'newpassword' && styles.inputBottomLineActive]} />
                  </View>

                  {/* Confirm Password Input */}
                  <View style={styles.inputBlock}>
                    <Text style={styles.inputLabel}>Confirm New Password</Text>
                    <View style={styles.inputRow}>
                      <Feather name="lock" size={16} color="#616161" />
                      <Controller
                        control={control}
                        name="confirmpassword"
                        rules={{ required: "Password confirmation is required" }}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            placeholder="Confirm new password"
                            style={styles.input}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            onFocus={() => setFocusedPasswordInput('confirmpassword')}
                            secureTextEntry
                          />
                        )}
                      />
                    </View>
                    <View style={[styles.inputBottomLine, focusedPasswordInput === 'confirmpassword' && styles.inputBottomLineActive]} />
                  </View>
                </View>

                <View className="space-y-3">
                  <Button
                    variant="default"
                    size="lg"
                    onPress={handleSubmit(handleSavePassword)}
                  >
                    <Text className="text-white font-semibold text-base">
                      Update Password
                    </Text>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="lg"
                    onPress={handleCloseSheet}
                  >
                    <Text className="text-gray-600 font-medium">Cancel</Text>
                  </Button>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBlock: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  inputLabel: {
    color: '#212121',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minHeight: 48,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    padding: 0,
    color: '#212121',
    fontSize: 15,
    marginLeft: 8,
    backgroundColor: 'transparent',
    height: 40,
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
  bottomSpacer: {
    height: Platform.select({
      ios: 100,
      android: 120,
    }),
  },
  buttonOverlayContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  overlayGradient: {
    height: 80,
    backgroundColor: 'white',
    opacity: 0.6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: 'transparent',
  },
  saveButton: {
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
