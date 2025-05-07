import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Platform, 
  ScrollView,
  KeyboardAvoidingView,
  RefreshControl
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ReviewCard from '../cards/ReviewCard';
import { Colors } from "../../../config/colors";
import { AntDesign } from '@expo/vector-icons';

const ReviewsList = ({ 
  reviewsData, 
  onWriteReview, 
  productId, 
  currentUserId,
  onUpdateReview,
  onDeleteReview,
  refreshing,
  onRefresh,
  showWriteReviewButton = true // Add this prop with default value of true
}) => {
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
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.reviewsContainer}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.primary]}
              tintColor={Colors.primary}
            />
          }
        >
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
                  onReviewUpdated={onUpdateReview}
                  onReviewDeleted={onDeleteReview}
                />
              ))
            ) : (
              renderEmptyState()
            )}
          </View>
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
      
      {/* Only render the button overlay container when showWriteReviewButton is true */}
      {showWriteReviewButton && (
        <View style={styles.buttonOverlayContainer}>
          <View style={styles.overlayGradient} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.writeReviewButton}
              onPress={onWriteReview}
              activeOpacity={0.8}
            >
              <AntDesign name="edit" size={18} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.writeReviewText}>WRITE A REVIEW</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  reviewsContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
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
  buttonOverlayContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  overlayGradient: {
    height: 80,
    backgroundColor: 'white',
    opacity: 0.9,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: 'transparent',
  },
  writeReviewButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  buttonIcon: {
    marginRight: 8,
  },
  writeReviewText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
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
    backgroundColor: '#f9f9f9',
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
  bottomSpacer: {
    height: Platform.select({
      ios: 80,
      android: 100,
    }),
  },
});

export default ReviewsList;