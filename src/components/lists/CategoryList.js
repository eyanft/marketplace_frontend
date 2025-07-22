import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { getCategories } from "../../services/category/categoryService";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useZustandStore } from "../../store/zustand";

// const categories = [
//   { name: "Clothing", icon: require("../../../assets/images/clothing.png") },
//   {
//     name: "Electronics",
//     icon: require("../../../assets/images/electronics.png"),
//   },
//   { name: "Furniture", icon: require("../../../assets/images/furniture.png") },
//   {
//     name: "Automotive",
//     icon: require("../../../assets/images/automotive.png"),
//   },
// ];

const CategoryItem = ({ name, icon }) => {
  const router = useRouter();
  const { setFilters } = useZustandStore();

  const onCategorySelect = () => {
    setFilters({ selectedCategory: name });
    router.push({
      pathname: `/product`,
    });
  };
  return (
    <TouchableOpacity
      onPress={onCategorySelect}
      style={styles.categoryContainer}
    >
      <View style={styles.iconContainer}>
        <Image
          source={{ uri: icon }}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.categoryText}>{name}</Text>
    </TouchableOpacity>
  );
};

const CategoryList = () => {
  const router = useRouter();
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Something went wrong!</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Category</Text>
        <TouchableOpacity onPress={() => router.push("/categories")}>
          <Text style={styles.seeAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryItem name={item.name} icon={item.imageUrl} />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAll: {
    fontSize: 14,
    color: "#bd643c",
  },
  categoryContainer: {
    alignItems: "center",
    width: 80,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: "#F9F1E7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    width: 30,
    height: 30,
  },
  categoryText: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
});

export default CategoryList;
