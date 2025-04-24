import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { ShoppingBag, Star, X } from "lucide-react-native";
import { Card, CardContent } from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { Colors } from "../../../config/colors";
import { useRouter } from "expo-router";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const ProcceedToItemDetails = () => {
    router.push({
      pathname: `/product/${product.id}`,
      params: { product: JSON.stringify(product) },
    });
  };

  return (
    <Card style={styles.productCard}>
      <CardContent>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.imageUrls[0] }}
            style={styles.productImage}
          />

          {/* <Button variant="ghost" size="icon" style={styles.closeButton}>
            <X size={20} color="black" />
          </Button> */}

          {!product.isSoldOut && (
            <Button onPress={ProcceedToItemDetails} style={styles.bagButton}>
              <ShoppingBag size={16} color="white" />
            </Button>
          )}

          {product.isNew && (
            <Badge style={styles.newBadge}>
              <Text style={styles.badgeText}>NEW</Text>
            </Badge>
          )}

          {product.discount && (
            <Badge variant="destructive" style={styles.discountBadge}>
              <Text style={styles.badgeText}>{product.discount}</Text>
            </Badge>
          )}

          {product.isSoldOut && (
            <View style={styles.soldOutOverlay}>
              <View style={styles.soldOutBackground} />
              <Text style={styles.soldOutText}>
                Sorry, this item is currently{"\n"}sold out
              </Text>
            </View>
          )}
        </View>

        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < product.rating ? "#FFBA49" : "transparent"}
              color={i < product.rating ? "#FFBA49" : "#9b9b9b"}
            />
          ))}
          <Text style={styles.reviewCount}>({product.reviewCount})</Text>
        </View>

        <Text style={styles.brandText}>{product.name}</Text>
        <Text style={styles.nameText}>{product.name}</Text>

        {/* <View style={styles.detailsRow}>
          <Text style={styles.detailText}>
            <Text style={styles.grayText}>Color: </Text>
            {product.color}
          </Text>
          <Text style={[styles.detailText, { marginLeft: 10 }]}>
            <Text style={styles.grayText}>Size: </Text>
            {product.size}
          </Text>
        </View> */}

        <View style={styles.priceContainer}>
          {/* {product.originalPrice && (
            <Text style={styles.originalPrice}>{product.originalPrice}</Text>
          )} */}
          <Text
            style={[styles.price, product.discount && styles.discountPrice]}
          >
            {product.price} DT
          </Text>
        </View>
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({
  productCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 184,
    borderRadius: 8,
  },
  closeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    padding: 4,
  },
  bagButton: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "#ff5b00",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 4,
  },
  newBadge: {
    position: "absolute",
    top: 8,
    left: 8,
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
  },
  soldOutOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
  },
  soldOutBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    opacity: 0.5,
  },
  soldOutText: {
    fontSize: 11,
    color: "black",
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginLeft: 6,
  },
  reviewCount: {
    fontSize: 10,
    color: "#9b9b9b",
    marginLeft: 4,
  },
  brandText: {
    fontSize: 11,
    color: "#9b9b9b",
    marginTop: 8,
    marginLeft: 6,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
    marginLeft: 6,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 8,
  },
  detailText: {
    fontSize: 11,
  },
  grayText: {
    color: "#9b9b9b",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginLeft: 6,
  },
  originalPrice: {
    fontSize: 14,
    color: "#9b9b9b",
    textDecorationLine: "line-through",
    marginRight: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "500",
  },
  discountPrice: {
    color: Colors.primary,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default ProductCard;
