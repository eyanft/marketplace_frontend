import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft, Search } from "lucide-react-native";

const Header = ({ title }) => {
  const navigation = useNavigation();

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
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "black",
  },
});

export default Header;
