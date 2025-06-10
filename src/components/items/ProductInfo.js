import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Reviews from "../items/Reviews";

export default function ProductInfo({ product, onRatingPress }) {
  return (
    <View style={styles.productInfo}>
      <Text style={styles.brand}>{product?.name}</Text>
      <Text style={styles.name}>{product?.seller.name}</Text>
      <Reviews
        rating={product?.rating}
        reviewCount={product?.reviewCount || product?.reviews}
        onPress={onRatingPress}
      />
      <Text style={styles.description}>{product?.description}</Text>
      <Text style={styles.price}>
        {product?.salePrice || product?.price} DT
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  productInfo: {
    marginBottom: 16,
  },
  brand: {
    fontSize: 20,
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
