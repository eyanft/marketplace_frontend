import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Text from "../text/CustomText";

export default function FilledButton({ children, style, className = "", ...props }) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      className={`bg-orange-600 rounded-full ${className}`}
      {...props}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
