import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Search } from "lucide-react-native";
import { Feather } from "@expo/vector-icons";
import Button from "../ui/Button";

const Header = ({ title, showBack, onBack }) => {
  return (
    <View style={styles.header}>
      {/* Left: Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <ArrowLeft size={24} color="black" />
      </TouchableOpacity>

      {/* Center: Title */}
      <View style={styles.titleContainer}>
        {showBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Feather name="chevron-left" size={28} color="black" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right: Search Icon */}
      {/* <TouchableOpacity style={styles.searchButton}>
        <Search size={20} color="black" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    paddingHorizontal: 12,
    position: "relative",
  },
  backButton: {
    padding: 8,
    position: "absolute",
    left: 12,
    zIndex: 1,
  },
  searchButton: {
    padding: 8,
    position: "absolute",
    right: 12,
    zIndex: 1,
  },
  titleContainer: {
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexDirection: "row",
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 5,
    zIndex: 2,
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  searchButton: {
    position: "absolute",
    right: 15,
    top: 5,
  },
});

export default Header;
