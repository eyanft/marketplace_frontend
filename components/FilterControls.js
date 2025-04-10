import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Filter, ArrowUpDown, List } from 'lucide-react-native';

const FilterControls = () => {
  return (
    <View style={styles.filterControls}>
      <TouchableOpacity style={styles.filterControl}>
        <Filter size={16} color="black" />
        <Text style={styles.filterControlText}>Filters</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.filterControl}>
        <ArrowUpDown size={17} color="black" />
        <Text style={styles.filterControlText}>Price: lowest to high</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <List size={18} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    height: 24,
  },
  filterControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterControlText: {
    fontSize: 11,
    marginLeft: 8,
  },
});

export default FilterControls;