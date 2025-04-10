import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../config/colors'; 

const Button = ({ children, variant = 'default', size = 'default', style, onPress }) => {
  const buttonStyle = [
    styles.button,
    variant === 'default' && styles.buttonDefault,
    variant === 'ghost' && styles.buttonGhost,
    variant === 'destructive' && styles.buttonDestructive,
    size === 'icon' && styles.buttonIcon,
    style,
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

Button.displayName = 'Button';

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDefault: {
    backgroundColor: 'black',
  },
  buttonGhost: {
    backgroundColor: 'transparent',
  },
  buttonDestructive: {
    backgroundColor: Colors.primary,
  },
  buttonIcon: {
    width: 36,
    height: 36,
  },
});

export default Button;