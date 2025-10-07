import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";
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
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.skeletonSection}>
            {[0, 1, 2].map((section) => (
              <View key={section} style={{ marginBottom: 24 }}>
                <ContentLoader
                  speed={1.2}
                  width={360}
                  height={28}
                  backgroundColor="#E6E6E6"
                  foregroundColor="#F2F2F2"
                >
                  <Rect x="16" y="4" rx="6" ry="6" width="200" height="20" />
                </ContentLoader>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
                  {[0, 1, 2, 3].map((i) => (
                    <View key={i} style={{ marginLeft: i === 0 ? 16 : 12 }}>
                      <ContentLoader
                        speed={1.2}
                        width={140}
                        height={190}
                        backgroundColor="#E6E6E6"
                        foregroundColor="#F2F2F2"
                      >
                        <Rect x="0" y="0" rx="10" ry="10" width="140" height="120" />
                        <Rect x="0" y="130" rx="6" ry="6" width="120" height="14" />
                        <Rect x="0" y="150" rx="6" ry="6" width="90" height="12" />
                        <Rect x="0" y="170" rx="6" ry="6" width="70" height="12" />
                      </ContentLoader>
                    </View>
                  ))}
                </ScrollView>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
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
