import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import StarRating from '../items/StarReviews';
import dateFormat from 'dateformat';

const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.warn(`Invalid date string received: ${dateString}`);
        return dateString; 
      }
      return dateFormat(date, 'mm/dd/yyyy');
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString; 
    }
  };

  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerName}>{review.name}</Text>
          <StarRating rating={review.rating} />
        </View>
        <Text style={styles.reviewDate}>{formatDate(review.date)}</Text>
      </View>
      
      <Text style={styles.reviewText}>{review.review}</Text>
      
      <View style={styles.helpfulSection}>
        <Text style={styles.helpfulText}>Was this review helpful?</Text>
        <View style={styles.helpfulButtons}>
          <TouchableOpacity style={styles.helpfulButton}>
            <AntDesign name="like2" size={16} color="#555" />
            <Text style={styles.helpfulButtonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.helpfulButton}>
            <AntDesign name="dislike2" size={16} color="#555" />
            <Text style={styles.helpfulButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#777',
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  helpfulSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helpfulText: {
    fontSize: 12,
    color: '#777',
  },
  helpfulButtons: {
    flexDirection: 'row',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    padding: 4,
  },
  helpfulButtonText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#555',
  },
});

export default ReviewCard;