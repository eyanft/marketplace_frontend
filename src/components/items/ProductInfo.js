import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Reviews from '../items/Reviews';

export default function ProductInfo({ product, onRatingPress }) {
  return (
    <View style={styles.productInfo}>
      <Text style={styles.brand}>{product.brand}</Text>
      <Text style={styles.name}>{product.name}</Text>
      <Reviews
        rating={product.rating} 
        reviewCount={product.reviewCount || product.reviews} 
        onPress={onRatingPress} 
      />
      <Text style={styles.description}>
        Short dress in soft cotton jersey with decorative buttons down the front and a wide, frill-trimmed square neckline with
        concealed elastication. Elasticated seam under the bust and short puff sleeves with a small frill trim.
      </Text>
      <Text style={styles.price}>${product.salePrice || product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  productInfo: {
    marginBottom: 16,
  },
  brand: {
    fontSize: 20,
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});