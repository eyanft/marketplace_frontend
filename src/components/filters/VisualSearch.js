import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text, ImageBackground } from 'react-native';
import { ChevronLeft, Camera } from 'lucide-react-native';
import CameraView from '../items/CameraView';

export default function VisualSearch({ visible, onClose }) {
  const [showCamera, setShowCamera] = useState(false);

  const handleTakePhoto = (photo) => {
    // Handle the photo data here
    console.log('Photo taken:', photo);
    setShowCamera(false);
    // Add your photo processing logic here
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible && !showCamera}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.backgroundImage}
            blurRadius={1}
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                onPress={onClose}
                style={styles.backButton}
              >
                <ChevronLeft size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Visual search</Text>
              <View style={styles.headerSpacer} />
            </View>
            
            <View style={styles.visualSearchContent}>
              <Text style={styles.visualSearchText}>
                Search for a product by taking a photo or uploading an image
              </Text>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => setShowCamera(true)}
              >
                <Text style={styles.actionButtonText}>TAKE A PHOTO</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.uploadButton}>
                <Text style={styles.uploadButtonText}>UPLOAD AN IMAGE</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </Modal>

      <CameraView 
        visible={showCamera}
        onClose={() => setShowCamera(false)}
        onTakePhoto={handleTakePhoto}
      />
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  backButton: {
    padding: 10,
  },
  headerSpacer: {
    width: 44,
  },
  modalTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  visualSearchContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  visualSearchText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: '#ff4500',
    width: '100%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  uploadButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
}); 