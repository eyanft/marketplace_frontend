import React, { useState, forwardRef, useEffect } from "react";
import { View, TextInput, Animated, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { Controller } from "react-hook-form";
import Text from "../text/CustomText";

export default function CustomInput({
  name,
  control,
  rules,
  placeholder,
  defaultValue = false,
  style,
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
          <View style={styles.container}>
            <View style={[
              styles.inputContainer,
              error && styles.inputError,
              style
            ]}>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                onBlur={() => handleBlur(value, onBlur)}
                onFocus={handleFocus}
                placeholderTextColor="transparent"
                {...rest}
              />
              {error && (
                <FontAwesome name="xmark" size={20} color="red" />
              )}
            </View>

            <Animated.Text
              style={[
                styles.placeholder,
                isFocused && styles.placeholderFocused,
                { top: placeholderPosition }
              ]}
            >
              {placeholder}
            </Animated.Text>
          </View>

          {error && (
            <Text style={styles.errorText}>{error.message}</Text>
          )}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 6,
    padding: 12,
    paddingHorizontal: 12,
  },
  inputError: {
    borderWidth: 1,
    borderColor: 'red',
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#1f2937',
    marginTop: 8,
  },
  placeholder: {
    position: 'absolute',
    left: 16,
    marginTop: 4,
    fontSize: 20,
    color: '#374151',
  },
  placeholderFocused: {
    fontSize: 14,
    color: '#6b7280',
  },
  errorText: {
    color: '#ef4444',
    marginLeft: 4,
    marginTop: 4,
  },
});
