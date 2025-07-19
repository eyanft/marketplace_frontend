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
  console.log("test", keyword);
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: "price",
    ascending: true,
  });

  const filter = useMemo(() => {
    return {
      keyword: keyword?.join(",") || "",
      categoryName: selectedCategory || "",
      minPrice: minPrice || "",
      maxPrice: maxPrice || "",
      minRating: rating || "",
      sellerFUID: type === "listed" ? user?.firebaseID : "",
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

      <FlatList
        data={isLoading ? [1, 2, 3, 4, 6, 8] : products}
        renderItem={({ item }) =>
          isLoading ? (
            <ShimmerProductCard />
          ) : (
            <ProductCard product={item} edit={type ? true : false} />
          )
        }
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productGrid}
        keyExtractor={(item, index) =>
          isLoading ? index.toString() : index.toString()
        }
        showsVerticalScrollIndicator={false}
      />
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
});
