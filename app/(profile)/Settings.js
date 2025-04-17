import React, { useState, useRef } from "react";
import { Pressable, Switch, Text, View, TouchableOpacity } from "react-native";
import Title from "../../src/components/text/CustomText";
import CustomInput from "../../src/components/input/CustomInput";
import { Animated, Modal } from "react-native";
import { useForm } from "react-hook-form";
import { useZustandStore } from "../../src/store/zustand";
import { changePassword, signIn } from "../../src/services/auth/authService";
import Button from "../../src/components/buttons/FilledButton";
import { updateUserDetails } from "../../src/services/user/userService";
export default function Settings() {
  const user = useZustandStore((state) => state.user);
  const setUserModifications = useZustandStore((state) => state.setUser);
  const slideAnimation = useRef(new Animated.Value(0)).current;
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
      await changePassword(newPassword);
      handleCloseSheet();
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("oldpassword", { message: "Old password is incorrect" });
      } else {
        console.error("Password change failed:", error.message);
      }
    }
  };
  const changePersonalInfo = async (data) => {
    newUser = { firebaseID: user.firebaseID, ...data };
    try {
      console.log(newUser);
      await updateUserDetails(newUser);
      await setUserModifications(newUser);
    } catch (error) {
      console.error("Error updating user info:", error.message);
    }
  };
  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  return (
    <View className="p-8 mt-16 gap-5">
      <Title className="text-5xl font-medium">Settings</Title>
      <Title className="text-xl font-medium">Personal information</Title>
      <CustomInput
        name="firstname"
        control={control}
        placeholder="First Name"
        rules={{ required: "First Name is required" }}
        defaultValue={true}
      />
      <CustomInput
        name="lastname"
        control={control}
        placeholder="Last Name"
        rules={{ required: "Last Name is required" }}
        defaultValue={true}
      />
      <CustomInput
        name="email"
        control={control}
        placeholder="Email"
        rules={{ required: "Email is required" }}
        defaultValue={true}
      />
      <View className="flex flex-row items-center justify-between mt-10">
        <Title className="text-xl font-medium">Password</Title>
        <Pressable onPress={handleChangePassword}>
          <Title className="text-lg opacity-50">Change</Title>
        </Pressable>
      </View>

      <Title className="text-xl font-medium">Notifications</Title>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg">Sales</Text>
        <Switch
          value={notif}
          onValueChange={() => setNotif((prev) => !prev)}
          trackColor={{ false: "gray", true: "gray" }}
          thumbColor={notif ? "green" : "white"}
        />
      </View>
      <Button onPress={handleSubmit(changePersonalInfo)}>SAVE</Button>
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
            className={"bg-gray-100"}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingVertical: 20,
              paddingHorizontal: 20,
              transform: [{ translateY }],
            }}
          >
            <TouchableOpacity activeOpacity={1}>
              <View>
                <View
                  style={{
                    width: 40,
                    height: 5,
                    backgroundColor: "gray",
                    borderRadius: 3,
                    alignSelf: "center",
                    marginBottom: 15,
                  }}
                />

                <Text className="text-2xl text-center font-semibold mb-4">
                  Password Change
                </Text>

                <View className="mb-4">
                  <CustomInput
                    name="oldpassword"
                    control={control}
                    placeholder="Old Password"
                    secureTextEntry
                    rules={{ required: "Old password is required" }}
                  />
                </View>

                <View className="mb-4">
                  <CustomInput
                    name="newpassword"
                    control={control}
                    placeholder="New Password"
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
                        message:
                          "Password must include uppercase, lowercase, and a number",
                      },
                    }}
                  />
                </View>

                <View className="mb-6">
                  <CustomInput
                    name="confirmpassword"
                    control={control}
                    placeholder="Confirm Password"
                    secureTextEntry
                    rules={{ required: "Password confirmation is required" }}
                  />
                </View>

                <Pressable
                  onPress={handleSubmit(handleSavePassword)}
                  className="bg-orange-600 shadow-xl py-3 rounded-full"
                >
                  <Text className="text-white text-center font-semibold">
                    Save Password
                  </Text>
                </Pressable>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
