import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ReviewCard from '../cards/ReviewCard';
import { Colors } from "../../../config/colors";

const ReviewsList = ({ reviewsData, onWriteReview }) => {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />

      <View style={styles.reviewsSection}>
        <Text style={styles.sectionTitle}>Reviews ({reviewsData.length})</Text>
        
        {reviewsData.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </View>

      <TouchableOpacity
        style={styles.writeReviewButton}
        onPress={onWriteReview}
      >
        <Text style={styles.writeReviewText}>WRITE A REVIEW</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divider: {
    height: 8,
    backgroundColor: '#f5f5f5',
  },
  reviewsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  writeReviewButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    margin: 16,
    marginTop: 8,
  },
  writeReviewText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ReviewsList;