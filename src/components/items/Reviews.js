import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Reviews({ rating, reviewCount, onPress }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign
          key={i}
          name={i <= rating ? "star" : "staro"}
          size={14}
          color={i <= rating ? "#FFD700" : "#666"}
        />
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity style={styles.ratingContainer} onPress={onPress}>
      <View style={styles.stars}>{renderStars(rating)}</View>
      <Text style={styles.reviews}>({reviewCount || 0})</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  stars: {
    flexDirection: "row",
    marginRight: 4,
  },
  reviews: {
    fontSize: 12,
    color: "#666",
  },
});
