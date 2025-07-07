import { View } from "react-native";
import { router } from "expo-router";
import { useEffect } from "react";
import OnboardingScreen from "../src/screens/OnboardingScreen";
import { useZustandStore } from "../src/store/zustand";

export default function Index() {
  const { user, loadUser, loadFavorites } = useZustandStore();
  useEffect(() => {
    loadUser();
    loadFavorites();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <OnboardingScreen
        onFinish={() =>
          user
            ? router.replace("/(tabs)/home")
            : router.replace("/(auth)/login")
        }
      />
    </View>
  );
}
