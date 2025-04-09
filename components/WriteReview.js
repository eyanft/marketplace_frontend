import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from "../config/colors";

const { height } = Dimensions.get('window');

const WriteReview = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Safely parse the product parameter
  let product = null;
  try {
    if (params.product) {
      product = JSON.parse(decodeURIComponent(params.product));
    }
  } catch (error) {
    console.error('Error parsing product:', error);
  }

  if (!product || typeof product !== 'object') {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Invalid product data!</Text>
      </View>
    );
  }

  // Default fallbacks for missing properties
  const productName = product?.name || 'Unknown Product';
  const productBrand = product?.brand || 'Unknown Brand';
  const productImageUrl = product?.imageUrl || 'https://via.placeholder.com/150';

  // State for review details
  const [rating, setRating] = useState(0); 
  const [reviewText, setReviewText] = useState(''); 
  const [photos, setPhotos] = useState([]); 

  // Handle star rating selection
  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  // Handle review text change
  const handleReviewTextChange = (text) => {
    setReviewText(text);
  };

  // Handle photo upload (placeholder implementation)
  const handleAddPhoto = () => {
    // Simulate adding a photo (replace with actual photo picker logic)
    setPhotos([...photos, 'https://via.placeholder.com/150']);
  };

  // Handle submit review (placeholder implementation)
  const handleSubmitReview = () => {
    // Replace with actual API call or storage logic
    console.log('Submitting review:', {
      product: productName,
      rating,
      reviewText,
      photos,
    });
    router.back(); 
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rating and reviews</Text>
        <View style={styles.placeholder} />
      </View>
      
      <View style={styles.reviewsHeader}>
        <Text style={styles.reviewsCount}>8 reviews</Text>
        <View style={styles.photoFilterContainer}>
          <View style={styles.checkbox} />
          <Text style={styles.photoFilterText}>With photo</Text>
        </View>
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHandle} />
          
          <ScrollView contentContainerStyle={styles.modalContent}>
            {/* Rating Section */}
            <View style={styles.ratingSection}>
              <Text style={styles.ratingLabel}>What is you rate?</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    style={styles.starIconContainer}
                    onPress={() => handleRating(star)}
                  >
                    <AntDesign
                      name={star <= rating ? 'star' : 'staro'}
                      size={30}
                      color={star <= rating ? '#FFD700' : '#ccc'}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Review Text Section */}
            <View style={styles.reviewTextSection}>
              <Text style={styles.reviewTextLabel}>Please share your opinion about the product</Text>
              <TextInput
                multiline
                placeholder="Your review"
                value={reviewText}
                onChangeText={handleReviewTextChange}
                style={styles.reviewTextInput}
              />
            </View>

            {/* Photo Upload Section */}
            <View style={styles.photoUploadSection}>
              <TouchableOpacity onPress={handleAddPhoto} style={styles.addPhotoButton}>
                <View style={styles.cameraIconContainer}>
                  <AntDesign name="camerao" size={24} color="#fff" />
                </View>
                <Text style={styles.addPhotoText}>Add your photos</Text>
              </TouchableOpacity>
            </View>

            {/* Photos Preview */}
            <View style={styles.photosPreview}>
              {photos.map((photo, index) => (
                <Image key={index} source={{ uri: photo }} style={styles.photoPreview} />
              ))}
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
              <Text style={styles.submitButtonText}>SEND REVIEW</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
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
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reviewsCount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  photoFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
  },
  photoFilterText: {
    fontSize: 16,
    color: '#333',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.75,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
  },
  modalContent: {
    padding: 20,
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  ratingLabel: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  starIconContainer: {
    marginHorizontal: 10,
  },
  reviewTextSection: {
    marginBottom: 30,
  },
  reviewTextLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  reviewTextInput: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 15,
    minHeight: 150,
    fontSize: 16,
  },
  photoUploadSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  addPhotoButton: {
    alignItems: 'center',
  },
  cameraIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  photosPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  photoPreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 8,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default WriteReview;
