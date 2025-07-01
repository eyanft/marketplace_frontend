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
const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
  "https://images.unsplash.com/photo-1550639525-c97d455acf70",
];

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
      pathname: "/product-details",
      params: { product: JSON.stringify(item) },
    });
  };
  const handlePhoneCall = () => {
    const phoneNumber = "tel:" + product?.seller.phoneNumber;

    Linking.openURL(phoneNumber);
  };

  const handleChat = () => {
    const currentUserId = user.firebaseID;
    const sellerId = product?.seller.id;
    const chatId = [currentUserId, sellerId].sort().join("_");
    router.navigate({
      pathname: "/chat",
      params: {
        chatId: chatId,
        userUID: user.firebaseID,
        username: user.firstname + " " + user.lastname,
        receiverId: product?.seller.id,
        receiverName: product?.seller.name,
      },
    });

    // const chatUrl = "whatsapp://send?phone=+1234567890"; // Replace with chat URL, e.g., WhatsApp link
    // Linking.openURL(chatUrl).catch((err) =>
    //   console.log("Error opening chat", err)
    // );
  };
  const handleCartPress = () => {
    if (
      cart.filter((item) => item?.seller?.id !== product?.seller?.id).length > 0
    ) {
      setShowModal(true);
    } else {
      product.quantity = 1;

      setCart([product]);
    }
  };
  const rejectAction = () => {
    setShowModal(false);
  };
  const clearItems = () => {
    clearCart();

    setShowModal(false);
    setCart([product]);
  };
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
          <ProductSelectors
            productName={product?.name}
            onFavoritePress={() => console.log("Favorite pressed")}
          />

          <ProductInfo product={product} onRatingPress={handleRatingPress} />

          {product?.deliveryMethod === 1 ? (
            cart.filter((item) => item.id === product?.id).length === 0 ? (
              <AddToCartButton onPress={handleCartPress} />
            ) : (
              <View className="flex-row justify-center  gap-4 w-full">
                <Text className="text-center text-gray-500 text-lg font-semibold">
                  Product already in cart.
                </Text>
              </View>
            )
          ) : (
            <View className="flex-row justify-center  gap-4 w-full">
              <Pressable
                style={{ backgroundColor: '#FF5C00' }}
                className="w-1/2 h-16 items-center justify-center rounded-full"
                onPress={handlePhoneCall}
              >
                <FontAwesome name="phone" size={24} color="white" />
              </Pressable>

              <Pressable
                style={{ backgroundColor: '#FF5C00' }}
                className="w-1/2 h-16 items-center justify-center rounded-full"
                onPress={handleChat}
              >
                <FontAwesome name="wechat" size={24} color="white" />
              </Pressable>
            </View>
          )}

          {/* <AdditionalInfo
            onShippingPress={() => console.log("Shipping info pressed")}
            onSupportPress={() => console.log("Support pressed")}
          /> */}

          <RelatedProducts
            products={SAMPLE_PRODUCTS}
            onProductPress={handleProductPress}
          />
          <ConfirmationModal
            visible={showModal}
            onClose={rejectAction} // Close modal on cancel
            onConfirm={clearItems} // Clear cart on confirmation
            title="Add To Cart"
            message="Other products are already added in your cart from another user.Do you want to clear your cart and add this product?"
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
