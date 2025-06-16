import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../config/colors';

const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  style, 
  onPress,
  disabled,
  ...props 
}) => {
  const buttonStyle = [
    styles.button,
    variant === 'default' && styles.buttonDefault,
    variant === 'ghost' && styles.buttonGhost,
    variant === 'destructive' && styles.buttonDestructive,
    variant === 'outline' && styles.buttonOutline,
    variant === 'secondary' && styles.buttonSecondary,
    variant === 'link' && styles.buttonLink,
    size === 'sm' && styles.buttonSm,
    size === 'lg' && styles.buttonLg,
    size === 'icon' && styles.buttonIcon,
    disabled && styles.buttonDisabled,
    style,
  ];

  const textStyle = [
    styles.buttonText,
    variant === 'default' && styles.textDefault,
    variant === 'ghost' && styles.textGhost,
    variant === 'destructive' && styles.textDestructive,
    variant === 'outline' && styles.textOutline,
    variant === 'secondary' && styles.textSecondary,
    variant === 'link' && styles.textLink,
    disabled && styles.textDisabled,
  ];

  const renderChildren = () => {
    if (typeof children === 'string') {
      return <Text style={textStyle}>{children}</Text>;
    }
    return children;
  };

  return (
    <TouchableOpacity 
      style={buttonStyle} 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      {renderChildren()}
    </TouchableOpacity>
  );
};

Button.displayName = 'Button';

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonDefault: {
    backgroundColor: '#ff5c00',
  },
  buttonGhost: {
    backgroundColor: 'transparent',
  },
  buttonDestructive: {
    backgroundColor: '#ef4444',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  buttonSecondary: {
    backgroundColor: '#FFFAF8',
  },
  buttonLink: {
    backgroundColor: 'transparent',
    padding: 0,
  },
  buttonSm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonLg: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonIcon: {
    width: 40,
    height: 40,
    padding: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  textDefault: {
    color: '#FFFFFF',
  },
  textGhost: {
    color: '#000000',
  },
  textDestructive: {
    color: '#FFFFFF',
  },
  textOutline: {
    color: '#000000',
  },
  textSecondary: {
    color: '#FFFFFF',
  },
  textLink: {
    color: '#ff5c00',
    textDecorationLine: 'underline',
  },
  textDisabled: {
    opacity: 0.5,
  },
});

export default Button;