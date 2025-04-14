import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../config/colors'; 

const Button = ({ children, variant = 'default', size = 'default', style, onPress }) => {
  const buttonStyle = [
    styles.button,
    variant === 'default' && styles.buttonDefault,
    variant === 'ghost' && styles.buttonGhost,
    variant === 'destructive' && styles.buttonDestructive,
    size === 'icon' && styles.buttonIcon,
    style,
  ];

  const renderChildren = () => {
    if (typeof children === 'string') {
      return <Text style={styles.buttonText}>{children}</Text>;
    }
    return children;
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {renderChildren()}
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
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default Button;