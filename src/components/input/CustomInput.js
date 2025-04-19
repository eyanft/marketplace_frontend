import React, { useState, forwardRef, useEffect } from "react";
import { View, TextInput, Animated } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { Controller } from "react-hook-form";
import Text from "../text/CustomText";

export default function CustomInput({
  name,
  control,
  rules,
  placeholder,
  defaultValue = false,
  ...rest
}) {
  const [isFocused, setIsFocused] = useState(defaultValue ? true : false);
  const [placeholderPosition] = useState(
    new Animated.Value(defaultValue ? 5 : 20)
  );
  const [errorOpacity] = useState(new Animated.Value(0));
  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(placeholderPosition, {
      toValue: 5,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = (value, onBlur) => {
    if (!value) {
      setIsFocused(false);
      Animated.timing(placeholderPosition, {
        toValue: 20,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    onBlur?.();
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <View className="relative">
            <View
              className={`flex-row bg-white items-center rounded-md p-3 px-3 ${
                error ? " border border-red-500" : ""
              }`}
            >
              <TextInput
                className="flex-1 text-lg text-gray-800 mt-2"
                value={value}
                onChangeText={onChange}
                onBlur={() => handleBlur(value, onBlur)}
                onFocus={handleFocus}
                placeholderTextColor="transparent"
                {...rest}
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
            <Text className="text-red-500 ml-1 mt-1">{error.message}</Text>
          )}
        </>
      )}
    />
  );
}
