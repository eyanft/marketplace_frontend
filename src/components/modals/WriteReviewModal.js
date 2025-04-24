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
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import StarRating from '../items/StarReviews';
import { Colors } from "../../../config/colors";
import * as ImagePicker from 'expo-image-picker';

const { height } = Dimensions.get('window');

const WriteReviewModal = ({ visible, onClose, product, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [photos, setPhotos] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
    setErrorMessage('');
  };

  const handleReviewTextChange = (text) => {
    setReviewText(text);
    setErrorMessage('');
  };

  const handleAddPhoto = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPhotos([...photos, result.assets[0].uri]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Failed to select image. Please try again.');
    }
  };

  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };

  const handleSubmitReview = async () => {
    if (rating === 0) {
      setErrorMessage("Please select a rating before submitting");
      return;
    }
    
    if (reviewText.trim() === '') {
      setErrorMessage("Please write your review before submitting");
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const reviewData = {
        productId: product.id,
        rating,
        text: reviewText,
        photos: photos,
        date: new Date().toISOString()
      };
      
      await onSubmit(reviewData);
      
      setRating(0);
      setReviewText('');
      setPhotos([]);
      onClose();
    } catch (error) {
      setErrorMessage(error.message || 'Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!visible) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      />
      <View style={styles.modalContainer}>
        <View style={styles.modalHandle} />

        <ScrollView contentContainerStyle={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={24} color="#666" />
          </TouchableOpacity>

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

          <View style={styles.photosPreview}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <Image source={{ uri: photo }} style={styles.photoPreview} />
                <TouchableOpacity 
                  style={styles.removePhotoButton}
                  onPress={() => handleRemovePhoto(index)}
                >
                  <AntDesign name="closecircle" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}

          <TouchableOpacity 
            style={[styles.submitButton, submitting ? styles.submitButtonDisabled : null]} 
            onPress={handleSubmitReview}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.submitButtonText}>SEND REVIEW</Text>
            )}
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
    justifyContent: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  photoContainer: {
    position: 'relative',
    margin: 8,
  },
  photoPreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
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
  submitButtonDisabled: {
    backgroundColor: Colors.primary + '80', 
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WriteReviewModal;