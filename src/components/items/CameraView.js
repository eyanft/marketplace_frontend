import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  SafeAreaView,
} from "react-native";
import { ChevronLeft, Zap, RotateCcw } from "lucide-react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function CameraViewComponent({ visible, onClose, onTakePhoto }) {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      onTakePhoto(photo.uri);
      onClose();
    }
  };

  const toggleCameraType = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return requestPermission();
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <ChevronLeft size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search by taking a photo</Text>
          <View style={styles.headerSpacer} />
        </View>

        <CameraView
          style={styles.cameraPreview}
          facing={facing}
          ref={cameraRef}
        />

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={toggleCameraType}
          >
            <RotateCcw size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleCapture}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <Zap size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  backButton: {
    padding: 10,
  },
  headerSpacer: {
    width: 44,
  },
  cameraPreview: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ff4500",
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    borderColor: "#fff",
  },
  permissionDenied: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  permissionText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  permissionButton: {
    backgroundColor: "#ff4500",
    padding: 15,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
