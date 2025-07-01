import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { X } from "lucide-react-native";
import { Colors } from "../../../config/colors";

const FilterTags = ({ tags, onRemoveFilter }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      style={styles.scrollView}
    >
      <View style={styles.filterTagsContainer}>
        {tags.map((tag, idx) => (
          <View key={idx} style={styles.filterTag}>
            <Text style={styles.filterTagText} numberOfLines={1} ellipsizeMode="tail">
              {tag}
            </Text>
            <Pressable
              style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
              onPress={() => onRemoveFilter(tag)}
              hitSlop={10}
            >
              <X size={16} color={Colors.primary} />
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    minHeight: 48,
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
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    minWidth: 48,
    height: 32,
    marginRight: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  filterTagText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "500",
    marginRight: 4,
  },
  closeBtn: {
    padding: 2,
    borderRadius: 10,
  },
  closeBtnPressed: {
    backgroundColor: Colors.primary + '11',
  },
});

export default FilterTags;
