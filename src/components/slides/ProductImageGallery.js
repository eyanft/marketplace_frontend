import React, { useRef } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Colors } from "../../../config/colors";

const { width } = Dimensions.get("window");

export default function ProductImageGallery({
  images,
  activeIndex,
  setActiveIndex,
}) {
  const scrollViewRef = useRef(null);
  const isScrollingRef = useRef(false);
  const lastOffsetRef = useRef(0);

  const handleScroll = (event) => {
    const slideSize = width;
    const currentOffset = event.nativeEvent.contentOffset.x;
    const totalWidth = slideSize * images.length;

    if (currentOffset >= totalWidth - slideSize) {
      if (currentOffset > lastOffsetRef.current && !isScrollingRef.current) {
        isScrollingRef.current = true;
        scrollViewRef.current?.scrollTo({ x: 0, animated: true });
        setActiveIndex(0);
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 300);
      }
    } else {
      const index = Math.round(currentOffset / slideSize);
      setActiveIndex(index);
    }
    lastOffsetRef.current = currentOffset;
  };

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.imageContainer}
      >
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              scrollViewRef.current?.scrollTo({
                x: index * width,
                animated: true,
              });
              setActiveIndex(index);
            }}
            style={styles.paginationDotContainer}
          >
            <View
              style={[
                styles.paginationDot,
                index === activeIndex && styles.paginationDotActive,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: width,
    marginTop: 56,
  },
  image: {
    width: width,
    height: width,
    resizeMode: "cover",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 16,
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paginationDotContainer: {
    padding: 4,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: Colors.primary,
    width: 20,
    borderRadius: 4,
  },
});
