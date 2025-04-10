import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { Colors } from '../config/colors'; 

export default function LocationSelector() {
  return (
    <View style={styles.container}>
      <MapPin size={20} color={Colors.primary} />
      <TouchableOpacity>
        <Text style={styles.locationText}>Manouba, TUN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
});
