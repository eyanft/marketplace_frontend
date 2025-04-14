import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import Header from '../components/items/TopReviews';
import ProductHeader from '../components/items/ProductHeader';
import RatingSummary from '../components/items/RatingSummary';
import ReviewsList from '../components/lists/ReviewsList';
import WriteReviewModal from '../components/modals/WriteReviewModal';

const RatingReviews = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const product = typeof params.product === 'string' ? JSON.parse(params.product) : params.product;
  const [showWriteReview, setShowWriteReview] = useState(false);

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

  const handleSubmitReview = (reviewData) => {
    console.log('Submitting review:', reviewData);
    // Ici vous pourriez ajouter le nouvel avis à votre liste d'avis ou l'envoyer à une API
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Ratings & Reviews" 
        onBack={() => router.back()} 
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProductHeader product={product} />
        <RatingSummary product={product} reviewsData={reviewsData} />
        <ReviewsList 
          reviewsData={reviewsData} 
          onWriteReview={() => setShowWriteReview(true)} 
        />
      </ScrollView>

      <WriteReviewModal 
        visible={showWriteReview}
        onClose={() => setShowWriteReview(false)}
        product={product}
        onSubmit={handleSubmitReview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default RatingReviews;