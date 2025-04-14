import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StarRating from '../items/StarReviews';
import { Colors } from "../../../config/colors";

const RatingSummary = ({ product, reviewsData }) => {
  // Calculate percentages for star ratings
  const ratingCounts = [0, 0, 0, 0, 0];
  reviewsData.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[5 - review.rating]++;
    }
  });
  
  const totalReviews = reviewsData.length;
  const ratingPercentages = ratingCounts.map(count => 
    totalReviews > 0 ? (count / totalReviews) * 100 : 0
  );

  return (
    <View style={styles.ratingOverview}>
      <View style={styles.overallRating}>
        <Text style={styles.ratingNumber}>{product.rating.toFixed(1)}</Text>
        <StarRating rating={product.rating} />
        <Text style={styles.reviewCount}>{product.reviewCount} reviews</Text>
      </View>

      <View style={styles.ratingBreakdown}>
        {[5, 4, 3, 2, 1].map((star, index) => (
          <View key={star} style={styles.ratingRow}>
            <Text style={styles.starCount}>{star}</Text>
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  { width: `${ratingPercentages[index]}%` }
                ]}
              />
            </View>
            <Text style={styles.ratingRowCount}>{ratingCounts[index]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingOverview: {
    padding: 16,
    flexDirection: 'row',
  },
  overallRating: {
    alignItems: 'center',
    marginRight: 24,
  },
  ratingNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#777',
  },
  ratingBreakdown: {
    flex: 1,
    justifyContent: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  starCount: {
    width: 20,
    fontSize: 12,
    color: '#777',
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  bar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  ratingRowCount: {
    width: 20,
    fontSize: 12,
    textAlign: 'right',
    color: '#777',
  },
});

export default RatingSummary;