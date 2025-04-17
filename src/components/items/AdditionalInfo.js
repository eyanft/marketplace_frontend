import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function AdditionalInfo({ onShippingPress, onSupportPress }) {
  return (
    <View style={styles.additionalInfo}>
      <TouchableOpacity style={styles.infoLink} onPress={onShippingPress}>
        <Text style={styles.infoLinkText}>Shipping info</Text>
        <AntDesign name="right" size={14} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoLink} onPress={onSupportPress}>
        <Text style={styles.infoLinkText}>Support</Text>
        <AntDesign name="right" size={14} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  additionalInfo: {
    marginTop: 8,
  },
  infoLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  infoLinkText: {
    fontSize: 14,
  },
});