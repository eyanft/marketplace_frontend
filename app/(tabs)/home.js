import { View, ScrollView } from 'react-native';
import HeroBanner from '../../src/components/items/homeHero';
import SearchBar from '../../src/components/filters/SearchBar';
import LocationSelector from '../../src/components/items/LocationSelector';
import Notification from '../../src/components/items/Notification';
import CategoryList from '../../src/components/lists/CategoryList';
import ProductScreen from '../../src/screens/ProductScreen';

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
          <ProductScreen embedded={true} />
        </View>
      </ScrollView>
    </View>
  );
}
