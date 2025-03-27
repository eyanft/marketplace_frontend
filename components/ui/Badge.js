import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ children, variant = 'default', style }) => {
  const badgeStyle = [
    styles.badge,
    variant === 'default' && styles.badgeDefault,
    variant === 'destructive' && styles.badgeDestructive,
    style,
  ];

  return <View style={badgeStyle}>{children}</View>;
};

Badge.displayName = 'Badge';

const styles = StyleSheet.create({
  badge: {
    borderRadius: 29,
    paddingHorizontal: 6,
    paddingVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  badgeDefault: {
    backgroundColor: 'black',
  },
  badgeDestructive: {
    backgroundColor: '#ff5b00',
  },
});

export default Badge;