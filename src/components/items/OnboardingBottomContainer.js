import React from "react";
import { View, StyleSheet } from "react-native";
import OnboardingPagination from "../pagination/OnboardingPagination";
import NavigationButtons from "../buttons/NavigationButtons";

export default function OnboardingBottomContainer({
  currentIndex,
  totalSlides,
  onNext,
  onPrevious,
}) {
  return (
    <View style={styles.bottomContainer}>
      <OnboardingPagination total={totalSlides} currentIndex={currentIndex} />
      <NavigationButtons
        currentIndex={currentIndex}
        totalSlides={totalSlides}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
