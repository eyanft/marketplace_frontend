import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

import Header from '../components/items/TopReviews';
import ProductHeader from '../components/items/ProductHeader';
import RatingSummary from '../components/items/RatingSummary';
import ReviewsList from '../components/lists/ReviewsList';
import WriteReviewModal from '../components/modals/WriteReviewModal';

import { getReviewsByProduct, addReview, updateReview, deleteReview } from '../services/review/reviewService';
import { Colors } from '../../config/colors';
import { useZustandStore } from '../store/zustand';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: Colors.primary,
        borderLeftWidth: 4,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 40,
        elevation: 4,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: Colors.primary,
      }}
      text2Style={{
        fontSize: 14,
        color: '#666',
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: Colors.destructive,
        borderLeftWidth: 4,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 40,
        elevation: 4,
        shadowColor: Colors.destructive,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
        color: Colors.destructive,
      }}
      text2Style={{
        fontSize: 14,
        color: '#666',
      }}
    />
  ),
};

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

  const addMutation = useMutation({
    mutationFn: (reviewData) => addReview(product.id, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', product.id]);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Your review has been submitted!'
      });
      setShowWriteReview(false);
    },
    onError: (error) => {
      console.error('Error submitting review:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Failed to submit review'
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ reviewId, reviewData }) => 
      updateReview(product.id, reviewId, reviewData, user?.firebaseUid),
    onSuccess: (response) => {
      queryClient.setQueryData(['reviews', product.id], (oldData) => {
        return oldData.map(review => 
          review.id === response.data.id ? {
            ...review,
            rating: response.data.rating,
            review: response.data.comment,
            date: response.data.createdAt
          } : review
        );
      });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Review updated successfully!'
      });
    },
    onError: (error) => {
      console.error('Error updating review:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Failed to update review'
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (reviewId) => 
      deleteReview(product.id, reviewId, user?.firebaseUid),
    onSuccess: (_, reviewId) => {
      queryClient.setQueryData(['reviews', product.id], (oldData) => {
        return oldData.filter(review => review.id !== reviewId);
      });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Review deleted successfully!'
      });
    },
    onError: (error) => {
      console.error('Error deleting review:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Failed to delete review'
      });
    },
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleUpdateReview = (reviewId, reviewData) => {
    updateMutation.mutate({ reviewId, reviewData });
  };

  const handleDeleteReview = (reviewId) => {
    deleteMutation.mutate(reviewId);
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
      <View style={styles.contentContainer}>
        <ProductHeader product={product} />
        <RatingSummary product={product} reviewsData={reviewsData} />
        <ReviewsList
          reviewsData={reviewsData}
          onWriteReview={() => setShowWriteReview(true)}
          productId={product.id}
          currentUserId={user?.id}
          onUpdateReview={handleUpdateReview}
          onDeleteReview={handleDeleteReview}
          refreshing={refreshing || isRefetching}
          onRefresh={handleRefresh}
          showWriteReviewButton={!showWriteReview} 
        />
      </View>
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
        onSubmit={(data) => addMutation.mutate(data)}
      />
      <Toast config={toastConfig} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
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