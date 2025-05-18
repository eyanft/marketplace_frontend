import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Shimmer from "../../utils/shimmer/ShimmerPlaceholder"; // Using your existing Shimmer component

const ShimmerProductCard = () => {
  return (
    <View style={styles.cardContainer}>
      <Shimmer height={184} borderRadius={8} style={styles.productImage} />

      <View style={styles.contentContainer}>
        <View style={styles.ratingContainer}>
          <Shimmer width={100} height={14} style={styles.rating} />
        </View>

        <Shimmer width="60%" height={11} style={styles.brandText} />

        <Shimmer width="90%" height={16} style={styles.nameText} />

        <Shimmer width={70} height={14} style={styles.price} />
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const cardWidth = (windowWidth - 48) / 2;

const styles = StyleSheet.create({
  cardContainer: {
    width: cardWidth,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
  },
  contentContainer: {
    padding: 8,
  },
  ratingContainer: {
    marginTop: 6,
    marginLeft: 6,
  },
  rating: {
    marginBottom: 4,
  },
  brandText: {
    marginTop: 8,
    marginLeft: 6,
  },
  nameText: {
    marginTop: 8,
    marginLeft: 6,
  },
  price: {
    marginTop: 8,
    marginLeft: 6,
    marginBottom: 6,
  },
});

export default ShimmerProductCard;
