import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import { Colors } from '../../config/colors'; 

export default function PlusScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add New Item</Text>
        <Text style={styles.subtitle}>Upload a product</Text>
        
        <View style={styles.actionsContainer}>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.iconContainer, styles.secondaryIcon]}>
              <Plus color="#FFFFFF" size={24} />
            </View>
            <Text style={styles.actionText}>Upload Product</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 20,
    color: Colors.text, 
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 40,
  },
  actionsContainer: {
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary, 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  secondaryIcon: {
    backgroundColor: '#212121',
  },
  actionText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text, 
  },
});