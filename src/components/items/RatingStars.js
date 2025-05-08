import React from 'react';
import { View, Text } from 'react-native';

const RatingStars = ({ rating = 0 }) => {
  const normalizedRating = Math.min(5, Math.max(0, Number(rating) || 0));
  const filledStars = '★'.repeat(Math.floor(normalizedRating));
  const emptyStars = '☆'.repeat(5 - Math.floor(normalizedRating));

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontSize: 16, color: '#FFD700' }}>
        {filledStars}
        {emptyStars}
      </Text>
      <Text style={{ marginLeft: 6, fontSize: 14, color: '#666' }}>
        {normalizedRating.toFixed(1)}
      </Text>
    </View>
  );
};

export default RatingStars;