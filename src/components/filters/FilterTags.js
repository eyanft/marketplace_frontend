import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import Badge from "../ui/Badge";

const FilterTags = ({ tags, onRemoveFilter }) => {
  const handleRemoveFilter = (tag) => {
    onRemoveFilter(tag);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      style={styles.scrollView}
    >
      <View style={styles.filterTagsContainer}>
        {tags.map((tag) => (
          <Pressable onPress={() => handleRemoveFilter(tag)}>
            <Badge key={tag.id} style={styles.filterTag}>
              <Text
                style={styles.filterTagText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {tag} X
              </Text>
            </Badge>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: 40,
    paddingVertical: 4,
  },
  scrollContainer: {
    paddingHorizontal: 3,
  },
  filterTagsContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  filterTag: {
    backgroundColor: "black",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 29,
    minWidth: 100,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 1,
  },
  filterTagText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});

export default FilterTags;
