import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from "../../../config/colors";


const ReportReviewModal = ({ visible, onClose, review, onReport }) => {
  const [reportReason, setReportReason] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  const reportReasons = [
    { id: 'spam', label: 'Spam or misleading content' },
    { id: 'inappropriate', label: 'Inappropriate content' },
    { id: 'fake', label: 'Fake review' },
    { id: 'other', label: 'Other' },
  ];

  const handleSubmit = () => {
    onReport({
      reviewId: review.id,
      reason: selectedReason,
      details: reportReason,
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Report Review</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.label}>Why are you reporting this review?</Text>
            
            <View style={styles.reasonsContainer}>
              {reportReasons.map((reason) => (
                <TouchableOpacity
                  key={reason.id}
                  style={[
                    styles.reasonButton,
                    selectedReason === reason.id && styles.selectedReasonButton,
                  ]}
                  onPress={() => setSelectedReason(reason.id)}
                >
                  <Text
                    style={[
                      styles.reasonText,
                      selectedReason === reason.id && styles.selectedReasonText,
                    ]}
                  >
                    {reason.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedReason === 'other' && (
              <View style={styles.detailsContainer}>
                <Text style={styles.label}>Please provide more details</Text>
                <TextInput
                  style={styles.detailsInput}
                  multiline
                  numberOfLines={4}
                  value={reportReason}
                  onChangeText={setReportReason}
                  placeholder="Describe why you're reporting this review..."
                />
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.button, 
                styles.submitButton,
                !selectedReason && styles.disabledButton
              ]} 
              onPress={handleSubmit}
              disabled={!selectedReason}
            >
              <Text style={styles.submitButtonText}>Submit Report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  contentContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
    color: '#333',
  },
  reasonsContainer: {
    marginBottom: 20,
  },
  reasonButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
  },
  selectedReasonButton: {
    backgroundColor: Colors.secondary,
    borderColor: 'orange',
  },
  reasonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedReasonText: {
    fontWeight: '500',
  },
  detailsContainer: {
    marginTop: 16,
  },
  detailsInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  submitButton: {
    backgroundColor: '#ff4444',
  },
  disabledButton: {
    backgroundColor: '#ff9999',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ReportReviewModal; 