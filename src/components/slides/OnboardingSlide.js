import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../../config/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function OnboardingSlide({ title, description, image }) {
  return (
    <View style={styles.slide}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 40,
  },
  description: {
    fontSize: 17,
    fontWeight: "400",
    color: Colors.text,
    textAlign: "center",
    paddingHorizontal: 30,
    lineHeight: 24,
  },
  image: {
    width: "80%",
    height: 300,
    borderRadius: 20,
    resizeMode: "cover",
    marginBottom: 40,
  },
});