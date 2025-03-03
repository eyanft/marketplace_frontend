import { View, ScrollView } from "react-native";
import HeroBanner from "../../components/homeHero";
import SearchBar from "../../components/SearchBar";
import LocationSelector from "../../components/LocationSelector";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1">
        <View className="mt-4 mx-4">
          <LocationSelector />
        </View>
        <View className="mt-4 mx-4">
          <SearchBar />
        </View>
        <View className="mt-6">
          <HeroBanner/>
        </View>
      </ScrollView>
    </View>
  );
}