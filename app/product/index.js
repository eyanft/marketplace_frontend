import { useFocusEffect, useRouter } from "expo-router";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import Header from "../../src/components/items/Header";
import FilterTags from "../../src/components/filters/FilterTags";
import FilterControls from "../../src/components/filters/FilterControls";
import ProductCard from "../../src/components/cards/ProductCard";
import { getfilteredProduct } from "../../src/services/product/productService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ShimmerProductCard from "../../src/components/shimmer/ProductShimmer";
import { getSortedProducts } from "../../src/services/product/productService";
import { useZustandStore } from "../../src/store/zustand";
import { Package, Plus, Store, Search, ShoppingBag } from "lucide-react-native";
import { Colors } from "../../config/colors";
import Title from "../../src/components/text/CustomText";

const EmptyProductsState = ({
  type,
  hasFilters,
  onClearFilters,
  onAddProduct,
}) => {
  const getEmptyStateContent = () => {
    if (type === "listed") {
      return {
        icon: <Store size={80} color={Colors.primary} strokeWidth={1.5} />,
        title: "No Products Listed",
        subtitle: hasFilters
          ? "No products match your current filters. Try adjusting your search criteria."
          : "You haven't listed any products yet. Start selling by adding your first product!",
        buttonText: hasFilters ? "Clear Filters" : "Add Product",
        buttonAction: hasFilters ? onClearFilters : onAddProduct,
        showButton: true,
      };
    } else if (hasFilters) {
      return {
        icon: <Search size={80} color={Colors.primary} strokeWidth={1.5} />,
        title: "No Products Found",
        subtitle:
          "No products match your search criteria. Try adjusting your filters or search terms.",
        buttonText: "Clear Filters",
        buttonAction: onClearFilters,
        showButton: true,
      };
    } else {
      return {
        icon: <Package size={80} color={Colors.primary} strokeWidth={1.5} />,
        title: "No Products Available",
        subtitle:
          "There are no products available at the moment. Please check back later.",
        showButton: false,
      };
    }
  };

  const { icon, title, subtitle, buttonText, buttonAction, showButton } =
    getEmptyStateContent();

  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyContent}>
        <View style={styles.iconContainer}>
          {icon}
          <View style={styles.iconOverlay}>
            <ShoppingBag
              size={60}
              color="#bd643c"
              fill="#bd643c"
              opacity={0.3}
            />
          </View>
        </View>

        <Title style={styles.emptyTitle}>{title}</Title>
        <Title style={styles.emptySubtitle}>{subtitle}</Title>

        <View style={styles.illustrationContainer}>
          {type === "listed" ? (
            <Plus size={40} color={Colors.primary} strokeWidth={1} />
          ) : (
            <Package size={40} color={Colors.primary} strokeWidth={1} />
          )}
        </View>

        {showButton && (
          <TouchableOpacity style={styles.actionButton} onPress={buttonAction}>
            <Title style={styles.actionButtonText}>{buttonText}</Title>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function Products() {
  const { type } = useLocalSearchParams();

  console.log(type);
  const router = useRouter();
  const { filters, setFilters, resetFilters, user } = useZustandStore();
  const {
    selectedCategory,
    minPrice,
    maxPrice,
    rating,
    keyword = [],
  } = filters;

  const [sortCriteria, setSortCriteria] = useState({
    sortBy: "price",
    ascending: true,
  });

  const filter = useMemo(() => {
    console.log("Building filter with keyword:", keyword);

    return {
      keyword: keyword?.join(",") || "",
      categoryName: selectedCategory || "",
      minPrice: minPrice || "",
      maxPrice: maxPrice || "",
      minRating: rating || "",
      sellerProducts: type === "listed",
    };
  }, [selectedCategory, minPrice, maxPrice, rating, type, keyword]);

  const queryClient = useQueryClient();
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", filter, sortCriteria],
    queryFn: () =>
      getfilteredProduct(filter, sortCriteria?.sortBy, sortCriteria?.ascending),
  });

  const removeFilter = (tag) => {
    if (selectedCategory === tag) {
      setFilters({ selectedCategory: "" });
    }

    if (keyword?.includes(tag)) {
      setFilters({ keyword: keyword.filter((k) => k !== tag) });
    }
  };

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      return () => {
        resetFilters();
      };
    }, [])
  );

  const sortByPrice = (type) => {
    if (type === "none") {
      setSortCriteria({});
      return;
    }

    const newSortCriteria = {
      sortBy: type === "lowToHigh" || type === "highToLow" ? "price" : "name",
      ascending: type === "lowToHigh",
    };

    setSortCriteria(newSortCriteria);
  };

  // Check if any filters are active
  const hasFilters =
    selectedCategory || keyword?.length > 0 || minPrice || maxPrice || rating;

  const handleClearFilters = () => {
    resetFilters();
  };

  const handleAddProduct = () => {
    router.push("/(tabs)/plus"); // Adjust path as needed
  };

  return (
    <SafeAreaView style={styles.container}>
      {(selectedCategory || keyword?.length > 0) && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollArea}
        >
          <FilterTags
            tags={[
              ...(selectedCategory ? [selectedCategory] : []),
              ...(keyword || []),
            ]}
            onRemoveFilter={removeFilter}
          />
        </ScrollView>
      )}

      <FilterControls onSortByPrice={sortByPrice} />

      {isLoading ? (
        <FlatList
          data={[1, 2, 3, 4, 6, 8]}
          renderItem={() => <ShimmerProductCard />}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.productGrid}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : products && products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <ProductCard product={item} edit={type ? true : false} />
          )}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.productGrid}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyProductsState
          type={type}
          hasFilters={hasFilters}
          onClearFilters={handleClearFilters}
          onAddProduct={handleAddProduct}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollArea: {
    paddingHorizontal: 10,
    marginTop: 4,
    maxHeight: 60,
  },
  productRow: {
    justifyContent: "space-between",
    marginBottom: 15,
    gap: 10,
  },
  productGrid: {
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 20,
  },
  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  emptyContent: {
    alignItems: "center",
    maxWidth: 300,
  },
  iconContainer: {
    position: "relative",
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconOverlay: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  illustrationContainer: {
    backgroundColor: "#fff",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
