import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import OnboardingScreen from '../screens/OnboardingScreen';

export default function Index() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOnboarded) {
      router.replace('/(tabs)/home');
    }
  }, [isOnboarded]);

  return (
    <View style={{ flex: 1 }}>
      <OnboardingScreen onFinish={() => setIsOnboarded(true)} />
    </View>
  );
}