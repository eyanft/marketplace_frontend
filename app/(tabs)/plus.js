import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import { Colors } from '../../config/colors';
import { useRouter } from 'expo-router';
import ProductForm from '../../components/ProductForm';


export default function PlusScreen() {
  const router = useRouter();

  const handleSubmit = (formData) => {
    console.log('Form submitted:', formData);
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});