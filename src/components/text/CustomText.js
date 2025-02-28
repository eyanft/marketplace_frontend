import React from "react";
import { Text } from "react-native";

export default function CustomText({ style, children, ...props }) {
  return (
    <Text className={`font-sans  ${style} `} {...props}>
      {children}
    </Text>
  );
}
