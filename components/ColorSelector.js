import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ColorSelector = ({ colors, selectedColor, onSelectColor }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Color: {selectedColor || 'Select a color'}</Text>
      <View style={styles.colorsContainer}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[styles.colorButton, { backgroundColor: color }]}
            onPress={() => onSelectColor(color)}
          >
            {selectedColor === color && (
              <Ionicons
                name="checkmark"
                size={20}
                color={isLightColor(color) ? 'black' : 'white'}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// Helper function to determine if a color is light or dark
const isLightColor = (color) => {
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
});

export default ColorSelector; 