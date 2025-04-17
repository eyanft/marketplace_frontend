import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../config/colors';

export default function AddToCartButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.addToCartButton} onPress={onPress}>
      <Text style={styles.addToCartText}>ADD TO CART</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addToCartButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    marginVertical: 16,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
