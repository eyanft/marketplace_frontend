
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const SimilarProductsList = ({ products }) => {
  const router = useRouter();

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
        Produits similaires
      </Text>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/product/${item.id}`)}>
            <View style={{ marginRight: 15 }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 120, height: 120, borderRadius: 8 }}
              />
              <Text numberOfLines={1}>{item.name}</Text>
              <Text style={{ fontWeight: 'bold' }}>{item.price} €</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SimilarProductsList;