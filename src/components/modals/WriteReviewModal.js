import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import StarRating from '../items/StarReviews';
import { Colors } from "../../../config/colors";

const { height } = Dimensions.get('window');

const WriteReviewModal = ({ visible, onClose, product, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleReviewTextChange = (text) => {
    setReviewText(text);
  };

  const handleAddPhoto = () => {
    setPhotos([...photos, 'https://via.placeholder.com/150']);
  };

  const handleSubmitReview = () => {
    onSubmit({
      product: product.name,
      rating,
      reviewText,
      photos,
    });
    
    // Reset form
    setRating(0);
    setReviewText('');
    setPhotos([]);
    onClose();
  };

  if (!visible) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHandle} />
        
        <ScrollView contentContainerStyle={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
          >
            <AntDesign name="close" size={24} color="#666" />
          </TouchableOpacity>

          {/* Rating Section */}
          <View style={styles.ratingSection}>
            <Text style={styles.ratingLabel}>What is your rate?</Text>
            <StarRating 
              rating={rating} 
              size={30}
              activeColor="#FFD700"
              inactiveColor="#ccc"
              editable={true}
              onRatingChange={handleRating}
            />
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
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.85,
    paddingTop: 20,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalContent: {
    padding: 20,
    paddingTop: 0,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  ratingLabel: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
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
});

export default WriteReviewModal;