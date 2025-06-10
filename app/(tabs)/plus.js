import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus } from "lucide-react-native";
import { Colors } from "../../config/colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import ProductForm from "../../src/components/forms/ProductForm";

export default function PlusScreen() {
  const router = useRouter();
  const { product } = useLocalSearchParams();

  const item = typeof product === "string" ? JSON.parse(product) : product;

  const handleSubmit = (formData) => {
    console.log("Form submitted:", formData);
    router.replace("/(tabs)/home");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProductForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        product={item}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
