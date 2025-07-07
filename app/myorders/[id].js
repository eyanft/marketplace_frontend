import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import {
  Button,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SectionText from "../../src/components/text/CustomText";
import OrderItem from "../../src/components/cards/ItemCart";
import { ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { getOrderById } from "../../src/services/order/orderService";
import {
  cancelPayment,
  confirmPayment,
} from "../../src/services/payment/paymentService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDateDMY } from "../../src/utils/shimmer/dateUtils";
import { Alert } from "react-native";
import { useZustandStore } from "../../src/store/zustand";
export default function OrderDetail() {
  const { id } = useLocalSearchParams();
  const { user } = useZustandStore();
  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id),
  });
  const queryClient = useQueryClient();
  console.log(order);
  const { mutate: cancel, isLoading: isCancelling } = useMutation({
    mutationFn: cancelPayment,
    onSuccess: () => {
      queryClient.invalidateQueries(["userOrders"]);
      queryClient.invalidateQueries(["order", id]);
      router.back();
    },
    onError: () => {
      Alert.alert("Failed to cancel order");
    },
  });
  const { mutate: confirm, isLoading: isConfirming } = useMutation({
    mutationFn: confirmPayment,
    onSuccess: () => {
      queryClient.invalidateQueries(["userOrders"]);
      queryClient.invalidateQueries(["order", id]);
      router.back();
    },
    onError: () => {
      Alert.alert("Failed to confirm order");
    },
  });

  return (
    <>
      <View className="p-2 mt-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-semibold">Order №{id}</Text>
          <Text className="text-sm text-gray-500">
            {formatDateDMY(order?.createdAt)}
          </Text>
        </View>
        <View className="mt-2">
          <View className="flex-row justify-between items-center">
            <Text className="text-sm text-gray-500">
              {/* Tracking number: */}
              {/* <Text className=" text-black font-bold"> IW3475453455</Text> */}
            </Text>
            <Text className="text-green-500 font-base">{order?.status}</Text>
          </View>
        </View>
        <Text className="text-lg font-semibold mt-4">
          {order?.orderItems.length} Items
        </Text>
        <ScrollView className=" mt-4  h-2/3 ">
          <View className="gap-4">
            {order?.orderItems?.map((item, index) => {
              const product = {
                id: item.productId,
                name: item.productName,
                price: item.unitPrice,
                quantity: item.quantity,
                imageUrls: [item.imageUrl?.url],
                stock: null,
              };

              return <OrderItem key={index} product={product} edit={false} />;
            })}
          </View>
        </ScrollView>
        {order?.status === "PENDING" ? (
          <View className="flex flex-row justify-between w-full mt-4 h-12 px-4 ">
            <Pressable
              onPress={() => cancel(order)}
              disabled={isCancelling}
              className=" w-48 text-center border border-black rounded-full items-center justify-center"
            >
              <Text className="text-black text-center">Cancel Order</Text>
            </Pressable>

            {user.id === order?.orderItems[0]?.sellerId ? (
              <Pressable
                onPress={() => confirm(order)}
                disabled={isCancelling}
                className=" w-48  bg-orange-600 rounded-full items-center justify-center shadow-xl"
              >
                <Text className="text-white text-center">Confirm Order</Text>
              </Pressable>
            ) : null}
          </View>
        ) : (
          <View className="flex flex-row justify-between w-full mt-4 h-12 px-4">
            <Pressable className=" w-48 text-center border border-black rounded-full items-center justify-center">
              <Text className="text-black text-center">Reorder</Text>
            </Pressable>

            <Pressable className="w-48 bg-orange-600 rounded-full items-center justify-center shadow-xl">
              <Text className="text-white text-center">Leave feedback</Text>
            </Pressable>
          </View>
        )}
      </View>
    </>
  );
}
