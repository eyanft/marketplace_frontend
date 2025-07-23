import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";

export default function RelatedProductItem({ item, onPress }) {
  // Add safety check for null items
  if (!item) return null;

  const handlePress = () => {
    if (onPress && item) {
      onPress(item);
    }
  };

  return (
    <TouchableOpacity style={styles.relatedItem} onPress={handlePress}>
      <Image
        source={{
          uri: item.imageUrls?.[0] || "https://via.placeholder.com/150",
        }}
        style={styles.relatedImage}
      />
      <View style={styles.relatedInfo}>
        <Text style={styles.relatedBrand}>
          {item.category || "Unknown Category"}
        </Text>
        <Text style={styles.relatedName} numberOfLines={2}>
          {item.name || "Unknown Product"}
        </Text>
        <Text style={styles.relatedPrice}>${item.price || 0}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  relatedItem: {
    width: 150,
    marginLeft: 12,
  },
  relatedImage: {
    width: "100%",
    height: 200,
    borderRadius: 4,
    marginBottom: 8,
  },
  relatedInfo: {
    paddingHorizontal: 4,
  },
  relatedBrand: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  relatedName: {
    fontSize: 14,
    marginBottom: 4,
  },
  relatedPrice: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
