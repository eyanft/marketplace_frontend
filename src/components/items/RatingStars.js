import React from 'react';
import { View, Text } from 'react-native';

const RatingStars = ({ rating }) => {
  const filledStars = '★'.repeat(Math.floor(rating));
  const emptyStars = '☆'.repeat(5 - Math.floor(rating));

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontSize: 16, color: '#FFD700' }}>{filledStars + emptyStars}</Text>
      <Text style={{ marginLeft: 6 }}>{rating.toFixed(1)}</Text>
    </View>
  );
};

export default RatingStars;