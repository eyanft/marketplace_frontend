import React, { useState } from "react";
import { Pressable, ScrollView, View, StyleSheet } from "react-native";
import Title from "../../src/components/text/CustomText";
import OrderCard from "../../src/components/cards/OrderCard";
import { useQuery } from "@tanstack/react-query";
import { useZustandStore } from "../../src/store/zustand";
import {
  getUserListedOrders,
  getUserOrders,
} from "../../src/services/order/orderService";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "../../config/colors";
import {
  Package,
  Clock,
  XCircle,
  CheckCircle2,
  ShoppingBag,
} from "lucide-react-native";

const EmptyOrderState = ({ status, type }) => {
  const getEmptyStateContent = () => {
    switch (status) {
      case "COMPLETED":
        return {
          icon: (
            <CheckCircle2 size={60} color={Colors.primary} strokeWidth={1.5} />
          ),
          title: "No Delivered Orders",
          subtitle:
            type === "seller"
              ? "You haven't delivered any orders yet"
              : "You haven't received any orders yet",
        };
      case "PENDING":
        return {
          icon: <Clock size={60} color="#f59e0b" strokeWidth={1.5} />,
          title: "No Processing Orders",
          subtitle:
            type === "seller"
              ? "No orders are currently being processed"
              : "You don't have any orders in progress",
        };
      case "CANCELED":
        return {
          icon: <XCircle size={60} color="#ef4444" strokeWidth={1.5} />,
          title: "No Canceled Orders",
          subtitle: "Great! No orders have been canceled",
        };
      default:
        return {
          icon: <Package size={60} color={Colors.primary} strokeWidth={1.5} />,
          title: "No Orders Found",
          subtitle:
            type === "seller"
              ? "Start listing products to receive orders"
              : "Start shopping to see your orders here",
        };
    }
  };

  const { icon, title, subtitle } = getEmptyStateContent();

  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyContent}>
        <View style={styles.iconContainer}>
          {icon}
          <View style={styles.iconOverlay}>
            <ShoppingBag
              size={40}
              color={Colors.primary}
              fill={Colors.primary}
              opacity={0.2}
            />
          </View>
        </View>

        <Title style={styles.emptyTitle}>{title}</Title>
        <Title style={styles.emptySubtitle}>{subtitle}</Title>

        <View style={styles.illustrationContainer}>
          <Package size={30} color={Colors.primary} strokeWidth={1} />
        </View>
      </View>
    </View>
  );
};

export default function Index() {
  const { user } = useZustandStore();
  const [active, setActive] = useState(1);
  const { type } = useLocalSearchParams();

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userOrders", user?.firebaseID],
    queryFn: () =>
      type === "seller" ? getUserListedOrders() : getUserOrders(),
    enabled: !!user,
  });

  const handlePress = (index) => {
    setActive(index === active ? null : index);
  };

  const statusMap = {
    0: null,
    1: "COMPLETED",
    2: "PENDING",
    3: "CANCELED",
  };

  const filteredOrders = orders?.filter((order) => {
    const status = statusMap[active];
    return !status || order.status === status;
  });

  const getTabTitle = (index) => {
    switch (index) {
      case 1:
        return "Delivered";
      case 2:
        return "Processing";
      case 3:
        return "Canceled";
      default:
        return "";
    }
  };

  return (
    <View className="p-8 mt-16 gap-4">
      <Title className="text-5xl font-medium">My Orders</Title>

      <View className="flex flex-row justify-between mt-4 bg-white rounded-full">
        {[1, 2, 3].map((index) => (
          <Pressable
            key={index}
            style={{
              paddingHorizontal: 24,
              height: 36,
              justifyContent: "center",
              borderRadius: 9999,
              backgroundColor:
                active === index ? Colors.primary : "transparent",
            }}
            onPress={() => handlePress(index)}
          >
            <Title style={{ color: active === index ? "#fff" : "#000" }}>
              {getTabTitle(index)}
            </Title>
          </Pressable>
        ))}
      </View>

      <ScrollView className="mt-4 h-2/3" showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Title>Loading orders...</Title>
          </View>
        ) : filteredOrders && filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <EmptyOrderState status={statusMap[active]} type={type} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  emptyContent: {
    alignItems: "center",
    maxWidth: 280,
  },
  iconContainer: {
    position: "relative",
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconOverlay: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  illustrationContainer: {
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
});
