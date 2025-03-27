import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Colors } from "../config/colors";
import { Heart, Star } from "lucide-react-native";

const saleProducts = [
  {
    id: 1,
    image: { uri: "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=500" },
    brand: "Dorothy Perkins",
    name: "Evening Dress",
    originalPrice: "$15",
    salePrice: "$12",
    discount: "-20%",
    rating: 4.5,
    reviews: 10,
  },
  {
    id: 2,
    image: { uri: "https://images.unsplash.com/photo-1531925470851-1b589e90ed84?w=500" },
    brand: "Sitlly",
    name: "Sport Dress",
    originalPrice: "$22",
    salePrice: "$19",
    discount: "-15%",
    rating: 4.2,
    reviews: 8,
  },
  {
    id: 3,
    image: { uri: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=500" },
    brand: "Dorothy Perkins",
    name: "Sport Dress",
    originalPrice: "$14",
    salePrice: "$12",
    discount: "-20%",
    rating: 4.0,
    reviews: 12,
  },
];

const newProducts = [
  {
    id: 4,
    image: { uri: "https://images.unsplash.com/photo-1593030754534-331f3d926ee9?w=500" },
    brand: "Zara",
    name: "Casual Shirt",
    originalPrice: "$30",
    salePrice: "$25",
    discount: "-17%",
    rating: 4.8,
    reviews: 5,
  },
  {
    id: 5,
    image: { uri: "https://images.unsplash.com/photo-1602810318382-e215c3c48a8b?w=500" },
    brand: "H&M",
    name: "Jeans",
    originalPrice: "$40",
    salePrice: "$35",
    discount: "-12%",
    rating: 4.3,
    reviews: 7,
  },
];

const RatingStars = ({ rating, reviews }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <View style={styles.ratingContainer}>
      {[...Array(fullStars)].map((_, index) => (
        <Star key={index} size={12} color="#FFD700" fill="#FFD700" />
      ))}
      {hasHalfStar && <Star size={12} color="#FFD700" />}
      <Text style={styles.reviewText}>({reviews})</Text>
    </View>
  );
};

const ProductCard = ({ product }) => (
  <View style={styles.card}>
    <Image source={product.image} style={styles.image} />
    <View style={styles.badgeContainer}>
      <Text style={styles.badge}>{product.discount}</Text>
    </View>
    <TouchableOpacity style={styles.heartButton}>
      <Heart size={20} color={Colors.primary} />
    </TouchableOpacity>
    <RatingStars rating={product.rating} reviews={product.reviews} />
    <Text style={styles.brand}>{product.brand}</Text>
    <Text style={styles.name}>{product.name}</Text>
    <View style={styles.priceContainer}>
      <Text style={styles.originalPrice}>{product.originalPrice}</Text>
      <Text style={styles.salePrice}>{product.salePrice}</Text>
    </View>
  </View>
);

const ProductList = ({ title, products }) => {
  const marketingText =
    title === "On Sale"
      ? "Grab the best deals now! 🔥"
      : "Check out the latest trends! ✨";

  return (
    <View style={styles.section}>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.marketingText}>{marketingText}</Text>
      <FlatList
        horizontal
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.list}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const ProductScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ProductList title="On Sale" products={saleProducts} />
        <ProductList title="New Products" products={newProducts} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 20,
  },
  section: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAll: {
    fontSize: 14,
    color: "#bd643c",
  },
  marketingText: {
    fontSize: 12,
    color: "#888",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 16,
  },
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

export default ProductScreen;
