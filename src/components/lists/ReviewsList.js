import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import ReviewCard from '../cards/ReviewCard';
import { Colors } from "../../../config/colors";
import { AntDesign } from '@expo/vector-icons';

const ReviewsList = ({ reviewsData, onWriteReview, productId, currentUserId }) => {
  const renderEmptyState = () => {
    return (
      <View style={styles.emptyState}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1533/1533913.png' }}
          style={styles.emptyImage}
          defaultSource={{ uri: 'https://via.placeholder.com/120' }}
        />
        <Text style={styles.emptyTitle}>No Reviews Yet</Text>
        <Text style={styles.emptyText}>
          Be the first to review this product and help others with your feedback!
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.divider} />

      <View style={styles.reviewsSection}>
        <Text style={styles.sectionTitle}>
          Reviews ({reviewsData ? reviewsData.length : 0})
        </Text>
        
        {reviewsData && reviewsData.length > 0 ? (
          reviewsData.map((review) => (
            <ReviewCard 
              key={review.id} 
              review={review} 
              productId={productId}
              currentUserId={currentUserId}
            />
          ))
        ) : (
          renderEmptyState()
        )}
      </View>

      <TouchableOpacity
        style={styles.writeReviewButton}
        onPress={onWriteReview}
      >
        <AntDesign name="edit" size={18} color="#fff" style={styles.buttonIcon} />
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  writeReviewText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
    backgroundColor: '#f9f9f9', // Light background while loading
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ReviewsList;
