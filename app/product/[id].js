import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import ProductHeader from '../../src/components/items/DetailsProductHeader';
import ProductImageGallery from '../../src/components/slides/ProductImageGallery';
import ProductSelectors from '../../src/components/selector/ProductSelectors';  
import ProductInfo from '../../src/components/items/ProductInfo';
import AddToCartButton from '../../src/components/buttons/AddToCartButton';
import AdditionalInfo from '../../src/components/items/AdditionalInfo';
import RelatedProducts from '../../src/components/items/RelatedProducts';

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

  const handleRatingPress = () => {
    router.push({
      pathname: '/rating-reviews',
      params: { product: JSON.stringify(product) },
    });
  };
  
  const handleProductPress = (item) => {
    router.push({
      pathname: '/product-details',
      params: { product: JSON.stringify(item) },
    });
  };

  return (
    <View style={styles.container}>
      <ProductHeader 
        productName={product.name}
        onBack={() => router.back()}
        onShare={handleShare}
      />

      <ScrollView>
        <ProductImageGallery 
          images={PRODUCT_IMAGES}
          activeIndex={activeImageIndex}
          setActiveIndex={setActiveImageIndex}
        />

        <View style={styles.infoContainer}>
          <ProductSelectors 
            onSizePress={() => console.log('Size pressed')}
            onColorPress={() => console.log('Color pressed')}
            onFavoritePress={() => console.log('Favorite pressed')}
          />
          
          <ProductInfo 
            product={product}
            onRatingPress={handleRatingPress}
          />
          
          <AddToCartButton 
            onPress={() => console.log('Add to cart pressed')}
          />
          
          <AdditionalInfo 
            onShippingPress={() => console.log('Shipping info pressed')}
            onSupportPress={() => console.log('Support pressed')}
          />
          
          <RelatedProducts 
            products={SAMPLE_PRODUCTS}
            onProductPress={handleProductPress}
          />
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
  infoContainer: {
    padding: 12,
  },
});