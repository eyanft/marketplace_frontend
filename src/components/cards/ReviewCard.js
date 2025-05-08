import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import StarRating from '../items/StarReviews';
import dateFormat from 'dateformat';
import { Colors } from "../../../config/colors";
import EditReviewModal from '../modals/EditReviewModal';
import DeleteReviewModal from '../modals/DeleteReviewModal';
import ReportReviewModal from '../modals/ReportReviewModal';
import api from '../../services/api/axios';

const ReviewCard = ({ review, onReviewUpdated, onReviewDeleted, currentUserId, productId }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  console.log('ReviewCard received review:', review);
  console.log('ReviewCard received currentUserId:', currentUserId);
  
  const isOwner = review.reviewer?.id === currentUserId;
  console.log('Is owner check result:', isOwner, 'reviewer.id:', review.reviewer?.id, 'currentUserId:', currentUserId);

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

  const handleEdit = () => {
    setShowMenu(false);
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowMenu(false);
    setShowDeleteModal(true);
  };

  const handleReport = () => {
    setShowMenu(false);
    setShowReportModal(true);
  };

  const handleUpdateReview = async (updatedReview) => {
    try {
      onReviewUpdated(review.id, updatedReview);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating review:", error);
      Alert.alert('Error', error.message || 'Failed to update review');
    }
  };

  const handleDeleteReview = async () => {
    try {
      onReviewDeleted(review.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting review:", error);
      Alert.alert('Error', error.message || 'Failed to delete review');
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
        <TouchableOpacity onPress={() => setShowMenu(true)} style={styles.menuButton}>
          <MaterialIcons name="more-vert" size={24} color="#555" />
        </TouchableOpacity>
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

      <Modal
        visible={showMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1} 
          onPress={() => setShowMenu(false)}
        >
          <View style={styles.menuContainer}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Review Options</Text>
              <TouchableOpacity onPress={() => setShowMenu(false)}>
                <MaterialIcons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            
            {isOwner ? (
              <>
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={handleEdit}
                >
                  <MaterialIcons name="edit" size={20} color={Colors.primary}/>
                  <Text style={styles.menuItemText}>Edit Review</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={handleDelete}
                >
                  <MaterialIcons name="delete" size={20} color={Colors.primary} />
                  <Text style={styles.menuItemText}>Delete Review</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={handleReport}
              >
                <MaterialIcons name="report" size={23} color={Colors.primary} />
                <Text style={styles.menuItemText}>Report Review</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </Modal>

      {isOwner ? (
        <>
          <EditReviewModal
            visible={showEditModal}
            onClose={() => setShowEditModal(false)}
            review={review}
            onSave={handleUpdateReview}
          />

          <DeleteReviewModal
            visible={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            review={review}
            onDelete={handleDeleteReview}
          />
        </>
      ) : (
        <ReportReviewModal
          visible={showReportModal}
          onClose={() => setShowReportModal(false)}
          review={review}
          onReport={(reportData) => {
            // Handle report submission
            setShowReportModal(false);
          }}
        />
      )}
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
  menuButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    maxWidth: 300,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#555',
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
});

export default ReviewCard;