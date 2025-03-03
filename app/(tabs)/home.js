import { View } from 'react-native';
import HeroBanner from '../../components/homeHero'; 

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-gray-100">
      <HeroBanner
        image={require('../../assets/images/hero.png')}
        title="All You Need, One Place."
      />
    </View>
  );
}
