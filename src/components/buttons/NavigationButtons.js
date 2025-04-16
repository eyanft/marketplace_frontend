import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../../config/colors";

export default function NavigationButtons({ 
  currentIndex, 
  totalSlides, 
  onNext, 
  onPrevious 
}) {
  const isLastSlide = currentIndex === totalSlides - 1;

  return (
    <>
      {isLastSlide ? (
        <TouchableOpacity style={styles.startButton} onPress={onNext}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.navigationButtons}>
          {currentIndex > 0 ? (
            <TouchableOpacity style={styles.navButton} onPress={onPrevious}>
              <Icon name="arrow-back" size={24} color={Colors.primary} />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 50 }} />
          )}

          <TouchableOpacity style={styles.navButtonFilled} onPress={onNext}>
            <Icon name="arrow-forward" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  startButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  navButtonFilled: {
    backgroundColor: Colors.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});