import React, { useState, useRef } from "react";
import { Pressable, Switch, Text, View, TouchableOpacity } from "react-native";
import Title from "../../src/components/text/CustomText";
import CustomInput from "../../src/components/input/CustomInput";
import { Animated, Modal } from "react-native";

export default function Settings() {
  const slideAnimation = useRef(new Animated.Value(0)).current;

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
  };

  const handleSavePassword = () => {
    handleCloseSheet();
  };

  const translateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  return (
    <View className="p-8 mt-16 gap-5">
      <Title className="text-5xl font-medium">Settings</Title>
      <Title className="text-xl font-medium">Personal information</Title>
      <CustomInput placeholder={"Full name"} />
      <CustomInput placeholder={"Date of Birth"} />
      <View className="flex flex-row items-center justify-between mt-10">
        <Title className="text-xl font-medium">Password</Title>
        <Pressable onPress={handleChangePassword}>
          <Title className="text-lg opacity-50">Change</Title>
        </Pressable>
      </View>

      <CustomInput placeholder={"Password"} />
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
                  <CustomInput placeholder={"Old Password"} />
                </View>

                <View className="mb-4">
                  <CustomInput placeholder={"New Password"} />
                </View>

                <View className="mb-6">
                  <CustomInput placeholder={"Repeat New Password"} />
                </View>

                <Pressable
                  onPress={handleSavePassword}
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
