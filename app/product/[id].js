import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Share,
  Pressable,
  Text,
  Linking,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Button from "../../src/components/buttons/FilledButton";
import ProductHeader from "../../src/components/items/DetailsProductHeader";
import ProductImageGallery from "../../src/components/slides/ProductImageGallery";
import ProductSelectors from "../../src/components/selector/ProductSelectors";
import ProductInfo from "../../src/components/items/ProductInfo";
import AddToCartButton from "../../src/components/buttons/AddToCartButton";
import AdditionalInfo from "../../src/components/items/AdditionalInfo";
import RelatedProducts from "../../src/components/items/RelatedProducts";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useZustandStore } from "../../src/store/zustand";
import ConfirmationModal from "../../src/components/modals/ConfirmationModal";
import { getRecommendedItems } from "../../src/services/product/productService";
import { useQuery } from "@tanstack/react-query";

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956",
    brand: "Dorothy Perkins",
    name: "Evening Dress",
    price: 15,
    rating: 4.8,
    reviews: 10,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1551048632-c72a365b2ee5",
    brand: "Mango Boy",
    name: "T-Shirt Sailing",
    price: 10,
    rating: 4.5,
    reviews: 8,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1583744946564-b52ac1c389c8",
    brand: "Mango",
    name: "T-Shirt Wild",
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
  const { user, cart, setCart, clearCart } = useZustandStore();
  const [showModal, setShowModal] = useState(false);
  const product =
    typeof params.product === "string"
      ? JSON.parse(params.product)
      : params.product;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this ${product?.name} by ${product?.brand}!`,
        url: product?.imageUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRatingPress = () => {
    router.navigate({
      pathname: "/rating-reviews",
      params: { product: JSON.stringify(product) },
    });
  };

  const handleProductPress = (item) => {
    router.navigate({
      pathname: `/product/${item.id}`,
      params: { product: JSON.stringify(item) },
    });
  };

  const handlePhoneCall = () => {
    const phoneNumber = "tel:" + product?.seller?.phoneNumber;
    Linking.openURL(phoneNumber);
  };

  const handleChat = () => {
    const currentUserId = user.firebaseID;
    const sellerId = product?.seller?.id;
    const chatId = [currentUserId, sellerId].sort().join("_");
    router.navigate({
      pathname: "/chat",
      params: {
        chatId: chatId,
        userUID: user.firebaseID,
        username: user.firstname + " " + user.lastname,
        receiverId: product?.seller?.id,
        receiverName: product?.seller?.name,
      },
    });
  };

  const handleCartPress = () => {
    if (
      cart.filter((item) => item?.seller?.id !== product?.seller?.id).length > 0
    ) {
      setShowModal(true);
    } else {
      const productWithQuantity = { ...product, quantity: 1 };
      setCart([productWithQuantity]);
    }
  };

  const rejectAction = () => {
    setShowModal(false);
  };

  const clearItems = () => {
    clearCart();
    setShowModal(false);
    const productWithQuantity = { ...product, quantity: 1 };
    setCart([productWithQuantity]);
  };

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recommendedProducts", product?.id],
    queryFn: () => getRecommendedItems([product?.id]),
    enabled: !!product?.id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 3,
  });

  return (
    <View style={styles.container}>
      <ProductHeader
        productName={product?.name}
        onBack={() => router.back()}
        onShare={handleShare}
      />

      <ScrollView>
        <ProductImageGallery
          images={product?.imageUrls}
          activeIndex={activeImageIndex}
          setActiveIndex={setActiveImageIndex}
        />

        <View style={styles.infoContainer}>
          <ProductInfo product={product} onRatingPress={handleRatingPress} />

          <View className="w-full gap-4">
            {/* Cart Section */}
            {cart.filter((item) => item.id === product?.id).length === 0 ? (
              <AddToCartButton onPress={handleCartPress} />
            ) : (
              <View className="w-full items-center py-4">
                <Text className="text-center text-gray-500 text-lg font-semibold">
                  Product already in cart.
                </Text>
              </View>
            )}

            {/* Contact Buttons Row */}
            <View className="flex-row justify-center gap-4 w-full">
              <Pressable
                style={{ backgroundColor: "#FF5C00" }}
                className="w-1/2 h-16 items-center justify-center rounded-full"
                onPress={handlePhoneCall}
              >
                <FontAwesome name="phone" size={24} color="white" />
              </Pressable>

              <Pressable
                style={{ backgroundColor: "#FF5C00" }}
                className="w-1/2 h-16 items-center justify-center rounded-full"
                onPress={handleChat}
              >
                <FontAwesome name="wechat" size={24} color="white" />
              </Pressable>
            </View>
          </View>

          <RelatedProducts
            products={products}
            onProductPress={handleProductPress}
          />

          <ConfirmationModal
            visible={showModal}
            onClose={rejectAction}
            onConfirm={clearItems}
            title="Add To Cart"
            message="Other products are already added in your cart from another user. Do you want to clear your cart and add this product?"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  infoContainer: {
    padding: 12,
  },
});
