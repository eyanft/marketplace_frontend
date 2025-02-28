import React, { useState } from "react";
import { View, TextInput, Animated } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import Text from "../text/CustomText";
export default function CustomInput({
  placeholder,
  className,
  error,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [placeholderPosition] = useState(new Animated.Value(20));
  const [errorOpacity] = useState(new Animated.Value(0));
  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(placeholderPosition, {
      toValue: 5,
      duration: 200,
      useNativeDriver: false,
    }).start();
    // Animated.timing(errorOpacity, {
    //   toValue: 1,
    //   duration: 500,
    //   useNativeDriver: false,
    // }).start();
  };

  const handleBlur = (event) => {
    if (!props.value) {
      setIsFocused(false);
      Animated.timing(placeholderPosition, {
        toValue: 20,
        duration: 200,
        useNativeDriver: false,
      }).start();
      // Animated.timing(errorOpacity, {
      //   toValue: 0,
      //   duration: 500,
      //   useNativeDriver: false,
      // }).start();
    }

    props.onBlur?.(event);
  };

  return (
    <>
      <View className="relative">
        <View
          className={`flex-row bg-white items-center rounded-md p-3 px-3 ${
            error ? " border border-red-500" : ""
          }`}
        >
          <TextInput
            className="flex-1 text-lg text-gray-800 mt-2   "
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor="transparent"
            {...props}
          />
          {error ? (
            <FontAwesome name="xmark" size={20} color="red" />
          ) : (
            <FontAwesome name="check" size={20} color="green" />
          )}
        </View>

        <Animated.Text
          className={`absolute left-4 mt-1 text-gray-700 ${
            isFocused ? " text-gray-500" : "text-xl"
          }`}
          style={{ top: placeholderPosition }}
        >
          {placeholder}
        </Animated.Text>
      </View>

      {error && (
        <Animated.Text
          className=" text-red-500 ml-1"
          style={{ opacity: errorOpacity }}
        >
          {error}
        </Animated.Text>
      )}
    </>
  );
}
