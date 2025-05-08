import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import ProductCard from "../cards/HomeCard";
import { useRouter } from "expo-router";
import { useZustandStore } from "../../store/zustand";

const ProductList = ({ category, products, description }) => {
  const router = useRouter();
  const { setFilters } = useZustandStore();
  const onViewAllPress = (category) => {
    setFilters({ selectedCategory: category });
    router.push({
      pathname: `product`,
    });
  };
  return (
    <View style={styles.section}>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>{category}</Text>
        <TouchableOpacity onPress={() => onViewAllPress(category)}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.marketingText}>{description}</Text>
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

const styles = StyleSheet.create({
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
});

export default ProductList;
