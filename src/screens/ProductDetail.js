import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ProductImageCarousel from '../components/carousel/ProductImageCarousel';
import RatingStars from '../components/items/RatingStars';
import SimilarProductsList from '../components/lists/SimilarProductsList';
import { useNavigation } from '@react-navigation/native';

const product = {
  id: 1,
  name: 'Chaussures de sport Nike',
  description: 'Chaussures de sport légères et confortables parfaites pour la course.',
  price: 99.99,
  rating: 4.5,
  images: [
    'https://images.unsplash.com/photo-1600180758890-6ec2d045ad68?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1589187155474-2f01c1dbdc1f?auto=format&fit=crop&w=800&q=80',
  ],
};

const similarProducts = [
  {
    id: 2,
    name: 'Adidas Runner',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1580316014900-3c0a5a3e5f1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Puma Sprint',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1618354691267-b709c389d161?auto=format&fit=crop&w=800&q=80',
  },
];

const ProductDetailsScreen = () => {
  const router = useRouter();

  return (
    <ScrollView style={{ padding: 16 }}>
      <ProductImageCarousel images={product.images} />

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10 }}>
        {product.name}
      </Text>

      <Text style={{ fontSize: 20, color: '#555', marginVertical: 5 }}>
        {product.price} €
      </Text>

      <RatingStars rating={product.rating} />

      <TouchableOpacity onPress={() => router.push('/ratingReviews')}>
        <Text style={{ color: '#007bff', marginTop: 8 }}>Voir les avis</Text>
      </TouchableOpacity>

      <Text style={{ marginVertical: 15 }}>{product.description}</Text>

      <SimilarProductsList products={similarProducts} />
    </ScrollView>
  );
};

export default ProductDetailsScreen;