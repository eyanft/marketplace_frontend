import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Text from '../text/CustomText';

export default function Checkbox({ checked, onChange, label, style, ...props }) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onChange && onChange(!checked)}
      activeOpacity={0.7}
      {...props}
    >
      <View style={[styles.checkbox, checked && styles.checkedBox]} />
      {label ? <Text style={styles.label}>{label}</Text> : null}
    </TouchableOpacity>
  );
}

const CIRCLE_SIZE = 16;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderWidth: 2,
    borderColor: '#ff5c00',
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#fff',
  },
  checkedBox: {
    backgroundColor: '#ff5c00',
    borderColor: '#ff5c00',
  },
  label: {
    marginLeft: 8,
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
});
