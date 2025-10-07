import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Modal, Text, TouchableOpacity, StyleSheet } from "react-native";
import ItemCard from "../../src/components/cards/ItemCart";
import SectionTitle from "../../src/components/text/CustomText";
import CheckoutButton from "../../src/components/buttons/FilledButton";
import { passOrder } from "../../src/services/order/orderService";
import { createPayment } from "../../src/services/payment/paymentService";
import { router } from "expo-router";
import { useZustandStore } from "../../src/store/zustand";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { Colors } from "../../config/colors";
import { getAuth } from "firebase/auth";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

export default function Index() {
  const { cart, updateQuantity, removeFromCart, clearCart, user } =
    useZustandStore();
  const [processing, setProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  console.log("Cart items:", user);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const firebaseID = user.firebaseID;
  const email = user?.email;
  const payload = {
    buyer: { firebaseID, email },
    totalAmount,
    orderItems: cart.map((item) => ({
      product: { id: item.id },
      quantity: item.quantity,
    })),
  };

  const { mutate: submitOrder, isLoading } = useMutation({
    mutationFn: createPayment,
    onSuccess: async (data) => {
      // data.data now contains { clientSecret: "...", paymentIntentId: "..." }
      await initPaymentSheet({
        paymentIntentClientSecret: data.data.clientSecret,
        merchantDisplayName: "Mercs",
      });

      const { error } = await presentPaymentSheet();

      // Store the clean PaymentIntent ID
      payload.stripePaymentIntentId = data.data.paymentIntentId;
      console.log("Payload with PaymentIntent ID:", payload);

      if (!error) {
        await passOrder(payload);
        setShowSuccessModal(true);
      }
    },
    onError: (error) => {
      Alert.alert("Error", error.response?.data?.message || "Order failed");
    },
  });
  const onConfirm = () => {
    if (processing || isLoading) return;
    setProcessing(true);
    try {
      if (!firebaseID) {
        Alert.alert("Error", "You must be logged in to place an order.");
        return;
      }

      submitOrder(payload);
    } finally {
      setProcessing(false);
    }
  };

  const handleSuccessAcknowledge = () => {
    setShowSuccessModal(false);
    clearCart();
    router.replace("/(tabs)/home");
  };

  return (
    <View className="pt-24 p-2 gap-2">
      <SectionTitle className="text-5xl font-bold">My Bag</SectionTitle>
      <ScrollView
        className=" mt-4  h-2/3 "
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-4">
          {cart?.map((item, idx) => (
            <ItemCard
              key={idx}
              edit={true}
              product={item}
              onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
              onDecrease={() => {
                if (item.quantity > 1) {
                  updateQuantity(item.id, item.quantity - 1);
                } else {
                  removeFromCart(item.id);
                }
              }}
            />
          ))}
        </View>
      </ScrollView>
      <View className="flex flex-row justify-between w-full mt-4">
        <SectionTitle className="text-xl font-semibold opacity-50">
          Total Amount:
        </SectionTitle>
        <SectionTitle className="text-xl font-semibold ">
          {totalAmount} DT
        </SectionTitle>
      </View>
      <CheckoutButton disabled={isLoading || processing} onPress={onConfirm}>
        PURCHASE
      </CheckoutButton>

      {/* Success Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.iconCircle}>
              <Text style={styles.checkIcon}>✓</Text>
            </View>
            <Text style={styles.modalTitle}>Success</Text>
            <Text style={styles.modalMessage}>Your order has been placed.</Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSuccessAcknowledge}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 320,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  checkIcon: {
    color: Colors.primary,
    fontSize: 40,
    fontWeight: "700",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
    marginBottom: 6,
    color: "#111",
  },
  modalMessage: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "stretch",
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
