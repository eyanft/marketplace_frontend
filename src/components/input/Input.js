import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = React.forwardRef(({ 
  style,
  placeholderTextColor = '#9CA3AF',
  ...props 
}, ref) => {
  return (
    <TextInput
      ref={ref}
      style={[styles.input, style]}
      placeholderTextColor={placeholderTextColor}
      {...props}
    />
  );
});

Input.displayName = 'Input';

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#000000',
  },
});

export { Input };
