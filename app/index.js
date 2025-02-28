import { View } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import OnboardingScreen from "../src/screens/OnboardingScreen";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <OnboardingScreen onFinish={() => router.replace("/(auth)/SignUp")} />
    </View>
  );
}
