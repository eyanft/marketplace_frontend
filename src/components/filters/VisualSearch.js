import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ChevronLeft, Camera } from "lucide-react-native";
import CameraView from "../items/CameraView";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { getDetectedObjects } from "../../services/product/productService";
import { useZustandStore } from "../../store/zustand";
import { useRouter } from "expo-router";

export default function VisualSearch({ visible, onClose }) {
  const [showCamera, setShowCamera] = useState(false);
  const { setFilters } = useZustandStore();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: getDetectedObjects,
    onSuccess: (data) => {
      console.log("Photo uploaded successfully:", data);

      setFilters({ keyword: data });
      router.push({
        pathname: `product`,
      });
    },
    onError: (error) => {
      console.error("Error uploading photo:", error);
    },
  });
  const handleTakePhoto = (photo) => {
    const formData = new FormData();

    const file = {
      uri: photo,
      type: "image/jpeg",
      name: "test",
    };
    formData.append("file", file);
    setShowCamera(false);
    mutation.mutate(formData);
  };
  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Media library permissions are required."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      // Handle selected image (e.g., send to API)
      console.log("Image selected from gallery:", result.assets[0].uri);
      // Example: pass image URI to your handler
      handleTakePhoto(result.assets[0].uri);
    }
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
            source={{
              uri: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.backgroundImage}
            blurRadius={1}
          >
            {mutation.isPending && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#ff4500" />
                <Text style={styles.loadingText}>Recognizing image…</Text>
              </View>
            )}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={onClose} style={styles.backButton}>
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
                onPress={() => !mutation.isPending && setShowCamera(true)}
                disabled={mutation.isPending}
              >
                <Text style={styles.actionButtonText}>TAKE A PHOTO</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={!mutation.isPending ? handleImageUpload : undefined}
                style={styles.uploadButton}
                disabled={mutation.isPending}
              >
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
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
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
    fontWeight: "600",
    textAlign: "center",
  },
  visualSearchContent: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  visualSearchText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 40,
    color: "#333",
    fontWeight: "500",
  },
  actionButton: {
    backgroundColor: "#ff4500",
    width: "100%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 15,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  uploadButton: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  uploadButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.8)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});
