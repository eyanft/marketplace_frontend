import React from "react";
import { TouchableOpacity } from "react-native";
import Text from "../text/CustomText";
export default function FilledButton({ children, style, ...props }) {
  return (
    <TouchableOpacity
      className={`text-white bg-orange-600 p-4 rounded-full ${style}`}
      disabled={true}
      {...props}
    >
      <Text style={"text-white text-center font-bold text-lg"}>{children}</Text>
    </TouchableOpacity>
  );
}
