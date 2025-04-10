import { View, ScrollView } from 'react-native';
import HeroBanner from '../../components/homeHero';
import SearchBar from '../../components/SearchBar';
import LocationSelector from '../../components/LocationSelector';
import Notification from '../../components/Notification';
import CategoryList from '../../components/CategoryList';
import ProductScreen from '../../components/ProductScreen';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        <Notification />
        <View className="mt-4 mx-4">
          <LocationSelector />
        </View>
        <View className="mt-4 mx-4">
          <SearchBar />
        </View>
        <View className="mt-6">
          <HeroBanner />
        </View>

        <View className="mt-6 mx-4">
          <CategoryList />
        </View>
        <View className="mt-6 mx-4">
          <ProductScreen />
        </View>
      </ScrollView>
    </View>
  );
}
