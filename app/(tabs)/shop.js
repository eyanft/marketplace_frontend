import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CartItem from '../../components/CartItem';
import { Colors } from '../../config/colors';

const initialItems = [
  {
    id: 1,
    title: 'Pullover',
    image: { uri: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=774' },
    color: 'Black',
    size: 'L',
    price: 51,
    quantity: 1,
  },
  {
    id: 2,
    title: 'T-Shirt',
    image: { uri: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800' },
    color: 'Gray',
    size: 'L',
    price: 30,
    quantity: 1,
  },
  {
    id: 3,
    title: 'Sport Dress',
    image: { uri: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800' },
    color: 'Black',
    size: 'M',
    price: 43,
    quantity: 1,
  },
];

export default function Shop() {
  const [items, setItems] = useState(initialItems);
  const [promoCode, setPromoCode] = useState('');

  const handleIncrement = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrement = (id) => {
    setItems(items.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'My Bag',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
        }} 
      />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.pageTitle}>My Bag</Text>

      <ScrollView style={styles.itemsList}>
        {items.map(item => (
          <CartItem
            key={item.id}
            {...item}
            onIncrement={() => handleIncrement(item.id)}
            onDecrement={() => handleDecrement(item.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.bottomSection}>
        <View style={styles.promoContainer}>
          <TextInput
            style={styles.promoInput}
            placeholder="Enter your promo code"
            value={promoCode}
            onChangeText={setPromoCode}
          />
          <TouchableOpacity style={styles.promoButton}>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total amount:</Text>
          <Text style={styles.totalAmount}>{totalAmount}$</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>CHECK OUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchButton: {
    padding: 8,
  },
  itemsList: {
    flex: 1,
    padding: 16,
  },
  bottomSection: {
    padding: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  promoContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  promoInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  promoButton: {
    width: 40,
    height: 40,
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoButtonText: {
    color: 'white',
    fontSize: 24,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    color: '#999',
  },
  totalAmount: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    height: 46,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});