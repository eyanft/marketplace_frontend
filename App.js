// App.js
import "expo-router/entry";
import "./config/global.css";
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
// Note: App.js becomes just an entry point for expo-router
// You don't need to export anything here

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <MyBag />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
