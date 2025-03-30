import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SizeSelector = ({ sizes, selectedSize, onSelectSize }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Size</Text>
        <TouchableOpacity>
          <Text style={styles.sizeGuide}>Size guide</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sizesGrid}>
        {sizes.map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.selectedSizeButton,
            ]}
            onPress={() => onSelectSize(size)}
          >
            <Text
              style={[
                styles.sizeText,
                selectedSize === size && styles.selectedSizeText,
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  sizeGuide: {
    fontSize: 14,
    color: '#666666',
    textDecorationLine: 'underline',
  },
  sizesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  sizeButton: {
    width: '23%',
    marginHorizontal: '1%',
    aspectRatio: 2,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedSizeButton: {
    borderColor: '#000000',
    backgroundColor: '#000000',
  },
  sizeText: {
    fontSize: 14,
    color: '#000000',
  },
  selectedSizeText: {
    color: '#FFFFFF',
  },
});

export default SizeSelector; 