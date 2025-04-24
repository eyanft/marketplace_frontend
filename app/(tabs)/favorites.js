import React from "react";
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

const filterTags = [
  { id: "1", name: "Dress" },
  { id: "2", name: "T-Shirts" },
  { id: "3", name: "Golf 5" },
  { id: "4", name: "PC" },
];

const products = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    brand: "LIME",
    name: "Shirt",
    color: "Blue",
    size: "L",
    price: "10$",
    rating: 5,
    reviews: 8,
    isSoldOut: false,
    isNew: false,
    discount: null,
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    brand: "Mango",
    name: "Longsleeve Violeta",
    color: "Orange",
    size: "S",
    price: "46$",
    rating: 4,
    reviews: 2,
    isSoldOut: false,
    isNew: true,
    discount: null,
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    brand: "Olivier",
    name: "Shirt",
    color: "Gray",
    size: "L",
    price: "52$",
    rating: 5,
    reviews: 10,
    isSoldOut: true,
    isNew: false,
    discount: null,
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400&q=80",
    brand: "&Berries",
    name: "T-Shirt",
    color: "Black",
    size: "S",
    price: "39$",
    originalPrice: "55$",
    rating: 0,
    reviews: 0,
    isSoldOut: false,
    isNew: false,
    discount: "-30%",
  },
];
const FavoritesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Favorites" />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollArea}
      >
        <FilterTags tags={filterTags} />
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
