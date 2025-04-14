import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const ProductHeader = ({ product }) => {
  return (
    <View style={styles.productSection}>
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productBrand}>{product.brand}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productSection: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 70,
    height: 90,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: '#777',
  },
});

export default ProductHeader;