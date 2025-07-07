import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function ProductSelectors({ productName, onFavoritePress }) {
  return (
    <View style={styles.selectionRow}>
      <Text style={styles.productName}>{productName}</Text>
      <TouchableOpacity style={styles.favoriteButton} onPress={onFavoritePress}>
        <AntDesign name="hearto" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  selectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
    marginRight: 16,
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
