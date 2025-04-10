import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Share, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Colors } from '../../config/colors';
import { useNavigation } from '@react-navigation/native';

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

export default function ProductDetail() {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const isScrollingRef = useRef(false);
  const lastOffsetRef = useRef(0);

  const handleScroll = event => {
    const slideSize = Dimensions.get('window').width;
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
        url: product.image,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderStars = rating => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<AntDesign key={i} name={i <= rating ? 'star' : 'staro'} size={14} color={i <= rating ? '#FFD700' : '#666'} />);
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerFixed}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <AntDesign name="left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{product.name}</Text>
        <TouchableOpacity onPress={handleShare} style={styles.headerButton}>
          <Feather name="share" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView>
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
                    x: index * Dimensions.get('window').width,
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
            <TouchableOpacity
              style={styles.ratingContainer}
              onPress={() => navigation.navigate('RatingReviews', { productId: product.id })}
            >
              <View style={styles.stars}>{renderStars(product.rating)}</View>
              <Text style={styles.reviews}>({product.reviews || 0})</Text>
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
            {SAMPLE_PRODUCTS.map(item => (
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

