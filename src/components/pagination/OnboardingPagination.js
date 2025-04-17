import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../../config/colors";

export default function OnboardingPagination({ total, currentIndex }) {
  return (
    <View style={styles.pagination}>
      {Array(total)
        .fill(0)
        .map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dotInactive,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: Colors.dotActive,
  },
});