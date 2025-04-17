import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const StarReviews = ({ 
  rating, 
  size = 14, 
  activeColor = '#FFD700', 
  inactiveColor = '#666', 
  editable = false, 
  onRatingChange 
}) => {
  
  const handlePress = (selectedRating) => {
    if (editable && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          disabled={!editable}
          style={styles.starIconContainer}
          onPress={() => handlePress(i)}
        >
          <AntDesign
            name={i <= rating ? 'star' : 'staro'}
            size={size}
            color={i <= rating ? activeColor : inactiveColor}
            style={styles.starIcon}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <View style={styles.starsRow}>
      {renderStars()}
    </View>
  );
};

const styles = StyleSheet.create({
  starsRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  starIconContainer: {
    paddingHorizontal: 2,
  },
  starIcon: {
    marginHorizontal: 2,
  },
});

export default StarReviews;