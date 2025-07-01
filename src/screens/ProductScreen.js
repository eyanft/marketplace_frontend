import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import ProductList from "../components/lists/ProductList";
import { getProductsGroupedByCategory } from "../services/product/productService";
import { useQuery } from "@tanstack/react-query";
import { useZustandStore } from "../store/zustand";

// const saleProducts = [
//   {
//     id: 1,
//     image: { uri: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500" },
//     brand: "Dorothy Perkins",
//     name: "Evening Dress",
//     originalPrice: "$15",
//     salePrice: "$12",
//     discount: "-20%",
//     rating: 4.5,
//     reviews: 10,
//     description: "A stunning evening dress perfect for special occasions. Features elegant design with delicate details and a flattering silhouette. Made from premium fabric with a subtle sheen.",
//     colors: ["#000000", "#FF0000", "#0000FF"],
//     sizes: ["XS", "S", "M", "L", "XL"],
//   },
//   {
//     id: 2,
//     image: { uri: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500" },
//     brand: "Sitlly",
//     name: "Sport Dress",
//     originalPrice: "$22",
//     salePrice: "$19",
//     discount: "-15%",
//     rating: 4.2,
//     reviews: 8,
//     description: "Comfortable and stylish sport dress made with breathable fabric. Perfect for active lifestyle and casual wear. Features moisture-wicking technology.",
//     colors: ["#000000", "#FFFFFF", "#FF69B4"],
//     sizes: ["S", "M", "L"],
//   }
// ];

// const newProducts = [
//   {
//     id: 4,
//     image: { uri: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500" },
//     brand: "Zara",
//     name: "Casual Shirt",
//     originalPrice: "$30",
//     salePrice: "$25",
//     discount: "-17%",
//     rating: 4.8,
//     reviews: 5,
//     description: "Classic casual shirt with modern cut. Versatile piece for any wardrobe. Made from 100% cotton with easy-care finish.",
//     colors: ["#FFFFFF", "#87CEEB", "#F0E68C"],
//     sizes: ["S", "M", "L", "XL"],
//   },
//   {
//     id: 5,
//     image: { uri: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500" },
//     brand: "H&M",
//     name: "Jeans",
//     originalPrice: "$40",
//     salePrice: "$35",
//     discount: "-12%",
//     rating: 4.3,
//     reviews: 7,
//     description: "Premium denim jeans with perfect fit. Features modern wash and comfortable stretch material. Classic five-pocket styling.",
//     colors: ["#000080", "#4169E1"],
//     sizes: ["28", "30", "32", "34"],
//   },
//   {
//     id: 6,
//     image: { uri: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500" },
//     brand: "Mango",
//     name: "Leather Jacket",
//     originalPrice: "$89",
//     salePrice: "$75",
//     discount: "-16%",
//     rating: 4.7,
//     reviews: 15,
//     description: "Classic leather jacket with modern details. Made from premium leather with a butter-soft finish. Features asymmetric zip and multiple pockets.",
//     colors: ["#000000", "#8B4513"],
//     sizes: ["S", "M", "L", "XL"],
//   }
// ];

const ProductScreen = ({ embedded = false }) => {
  const { user } = useZustandStore();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", user?.id],
    queryFn: () => getProductsGroupedByCategory(user?.id),
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Something went wrong!</Text>;
  }

  const content = (
    <View style={embedded ? styles.embeddedContainer : styles.container}>
      {products.map((item, idx) => {
        return (
          <ProductList
            key={idx}
            category={item.category}
            products={item.products}
            description={item.description}
          />
        );
      })}
    </View>
  );

  if (embedded) {
    return content;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {content}
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
  embeddedContainer: {
    backgroundColor: "#F5F5F5",
  },
});

export default ProductScreen;
