import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../config/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ONBOARDING_DATA = [
  {
    title: "Shop Smarter, Live Better",
    description:
      "Discover exclusive deals and a seamless shopping experience at your fingertips.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Sell with Ease, Earn More",
    description:
      "List your items in seconds and connect with buyers effortlessly.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Join the Marketplace Revolution",
    description:
      "A trusted platform where buyers and sellers meet for a smooth transaction.",
    image:
      "https://images.unsplash.com/photo-1586880244406-556ebe35f282?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function OnboardingScreen({ onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const onNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current.scrollTo({
        x: SCREEN_WIDTH * nextIndex,
        animated: true,
      });
    } else {
      onFinish();
    }
  };

  const onPrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      scrollViewRef.current.scrollTo({
        x: SCREEN_WIDTH * prevIndex,
        animated: true,
      });
    }
  };

  const onScroll = (event) => {
    const pageIndex = Math.round(
      event.nativeEvent.contentOffset.x / SCREEN_WIDTH
    );
    setCurrentIndex(pageIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {ONBOARDING_DATA.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.pagination}>
          {ONBOARDING_DATA.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>

        {currentIndex === ONBOARDING_DATA.length - 1 ? (
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
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
  bottomContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
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
