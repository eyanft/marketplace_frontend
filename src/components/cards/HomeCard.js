import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Heart, Star } from "lucide-react-native";
import { useRouter } from "expo-router";

const RatingStars = ({ rating, reviews }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <View style={styles.ratingContainer}>
      {rating ? (
        <>
          {" "}
          {[...Array(fullStars)].map((_, index) => (
            <Star key={index} size={12} color="#FFD700" fill="#FFD700" />
          ))}
          {hasHalfStar && <Star size={12} color="#FFD700" />}
        </>
      ) : (
        <Text style={styles.reviewText}>No reviews yet</Text>
      )}
      <Text style={styles.reviewText}>({reviews})</Text>
    </View>
  );
};

const ProductCard = ({ product }) => {
  const router = useRouter();

  const handleProductPress = () => {
    // const productData = {
    //   id: product.id,
    //   name: product.name,
    //   // brand: product.brand,
    //   price: product.salePrice.replace("$", "DT"),
    //   imageUrl: product.imageUrl,
    //   // rating: product.rating,
    //   // reviewCount: product.reviews,
    //   description: product.description,
    //   // colors: product.colors,
    //   // sizes: product.sizes,
    //   // discount: product.discount,
    //   // originalPrice: product.originalPrice
    // };

    router.navigate({
      pathname: `/product/${product.id}`,
      params: { product: JSON.stringify(product) },
    });
  };

  return (
    <TouchableOpacity onPress={handleProductPress}>
      <View style={styles.card}>
        <Image source={{ uri: product.imageUrls[0] }} style={styles.image} />
        {/* <View style={styles.badgeContainer}>
          <Text style={styles.badge}>{product.discount}</Text>
        </View> */}
        <TouchableOpacity style={styles.heartButton}>
          <Heart size={20} color="#bd643c" />
        </TouchableOpacity>
        <RatingStars rating={product.rating} reviews={product.reviewCount} />
        <Text style={styles.brand}>{product.name}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <View style={styles.priceContainer}>
          {/* <Text style={styles.originalPrice}>{product.price}</Text> */}
          <Text style={styles.salePrice}>{product.price} DT</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    marginRight: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  badgeContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#bd643c",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badge: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  heartButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  reviewText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#888",
  },
  brand: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  originalPrice: {
    textDecorationLine: "line-through",
    color: "#888",
    marginRight: 8,
  },
  salePrice: {
    color: "brown",
    fontWeight: "bold",
  },
});

export default ProductCard;
