import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import ProductList from "../components/lists/ProductList";
import { getProductsGroupedByCategory } from "../services/product/productService";
import { useQuery } from "@tanstack/react-query";
import { useZustandStore } from "../store/zustand";

const ProductScreen = ({ embedded = false }) => {
  const { user } = useZustandStore();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", user?.firebaseID],
    queryFn: () => getProductsGroupedByCategory(user?.firebaseID),
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Something went wrong!</Text>;
  }

  const content = (
    <View style={embedded ? styles.embeddedContainer : styles.container}>
      {products.map((item, idx) => {
        return (
          <ProductList
            key={idx}
            category={item.category}
            products={item.products}
            description={item.description}
          />
        );
      })}
    </View>
  );

  if (embedded) {
    return content;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>{content}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 20,
  },
  embeddedContainer: {
    backgroundColor: "#F5F5F5",
  },
});

export default ProductScreen;
