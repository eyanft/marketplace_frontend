import { View, Image, FlatList, Dimensions } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');

const ProductImageCarousel = ({ images }) => {
  return (
    <FlatList
      data={images}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item }}
          style={{ width, height: 300, resizeMode: 'cover' }}
        />
      )}
    />
  );
};

export default ProductImageCarousel;