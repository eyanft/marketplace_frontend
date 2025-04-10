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
import { useRouter } from 'expo-router';

const saleProducts = [
  {
    id: 1,
    image: { uri: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500" },
    brand: "Dorothy Perkins",
    name: "Evening Dress",
    originalPrice: "$15",
    salePrice: "$12",
    discount: "-20%",
    rating: 4.5,
    reviews: 10,
    description: "A stunning evening dress perfect for special occasions. Features elegant design with delicate details and a flattering silhouette. Made from premium fabric with a subtle sheen.",
    colors: ["#000000", "#FF0000", "#0000FF"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    image: { uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500" },
    brand: "Sitlly",
    name: "Sport Dress",
    originalPrice: "$22",
    salePrice: "$19",
    discount: "-15%",
    rating: 4.2,
    reviews: 8,
    description: "Comfortable and stylish sport dress made with breathable fabric. Perfect for active lifestyle and casual wear. Features moisture-wicking technology.",
    colors: ["#000000", "#FFFFFF", "#FF69B4"],
    sizes: ["S", "M", "L"],
  },
  {
    id: 3,
    image: { uri: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500" },
    brand: "Dorothy Perkins",
    name: "Summer Dress",
    originalPrice: "$14",
    salePrice: "$12",
    discount: "-20%",
    rating: 4.0,
    reviews: 12,
    description: "Light and airy summer dress with floral pattern. Perfect for warm days and casual outings. Made from lightweight cotton blend.",
    colors: ["#FFFFFF", "#FFB6C1", "#98FB98"],
    sizes: ["XS", "S", "M", "L"],
  },
];

const newProducts = [
  {
    id: 4,
    image: { uri: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500" },
    brand: "Zara",
    name: "Casual Shirt",
    originalPrice: "$30",
    salePrice: "$25",
    discount: "-17%",
    rating: 4.8,
    reviews: 5,
    description: "Classic casual shirt with modern cut. Versatile piece for any wardrobe. Made from 100% cotton with easy-care finish.",
    colors: ["#FFFFFF", "#87CEEB", "#F0E68C"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    image: { uri: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500" },
    brand: "H&M",
    name: "Jeans",
    originalPrice: "$40",
    salePrice: "$35",
    discount: "-12%",
    rating: 4.3,
    reviews: 7,
    description: "Premium denim jeans with perfect fit. Features modern wash and comfortable stretch material. Classic five-pocket styling.",
    colors: ["#000080", "#4169E1"],
    sizes: ["28", "30", "32", "34"],
  },
  {
    id: 6,
    image: { uri: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500" },
    brand: "Mango",
    name: "Leather Jacket",
    originalPrice: "$89",
    salePrice: "$75",
    discount: "-16%",
    rating: 4.7,
    reviews: 15,
    description: "Classic leather jacket with modern details. Made from premium leather with a butter-soft finish. Features asymmetric zip and multiple pockets.",
    colors: ["#000000", "#8B4513"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 7,
    image: { uri: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500" },
    brand: "Nike",
    name: "Summer Dress",
    originalPrice: "$55",
    salePrice: "$45",
    discount: "-18%",
    rating: 4.6,
    reviews: 9,
    description: "Elegant summer dress with a unique pattern. Features a flattering cut and comfortable fit. Perfect for summer parties and special occasions.",
    colors: ["#FFB6C1", "#98FB98", "#87CEEB"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 8,
    image: { uri: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500" },
    brand: "Adidas",
    name: "Sport Jacket",
    originalPrice: "$65",
    salePrice: "$52",
    discount: "-20%",
    rating: 4.4,
    reviews: 11,
    description: "High-performance sport jacket with moisture-wicking technology. Perfect for outdoor activities and training. Features reflective details for safety.",
    colors: ["#000000", "#FF0000", "#0000FF"],
    sizes: ["S", "M", "L", "XL"],
  }
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

const ProductCard = ({ product }) => {
  const router = useRouter();

  const handleProductPress = () => {
    const productData = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.salePrice.replace('$', ''),
      imageUrl: product.image.uri,
      rating: product.rating,
      reviewCount: product.reviews,
      description: product.description,
      colors: product.colors,
      sizes: product.sizes,
      discount: product.discount,
      originalPrice: product.originalPrice
    };

    router.push({
      pathname: `/product/${product.id}`,
      params: { product: JSON.stringify(productData) }
    });
  };

  return (
    <TouchableOpacity onPress={handleProductPress}>
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
    </TouchableOpacity>
  );
};

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
