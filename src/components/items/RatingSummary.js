import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StarRating from '../items/StarReviews';
import { Colors } from "../../../config/colors";
import PropTypes from 'prop-types';

const RatingSummary = ({ 
  product = { id: '', rating: 0 }, 
  reviewsData = [] 
}) => {
  const summaryData = useMemo(() => {
    const ratingCounts = [0, 0, 0, 0, 0];
    const safeReviewsData = Array.isArray(reviewsData) ? reviewsData : [];
    
    safeReviewsData.forEach(review => {
      const rating = Number(review.rating);
      if (!isNaN(rating) && rating >= 1 && rating <= 5) {
        ratingCounts[5 - Math.floor(rating)]++;
      }
    });
    
    const totalReviews = safeReviewsData.length;
    const ratingPercentages = ratingCounts.map(count => 
      totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0
    );

    let averageRating = Number(product.rating) || 0;
    if (totalReviews > 0) {
      const sum = safeReviewsData.reduce((acc, review) => {
        const rating = Number(review.rating);
        return acc + (isNaN(rating) ? 0 : rating);
      }, 0);
      averageRating = sum / totalReviews;
    }

    return {
      ratingCounts,
      ratingPercentages,
      totalReviews,
      averageRating: parseFloat(averageRating.toFixed(1))
    };
  }, [product, reviewsData]);

  return (
    <View style={styles.ratingOverview}>
      <View style={styles.overallRating}>
        <Text style={styles.ratingNumber}>
          {summaryData.averageRating}
        </Text>
        <StarRating 
          rating={summaryData.averageRating} 
          starSize={24}
        />
        <Text style={styles.reviewCount}>
          {summaryData.totalReviews} {summaryData.totalReviews === 1 ? 'review' : 'reviews'}
        </Text>
      </View>

      <View style={styles.ratingBreakdown}>
        {[5, 4, 3, 2, 1].map((star, index) => (
          <View key={star} style={styles.ratingRow}>
            <Text style={styles.starCount}>{star}</Text>
            <View style={styles.barContainer}>
              <View
                style={[
                  styles.bar,
                  { width: `${summaryData.ratingPercentages[index]}%` }
                ]}
              />
            </View>
            <Text style={styles.ratingRowCount}>{summaryData.ratingCounts[index]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

RatingSummary.propTypes = {
  product: PropTypes.shape({
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
  }).isRequired,
  reviewsData: PropTypes.arrayOf(
    PropTypes.shape({
      rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    })
  )
};

const styles = StyleSheet.create({
  ratingOverview: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  overallRating: {
    alignItems: 'center',
    marginRight: 24,
    width: 100,
  },
  ratingNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.darkText,
  },
  reviewCount: {
    fontSize: 12,
    color: Colors.gray,
    textAlign: 'center',
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
    color: Colors.gray,
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  ratingRowCount: {
    width: 24,
    fontSize: 12,
    textAlign: 'right',
    color: Colors.gray,
  },
});

export default RatingSummary;