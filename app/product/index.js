import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
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
import { getfilteredProduct } from "../../src/services/product/productService";
import { useQuery } from "@tanstack/react-query";

export default function products() {
  const router = useRouter();
  const params = useSearchParams();

  const [activeFilters, setActiveFilters] = useState([params.get("category")]);
  const filter = { categoryName: activeFilters[0] };

  console.log(filter);
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", activeFilters],
    queryFn: () => getfilteredProduct(filter),
  });
  const removeFilter = (tag) => {
    const updatedFilters = activeFilters.filter((filter) => filter !== tag);
    setActiveFilters(updatedFilters);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Favorites" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollArea}
      >
        <FilterTags tags={activeFilters} onRemoveFilter={removeFilter} />
      </ScrollView>

      <FilterControls />

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productGrid}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollArea: {
    paddingHorizontal: 10,
    marginTop: 12,
    maxHeight: 40,
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
