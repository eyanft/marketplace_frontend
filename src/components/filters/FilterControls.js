import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Filter, ArrowUp, ArrowDown } from "lucide-react-native";
import FilterModal from "./FilterModal";
import { Colors } from "../../../config/colors";

const sortOptions = [
  { key: "none", label: "All" },
  { key: "lowToHigh", label: "Price " },
  { key: "highToLow", label: "Price " },
];

const FilterControls = ({ onSortByPrice }) => {
  const [filterPrice, setFilterPrice] = useState("none");
  const [filterVisible, setFilterVisible] = useState(false);

  const handleSort = (key) => {
    setFilterPrice(key);
    onSortByPrice(key);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.segmentedControl}>
        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.segment,
              filterPrice === option.key && styles.segmentActive,
            ]}
            onPress={() => handleSort(option.key)}
            activeOpacity={0.8}
          >
            {option.key === "lowToHigh" && (
              <ArrowUp
                size={16}
                color={filterPrice === option.key ? "#fff" : Colors.primary}
              />
            )}
            {option.key === "highToLow" && (
              <ArrowDown
                size={16}
                color={filterPrice === option.key ? "#fff" : Colors.primary}
              />
            )}
            <Text
              style={[
                styles.segmentText,
                filterPrice === option.key && styles.segmentTextActive,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setFilterVisible(true)}
        activeOpacity={0.8}
      >
        <Filter size={22} color="#fff" />
      </TouchableOpacity>
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: Colors.secondary,
    borderRadius: 24,
    padding: 4,
    gap: 6,
    flex: 1,
    maxWidth: 320,
  },
  segment: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primary,
    marginRight: 2,
  },
  segmentActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  segmentText: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 6,
  },
  segmentTextActive: {
    color: "#fff",
  },
  fab: {
    marginLeft: 12,
    backgroundColor: Colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default FilterControls;
