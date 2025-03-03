import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  ScrollView 
} from "react-native";
import { Colors } from "../config/colors"; 


const screenWidth = Dimensions.get("window").width;
const HORIZONTAL_MARGIN = 20; 

const banners = [
  {
    title: "Shop Smart, Buy Easy!",
    subtitle: "Everything you need, just a click away.",
    buttonText: "Discover",
    image: "https://img.freepik.com/photos-gratuite/ventes-achats-du-cyber-monday_23-2148688508.jpg?w=1380", 
  },
  {
    title: "Summer Sale",
    subtitle: "Up to 70% off on selected items",
    buttonText: "View Offers",
    image: "https://img.freepik.com/photos-gratuite/vue-dessus-du-smartphone-clavier-chargeur_23-2149404178.jpg?w=1380",
  },
  {
    title: "New Arrivals",
    subtitle: "Check out our latest collection",
    buttonText: "Explore",
    image: "https://img.freepik.com/vecteurs-libre/appareils-ustensiles-cuisine-icons-set_1284-10067.jpg?w=900",
  },
  {
    title: "Exclusive Deals",
    subtitle: "Members only special offers",
    buttonText: "Join Now",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=720&q=80",
  },
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);
  
  // Calculate the adjusted width for each banner slide (accounting for margins)
  const bannerWidth = screenWidth - (HORIZONTAL_MARGIN * 2);

  // Auto-scroll
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Scroll to active banner
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: activeIndex * bannerWidth,
        animated: true,
      });
    }
  }, [activeIndex]);

  // Handle manual scroll
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / bannerWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          contentContainerStyle={styles.scrollViewContent}
        >
          {banners.map((banner, index) => (
            <View key={index} style={[styles.bannerItem, { width: bannerWidth }]}>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>{banner.title}</Text>
                <Text style={styles.subtitle}>{banner.subtitle}</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>{banner.buttonText}</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={{ uri: banner.image }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: HORIZONTAL_MARGIN,
  },
  bannerContainer: {
    borderRadius: 10, 
    overflow: "hidden", 
  },
  scrollViewContent: {

  },
  bannerItem: {
    height: 150,
    backgroundColor: Colors.secondary,
    borderRadius: 20, 
    overflow: "hidden",
    flexDirection: "row",
  },
  contentContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  image: {
    width: "40%",
    height: "100%",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: Colors.dotInactive,
    marginHorizontal: 3,
  },
  paginationDotActive: {
    backgroundColor: Colors.primary,
    width: 20,
  },
});