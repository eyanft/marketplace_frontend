import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TabLayout from '../components/TabLayout';  

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue dans l'application !</Text>
      <TabLayout />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
