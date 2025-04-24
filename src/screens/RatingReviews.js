import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  ActivityIndicator, 
  Text,
  TouchableOpacity, 
  RefreshControl,
  Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import Header from '../components/items/TopReviews';
import ProductHeader from '../components/items/ProductHeader';
import RatingSummary from '../components/items/RatingSummary';
import ReviewsList from '../components/lists/ReviewsList';
import WriteReviewModal from '../components/modals/WriteReviewModal';
import { getReviewsByProduct, addReview } from '../services/review/reviewService';
import { Colors } from '../../config/colors';

const RatingReviews = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const product = React.useMemo(() => {
    try {
      return typeof params.product === 'string' ? JSON.parse(params.product) : params.product;
    } catch (error) {
      console.error("Failed to parse product data:", error);
      return { id: '', name: 'Unknown Product', rating: 0 };
    }
  }, [params.product]);

  const [showWriteReview, setShowWriteReview] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchReviews = async () => {
    try {
      if (!product?.id) {
        throw new Error("Product ID is missing");
      }
      
      setLoading(true);
      setError(null);
      const data = await getReviewsByProduct(product.id);
      
      if (!Array.isArray(data)) {
        throw new Error("Received invalid reviews data");
      }
      
      setReviewsData(data);
    } catch (err) {
      console.error("Fetch reviews error:", err);
      setError(err.message || "Failed to load reviews");
      setReviewsData([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [product.id]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchReviews();
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      setLoading(true);
      await addReview(product.id, reviewData);
      Alert.alert("Success", "Your review has been submitted!");
      await fetchReviews();
      setShowWriteReview(false);
    } catch (error) {
      console.error('Error submitting review:', error);
      Alert.alert("Error", error.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading && !refreshing) {
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
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchReviews}>
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
            refreshing={refreshing} 
            onRefresh={handleRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
      >
        <ProductHeader product={product} />
        <RatingSummary 
          product={product} 
          reviewsData={reviewsData} 
        />
        <ReviewsList 
          reviewsData={reviewsData} 
          onWriteReview={() => setShowWriteReview(true)} 
        />
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Ratings & Reviews" 
        onBack={() => router.back()} 
      />

      {renderContent()}

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