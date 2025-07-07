import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import RelatedProductItem from "../items/RelatedProductItem";

export default function RelatedProducts({ products, onProductPress }) {
  return (
    <>
      <View style={styles.relatedSection}>
        <Text style={styles.relatedTitle}>You can also like this</Text>
        <Text style={styles.itemCount}>{products.length} items</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.relatedProducts}
      >
        {products.map((item) => (
          <RelatedProductItem
            key={item.id}
            item={item}
            onPress={onProductPress}
          />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  relatedSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  relatedTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemCount: {
    fontSize: 12,
    color: "#666",
  },
  relatedProducts: {
    marginLeft: -12,
  },
});
