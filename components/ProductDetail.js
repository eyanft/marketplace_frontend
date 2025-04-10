import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SizeSelector from './SizeSelector';
import ColorSelector from './ColorSelector';
import RelatedProducts from './RelatedProducts';

const { width } = Dimensions.get('window');

const ProductDetail = ({ product, navigation }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this ${product.name} from our store!`,
        url: product.imageUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < Math.floor(rating) ? 'star' : 'star-outline'}
          size={16}
          color={i < Math.floor(rating) ? '#FFD700' : '#CCCCCC'}
        />
      );
    }
    return stars;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{product.name}</Text>
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Product Image */}
      <Image source={{ uri: product.imageUrl }} style={styles.image} />

      {/* Product Info */}
      <View style={styles.infoContainer}>
        <View style={styles.brandRow}>
          <View>
            <Text style={styles.brandName}>{product.brand}</Text>
            <Text style={styles.productName}>{product.name}</Text>
          </View>
          <Text style={styles.price}>${product.price}</Text>
        </View>

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <View style={styles.stars}>{renderStars(product.rating)}</View>
          <Text style={styles.reviewCount}>({product.reviewCount})</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>{product.description}</Text>

        {/* Color Selector */}
        <ColorSelector
          colors={product.colors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />

        {/* Size Selector */}
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
        />

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            (!selectedSize || !selectedColor) && styles.addToCartButtonDisabled,
          ]}
          disabled={!selectedSize || !selectedColor}
        >
          <Text style={styles.addToCartText}>ADD TO CART</Text>
        </TouchableOpacity>

        {/* Shipping and Support */}
        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoButtonText}>Shipping info</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoButtonText}>Support</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </TouchableOpacity>

        {/* Related Products */}
        <View style={styles.relatedProducts}>
          <Text style={styles.relatedTitle}>You may also like</Text>
          <RelatedProducts />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  image: {
    width: width,
    height: width * 1.33,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 16,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  brandName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productName: {
    fontSize: 16,
    color: '#666666',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 4,
  },
  reviewCount: {
    color: '#666666',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginVertical: 16,
  },
  addToCartButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginVertical: 16,
  },
  addToCartButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  infoButtonText: {
    fontSize: 16,
  },
  relatedProducts: {
    marginTop: 24,
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ProductDetail; 