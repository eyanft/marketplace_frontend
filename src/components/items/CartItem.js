import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const CartItem = ({ image, title, color, size, price, quantity, onIncrement, onDecrement }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={image} style={styles.image} />
      
      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Entypo name="dots-three-vertical" size={15} color="#999" />
        </View>
        
        <View style={styles.properties}>
          <Text style={styles.propertyLabel}>Color: <Text style={styles.propertyValue}>{color}</Text></Text>
          <Text style={styles.propertyLabel}>Size: <Text style={styles.propertyValue}>{size}</Text></Text>
        </View>

        <View style={styles.bottom}>
          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={onDecrement} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{quantity}</Text>
            
            <TouchableOpacity onPress={onIncrement} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.price}>{price}$</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 6,
    backgroundColor: 'white',
    borderRadius: 4,
    marginBottom: 7,
  },
  image: {
    width: 70,
    height: 90,
    borderRadius: 6,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
  },
  properties: {
    marginTop: 2,
  },
  propertyLabel: {
    fontSize: 10,
    color: '#999',
    marginBottom: 2,
  },
  propertyValue: {
    color: '#000',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 22,
    height: 22,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 13,
    color: 'black',
  },
  quantity: {
    fontSize: 13,
    marginHorizontal: 12,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default CartItem; 