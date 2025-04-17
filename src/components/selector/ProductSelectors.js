import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function ProductSelectors({ onSizePress, onColorPress, onFavoritePress }) {
  return (
    <View style={styles.selectionRow}>
      <TouchableOpacity style={styles.dropdown} onPress={onSizePress}>
        <Text style={styles.dropdownText}>Size</Text>
        <AntDesign name="down" size={14} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.dropdown} onPress={onColorPress}>
        <Text style={styles.dropdownText}>Black</Text>
        <AntDesign name="down" size={14} color="black" />
      </TouchableOpacity>
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
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '38%',
  },
  dropdownText: {
    fontSize: 14,
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
