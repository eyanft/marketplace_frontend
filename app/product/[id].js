import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Share, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Colors } from '../../config/colors';

const { width } = Dimensions.get('window');

const PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
  'https://images.unsplash.com/photo-1550639525-c97d455acf70',
];

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956',
    brand: 'Dorothy Perkins',
    name: 'Evening Dress',
    price: 15,
    rating: 4.8,
    reviews: 10,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1551048632-c72a365b2ee5',
    brand: 'Mango Boy',
    name: 'T-Shirt Sailing',
    price: 10,
    rating: 4.5,
    reviews: 8,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8',
    brand: 'Mango',
    name: 'T-Shirt Wild',
    price: 12,
    rating: 4.2,
    reviews: 15,
  },
];

export default function ProductDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const isScrollingRef = useRef(false);
  const lastOffsetRef = useRef(0);

  const handleScroll = (event) => {
    const slideSize = width;
    const currentOffset = event.nativeEvent.contentOffset.x;
    const totalWidth = slideSize * PRODUCT_IMAGES.length;

    if (currentOffset >= totalWidth - slideSize) {
      if (currentOffset > lastOffsetRef.current && !isScrollingRef.current) {
        isScrollingRef.current = true;
        scrollViewRef.current?.scrollTo({ x: 0, animated: true });
        setActiveImageIndex(0);
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 300);
      }
    } else {
      const index = Math.floor(currentOffset / slideSize);
      setActiveImageIndex(index);
    }
    lastOffsetRef.current = currentOffset;
  };

  const product = typeof params.product === 'string' ? JSON.parse(params.product) : params.product;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this ${product.name} by ${product.brand}!`,
        url: product.imageUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign
          key={i}
          name={i <= rating ? 'star' : 'staro'}
          size={14}
          color={i <= rating ? '#FFD700' : '#666'}
        />
      );
    }
    return stars;
  };

  const handleRatingPress = () => {
    // Use router.push for expo-router navigation
    router.push({
      pathname: '/rating-reviews',
      params: { product: JSON.stringify(product) },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerFixed}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{product.name}</Text>
        <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
          <Feather name="share" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView>
        {/* Product Images */}
        <View>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={styles.imageContainer}
          >
            {PRODUCT_IMAGES.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.image} />
            ))}
          </ScrollView>
          <View style={styles.pagination}>
            {PRODUCT_IMAGES.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  scrollViewRef.current?.scrollTo({
                    x: index * width,
                    animated: true,
                  });
                  setActiveImageIndex(index);
                }}
                style={styles.paginationDotContainer}
              >
                <View style={[styles.paginationDot, index === activeImageIndex && styles.paginationDotActive]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.selectionRow}>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>Size</Text>
              <AntDesign name="down" size={14} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>Black</Text>
              <AntDesign name="down" size={14} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.favoriteButton}>
              <AntDesign name="hearto" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.brand}>{product.brand}</Text>
            <Text style={styles.name}>{product.name}</Text>
            <TouchableOpacity style={styles.ratingContainer} onPress={handleRatingPress}>
              <View style={styles.stars}>{renderStars(product.rating)}</View>
              <Text style={styles.reviews}>({product.reviewCount || 0})</Text>
            </TouchableOpacity>
            <Text style={styles.description}>
              Short dress in soft cotton jersey with decorative buttons down the front and a wide, frill-trimmed square neckline with
              concealed elastication. Elasticated seam under the bust and short puff sleeves with a small frill trim.
            </Text>
            <Text style={styles.price}>${product.salePrice || product.price}</Text>
          </View>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>ADD TO CART</Text>
          </TouchableOpacity>
          <View style={styles.additionalInfo}>
            <TouchableOpacity style={styles.infoLink}>
              <Text style={styles.infoLinkText}>Shipping info</Text>
              <AntDesign name="right" size={14} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.infoLink}>
              <Text style={styles.infoLinkText}>Support</Text>
              <AntDesign name="right" size={14} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.relatedSection}>
            <Text style={styles.relatedTitle}>You can also like this</Text>
            <Text style={styles.itemCount}>12 items</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relatedProducts}>
            {SAMPLE_PRODUCTS.map((item) => (
              <TouchableOpacity key={item.id} style={styles.relatedItem}>
                <Image source={{ uri: item.image }} style={styles.relatedImage} />
                <View style={styles.relatedInfo}>
                  <Text style={styles.relatedBrand}>{item.brand}</Text>
                  <Text style={styles.relatedName}>{item.name}</Text>
                  <Text style={styles.relatedPrice}>${item.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerFixed: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  imageContainer: {
    height: width,
    marginTop: 56,
  },
  image: {
    width: width,
    height: width,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paginationDotContainer: {
    padding: 4,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: Colors.primary,
    width: 20,
    borderRadius: 4,
  },
  infoContainer: {
    padding: 12,
  },
  selectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '38%',
  },
  dropdownText: {
    fontSize: 14,
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    marginBottom: 16,
  },
  brand: {
    fontSize: 20,
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 4,
  },
  reviews: {
    fontSize: 12,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    marginVertical: 16,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  additionalInfo: {
    marginTop: 8,
  },
  infoLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  infoLinkText: {
    fontSize: 14,
  },
  relatedSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  relatedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemCount: {
    fontSize: 12,
    color: '#666',
  },
  relatedProducts: {
    marginLeft: -12,
  },
  relatedItem: {
    width: 150,
    marginLeft: 12,
  },
  relatedImage: {
    width: '100%',
    height: 200,
    borderRadius: 4,
    marginBottom: 8,
  },
  relatedInfo: {
    paddingHorizontal: 4,
  },
  relatedBrand: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  relatedName: {
    fontSize: 14,
    marginBottom: 4,
  },
  relatedPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});