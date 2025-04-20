import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function DetailsProductHeader({ productName, onBack, onShare }) {
  return (
    <View style={styles.headerFixed}>
      <TouchableOpacity onPress={onBack} style={styles.headerButton}>
        <AntDesign name="left" size={20} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{productName}</Text>
      <TouchableOpacity onPress={onShare} style={styles.headerButton}>
        <Feather name="share" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerFixed: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
});
