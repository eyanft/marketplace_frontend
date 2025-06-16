import React from "react";
import { Text, StyleSheet } from "react-native";

const CustomText = ({ style, children, ...props }) => {
  // Ensure style is always an array or object
  const textStyle = Array.isArray(style) ? style : style || {};
  
  return (
    <Text style={[styles.text, textStyle]} {...props}>
      {children}
    </Text>
  );
};

CustomText.displayName = 'CustomText';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'System',
    color: '#000000', // Add default color
  },
});

export default CustomText;
