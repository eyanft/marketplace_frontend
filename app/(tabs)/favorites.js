import React, { useMemo, useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from "react-native";
import Header from "../../src/components/items/Header";
import FilterTags from "../../src/components/filters/FilterTags";
import FilterControls from "../../src/components/filters/FilterControls";
import ProductCard from "../../src/components/cards/ProductCard";
import { useZustandStore } from "../../src/store/zustand";

const FavoritesScreen = () => {
  const { favorites } = useZustandStore();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Favorites" />

      <FlatList
        data={favorites}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productGrid}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
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
    justifyContent: "space-between",
    marginBottom: 15,
    gap: 16,
  },
  productGrid: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
});

export default FavoritesScreen;
