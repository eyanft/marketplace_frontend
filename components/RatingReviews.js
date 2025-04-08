import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from "../config/colors";

const RatingReviews = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const product = typeof params.product === 'string' ? JSON.parse(params.product) : params.product;

  const reviewsData = [
    {
      id: 1,
      name: 'Helene Moore',
      rating: 4,
      date: 'June 5, 2023',
      review: 'The dress is great! Very classy and comfortable. The material feels premium and the fit is perfect. Would definitely recommend!',
      helpful: 10,
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 2,
      name: 'Kate Doe',
      rating: 5,
      date: 'July 10, 2023',
      review: 'Absolutely stunning dress! The color is true to the pictures and the sizing is accurate. I received many compliments when I wore it.',
      helpful: 8,
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      id: 3,
      name: 'Jennifer Smith',
      rating: 3,
      date: 'August 14, 2023',
      review: 'Nice design but the fabric is thinner than I expected. Still a good purchase for the price.',
      helpful: 3,
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
  ];

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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign
          key={i}
          name={i <= rating ? 'star' : 'staro'}
          size={14}
          color={i <= rating ? '#FFD700' : '#666'}
          style={styles.starIcon}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ratings & Reviews</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.productSection}>
          <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productBrand}>{product.brand}</Text>
          </View>
        </View>

        <View style={styles.ratingOverview}>
          <View style={styles.overallRating}>
            <Text style={styles.ratingNumber}>{product.rating.toFixed(1)}</Text>
            <View style={styles.starsRow}>{renderStars(product.rating)}</View>
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

        <View style={styles.divider} />

        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Reviews ({reviewsData.length})</Text>
          
          {reviewsData.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image source={{ uri: review.avatar }} style={styles.reviewAvatar} />
                <View style={styles.reviewerInfo}>
                  <Text style={styles.reviewerName}>{review.name}</Text>
                  <View style={styles.starsRow}>{renderStars(review.rating)}</View>
                </View>
                <Text style={styles.reviewDate}>{review.date}</Text>
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
          ))}
        </View>

        <TouchableOpacity style={styles.writeReviewButton}>
          <Text style={styles.writeReviewText}>WRITE A REVIEW</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  productSection: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productImage: {
    width: 70,
    height: 90,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: '#777',
  },
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
  starsRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  starIcon: {
    marginHorizontal: 2,
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

export default RatingReviews;