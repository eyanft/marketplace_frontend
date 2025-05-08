import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Filter, ArrowUpDown, List } from "lucide-react-native";
import FilterModal from "./FilterModal";

const FilterControls = ({ onSortByPrice }) => {
  const priceFilterStates = ["none", "lowToHigh", "highToLow"];
  const [filterPrice, setFilterPrice] = useState("none");
  const [filterVisible, setFilterVisible] = useState(false);

  const handleSortByPrice = () => {
    const nextStateIndex =
      (priceFilterStates.indexOf(filterPrice) + 1) % priceFilterStates.length;
    const nextState = priceFilterStates[nextStateIndex];

    setFilterPrice(nextState);
    onSortByPrice(nextState);
  };
  return (
    <View style={styles.filterControls}>
      <TouchableOpacity
        onPress={() => setFilterVisible(true)}
        style={styles.filterControl}
      >
        <Filter size={16} color="black" />
        <Text style={styles.filterControlText}>Filters</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.filterControl}
        onPress={handleSortByPrice}
      >
        <ArrowUpDown
          size={17}
          color={filterPrice === "none" ? "black" : "orange"}
        />
        <Text
          style={[
            styles.filterControlText,
            { color: filterPrice === "none" ? "black" : "orange" },
          ]}
        >
          Price:
          {filterPrice === "lowToHigh" ? "lowest to high" : "high to lowest"}
        </Text>
      </TouchableOpacity>
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
    height: 24,
  },
  filterControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterControlText: {
    fontSize: 11,
    marginLeft: 8,
  },
});

export default FilterControls;
