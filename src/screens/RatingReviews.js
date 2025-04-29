import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Header from '../components/items/TopReviews';
import ProductHeader from '../components/items/ProductHeader';
import RatingSummary from '../components/items/RatingSummary';
import ReviewsList from '../components/lists/ReviewsList';
import WriteReviewModal from '../components/modals/WriteReviewModal';

import { getReviewsByProduct, addReview } from '../services/review/reviewService';
import { Colors } from '../../config/colors';
import { useZustandStore } from '../store/zustand';

const RatingReviews = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const queryClient = useQueryClient();
  const { user } = useZustandStore();

  const product = useMemo(() => {
    try {
      return typeof params.product === 'string'
        ? JSON.parse(params.product)
        : params.product || { id: '', name: 'Unknown Product', rating: 0 };
    } catch (error) {
      console.error("Failed to parse product data:", error);
      return { id: '', name: 'Unknown Product', rating: 0 };
    }
  }, [params.product]);

  const [showWriteReview, setShowWriteReview] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: reviewsData = [],
    error,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ['reviews', product.id],
    queryFn: () => getReviewsByProduct(product.id),
    enabled: !!product.id,
  });

  const mutation = useMutation({
    mutationFn: (reviewData) => addReview(product.id, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', product.id]);
      Alert.alert('Success', 'Your review has been submitted!');
      setShowWriteReview(false);
    },
    onError: (error) => {
      console.error('Error submitting review:', error);
      Alert.alert('Error', error.message || 'Failed to submit review');
    },
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderContent = () => {
    if (isLoading && !refreshing) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading reviews...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {error.message || 'Failed to load reviews'}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={refetch}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isRefetching}
            onRefresh={handleRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
      >
        <ProductHeader product={product} />
        <RatingSummary product={product} reviewsData={reviewsData} />
        <ReviewsList
          reviewsData={reviewsData}
          onWriteReview={() => setShowWriteReview(true)}
          productId={product.id}
          currentUserId={user?.id}
        />
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Ratings & Reviews" onBack={() => router.back()} />

      {renderContent()}

      <WriteReviewModal
        visible={showWriteReview}
        onClose={() => setShowWriteReview(false)}
        product={product}
        onSubmit={(data) => mutation.mutate(data)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.gray,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 2,
  },
  retryButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RatingReviews;
