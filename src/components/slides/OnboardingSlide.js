import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Colors } from '../../../config/colors';

export default function OnboardingSlide({
  title,
  description,
  image,
  width,
  imageHeight,
  contentPadding,
}) {
  const { height: SCREEN_HEIGHT } = useWindowDimensions();
  const isSmallDevice = SCREEN_HEIGHT < 700;

  return (
    <View style={[styles.slide, { width }]}>
      <Text style={[
        styles.title,
        isSmallDevice && styles.titleSmall
      ]}>
        {title}
      </Text>
      <Image
        source={{ uri: image }}
        style={[styles.image, { height: imageHeight }]}
      />
      <Text style={[
        styles.description,
        isSmallDevice && styles.descriptionSmall,
        { paddingHorizontal: contentPadding }
      ]}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: Platform.OS === 'ios' ? 28 : 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  titleSmall: {
    fontSize: Platform.OS === 'ios' ? 24 : 20,
    marginBottom: 30,
  },
  description: {
    fontSize: Platform.OS === 'ios' ? 17 : 16,
    fontWeight: '400',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 24,
  },
  descriptionSmall: {
    fontSize: Platform.OS === 'ios' ? 15 : 14,
    lineHeight: 22,
  },
  image: {
    width: '80%',
    borderRadius: 20,
    resizeMode: 'cover',
    marginBottom: 40,
  },
});