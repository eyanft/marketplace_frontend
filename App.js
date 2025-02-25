import { useState } from 'react';
import { View } from 'react-native';
import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [isOnboarded, setIsOnboarded] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {isOnboarded ? <HomeScreen /> : <OnboardingScreen onFinish={() => setIsOnboarded(true)} />}
    </View>
  );
}
