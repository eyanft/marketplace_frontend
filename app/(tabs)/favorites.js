import React, { useMemo, useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Heart, ShoppingBag } from "lucide-react-native";
import { useRouter } from "expo-router";
import Header from "../../src/components/items/Header";
import FilterTags from "../../src/components/filters/FilterTags";
import FilterControls from "../../src/components/filters/FilterControls";
import ProductCard from "../../src/components/cards/ProductCard";
import { useZustandStore } from "../../src/store/zustand";
import { Colors } from "../../config/colors";
import Title from "../../src/components/text/CustomText";
const EmptyFavoritesState = () => {
  const router = useRouter();

  const handleShopNow = () => {
    router.push("/(tabs)/home");
  };

  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyContent}>
        <View style={styles.heartContainer}>
          <Heart size={80} color={Colors.primary} strokeWidth={1.5} />
          <View style={styles.heartOverlay}>
            <Heart size={60} color="#bd643c" fill="#bd643c" opacity={0.3} />
          </View>
        </View>

        <Text style={styles.emptyTitle}>No Favorites Yet</Text>
        <Text style={styles.emptySubtitle}>
          Start exploring and add items to your favorites by tapping the heart
          icon
        </Text>

        <View style={styles.illustrationContainer}>
          <ShoppingBag size={40} color={Colors.primary} strokeWidth={1} />
        </View>

        <TouchableOpacity style={styles.shopButton} onPress={handleShopNow}>
          <Text style={styles.shopButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FavoritesScreen = () => {
  const { favorites } = useZustandStore();

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView style={{ flex: 1 }}>
        {favorites.length === 0 ? (
          <EmptyFavoritesState />
        ) : (
          <ScrollView style={{ flex: 1 }}>
            <View className="p-6 pt-16">
              <View className="mb-6">
                <Title className="text-4xl font-bold text-gray-900 mb-2">
                  My Favorites
                </Title>
                <Title className="text-base text-gray-600">
                  All your favorite products in one place
                </Title>
              </View>
              <FlatList
                data={favorites}
                renderItem={({ item }) => <ProductCard product={item} />}
                numColumns={2}
                columnWrapperStyle={styles.productRow}
                contentContainerStyle={styles.productGrid}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollArea: {
    paddingHorizontal: 10,
    marginTop: 12,
  },
  productRow: {
    justifyContent: "flex-start",
    marginBottom: 15,
  },
  productGrid: {
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 20,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyContent: {
    alignItems: "center",
    maxWidth: 300,
  },
  heartContainer: {
    position: "relative",
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  heartOverlay: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  illustrationContainer: {
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  shopButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  shopButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default FavoritesScreen;
