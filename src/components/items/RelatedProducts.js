import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.4;

const RelatedProducts = ({ products = [] }) => {
  // Dummy data for demonstration
  const dummyProducts = [
    {
      id: '1',
      name: 'Evening Dress',
      brand: 'Dorothy Perkins',
      price: 12,
      imageUrl: 'https://example.com/dress1.jpg',
      rating: 4.5,
      reviewCount: 10,
      discount: 20,
    },
    {
      id: '2',
      name: 'T-Shirt Sailing',
      brand: 'Mango Boy',
      price: 10,
      imageUrl: 'https://example.com/tshirt1.jpg',
      rating: 0,
      reviewCount: 0,
      isNew: true,
    },
    {
      id: '3',
      name: 'T-Shirt London',
      brand: 'Mango Boy',
      price: 10,
      imageUrl: 'https://example.com/tshirt2.jpg',
      rating: 0,
      reviewCount: 0,
      isNew: true,
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < Math.floor(rating) ? 'star' : 'star-outline'}
          size={12}
          color={i < Math.floor(rating) ? '#FFD700' : '#CCCCCC'}
        />
      );
    }
    return stars;
  };

  const productsToRender = products.length > 0 ? products : dummyProducts;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {productsToRender.map((product) => (
        <TouchableOpacity key={product.id} style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.imageUrl }}
              style={styles.image}
              defaultSource={require('../assets/placeholder.png')}
            />
            {product.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>-{product.discount}%</Text>
              </View>
            )}
            {product.isNew && (
              <View style={styles.newBadge}>
                <Text style={styles.newText}>NEW</Text>
              </View>
            )}
            <TouchableOpacity style={styles.favoriteButton}>
              <Ionicons name="heart-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.info}>
            {product.rating > 0 && (
              <View style={styles.ratingContainer}>
                <View style={styles.stars}>{renderStars(product.rating)}</View>
                <Text style={styles.reviewCount}>({product.reviewCount})</Text>
              </View>
            )}
            <Text style={styles.brand}>{product.brand}</Text>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  card: {
    width: CARD_WIDTH,
    marginHorizontal: 8,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 0.75,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#000000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  newText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 4,
  },
  info: {
    paddingVertical: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666666',
  },
  brand: {
    fontSize: 12,
    color: '#666666',
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RelatedProducts; 