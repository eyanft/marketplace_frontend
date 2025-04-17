import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';

export default function RelatedProductItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.relatedItem} onPress={() => onPress(item)}>
      <Image source={{ uri: item.image }} style={styles.relatedImage} />
      <View style={styles.relatedInfo}>
        <Text style={styles.relatedBrand}>{item.brand}</Text>
        <Text style={styles.relatedName}>{item.name}</Text>
        <Text style={styles.relatedPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  relatedItem: {
    width: 150,
    marginLeft: 12,
  },
  relatedImage: {
    width: '100%',
    height: 200,
    borderRadius: 4,
    marginBottom: 8,
  },
  relatedInfo: {
    paddingHorizontal: 4,
  },
  relatedBrand: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  relatedName: {
    fontSize: 14,
    marginBottom: 4,
  },
  relatedPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
