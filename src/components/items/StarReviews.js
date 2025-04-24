import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const StarReviews = ({ 
  rating = 0, 
  size = 14, 
  activeColor = '#FFD700', 
  inactiveColor = '#666', 
  editable = false, 
  onRatingChange = () => {} 
}) => {
  const normalizedRating = Math.min(5, Math.max(0, Number(rating) || 0));

  const handlePress = (selectedRating) => {
    if (editable) {
      onRatingChange(selectedRating);
    }
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          disabled={!editable}
          onPress={() => handlePress(star)}
          activeOpacity={0.6}
        >
          <AntDesign
            name={star <= normalizedRating ? 'star' : 'staro'}
            size={size}
            color={star <= normalizedRating ? activeColor : inactiveColor}
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 2,
  },
});

StarReviews.propTypes = {
  rating: PropTypes.number,
  size: PropTypes.number,
  activeColor: PropTypes.string,
  inactiveColor: PropTypes.string,
  editable: PropTypes.bool,
  onRatingChange: PropTypes.func,
};

export default StarReviews;