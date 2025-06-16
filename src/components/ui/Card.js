import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

const Card = ({ children, style, ...props }) => (
  <View 
    style={[
      styles.card,
      Platform.OS === 'ios' ? styles.cardShadowIOS : styles.cardShadowAndroid,
      style
    ]} 
    {...props}
  >
    {children}
  </View>
);

const CardContent = ({ children, style, ...props }) => (
  <View style={[styles.cardContent, style]} {...props}>
    {children}
  </View>
);

Card.displayName = 'Card';
CardContent.displayName = 'CardContent';

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    width: '100%',
  },
  cardShadowIOS: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  cardShadowAndroid: {
    elevation: 3,
  },
  cardContent: {
    padding: 16,
  },
});

export { Card, CardContent };