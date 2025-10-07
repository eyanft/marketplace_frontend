import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function LocationSelector() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={require('../../../assets/logo/logo1.png')} 
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  image: {
    width: 28,
    height: 28,
    borderRadius: 8,
  },
});
