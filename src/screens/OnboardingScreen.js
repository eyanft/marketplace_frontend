import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../config/colors";
import OnboardingSlide from "../components/slides/OnboardingSlide";
import OnboardingBottomContainer from "../components/items/OnboardingBottomContainer";

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
  const isScrolling = useRef(false);

  const onNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish();
    }
  };

  const onPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      isScrolling.current = true;
      scrollViewRef.current.scrollTo({
        x: SCREEN_WIDTH * currentIndex,
        animated: true,
      });
    }
  }, [currentIndex]);

  const handleMomentumScrollEnd = () => {
    isScrolling.current = false;
  };

  const onScroll = (event) => {
    if (isScrolling.current) return;

    const offsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(offsetX / SCREEN_WIDTH);

    if (pageIndex !== currentIndex) {
      setCurrentIndex(pageIndex);
    }
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
        onMomentumScrollEnd={handleMomentumScrollEnd}
        decelerationRate="fast"
      >
        {ONBOARDING_DATA.map((item, index) => (
          <OnboardingSlide
            key={index}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </ScrollView>

      <OnboardingBottomContainer
        currentIndex={currentIndex}
        totalSlides={ONBOARDING_DATA.length}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});