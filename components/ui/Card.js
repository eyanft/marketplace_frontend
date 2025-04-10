import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

const CardContent = ({ children }) => (
  <View style={styles.cardContent}>{children}</View>
);

Card.displayName = 'Card';
CardContent.displayName = 'CardContent';

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: 'white',
    width: '48%',
  },
  cardContent: {
    padding: 0,
  },
});

export { Card, CardContent };