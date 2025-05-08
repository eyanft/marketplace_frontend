import React from "react";
import { View, StyleSheet } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export default function Shimmer({ style, width, height, borderRadius }) {
  return (
    <ShimmerPlaceholder
      style={[
        {
          width: width || "100%",
          height: height || 16,
          borderRadius: borderRadius || 4,
        },
        style,
      ]}
    />
  );
}
