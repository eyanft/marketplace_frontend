import { View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import OnboardingScreen from "../src/screens/OnboardingScreen";

export default function Index() {
  const router = useRouter();
  const [isOnboarded, setIsOnboarded] = useState(false);
  
  // Create a handler function that performs navigation after state update
  const handleOnboardingFinish = () => {
    setIsOnboarded(true);
    router.replace("/(tabs)/home");
  };

  return (
    <View style={{ flex: 1 }}>
      <OnboardingScreen onFinish={handleOnboardingFinish} />
    </View>
  );
}