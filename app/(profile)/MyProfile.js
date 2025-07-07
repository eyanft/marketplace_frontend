import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Modal,
} from "react-native";
import SectionCard from "../../src/components/cards/SectionCard";
import Title from "../../src/components/text/CustomText";
import { Image } from "expo-image";
import { useZustandStore } from "../../src/store/zustand";
import Button from "../../src/components/ui/Button";
import { Card, CardContent } from "../../src/components/ui/Card";
import { logout } from "../../src/services/auth/authService";
import { useRouter } from "expo-router";
import { getOrderCount } from "../../src/services/order/orderService";
import { useQuery } from "@tanstack/react-query";
import Feather from "@expo/vector-icons/Feather";
import { Colors } from "../../config/colors";

export default function MyProfile() {
  const router = useRouter();
  const user = useZustandStore((state) => state.user);
  const loadUser = useZustandStore((state) => state.loadUser);
  const clearUser = useZustandStore((state) => state.logout);
  const clearCart = useZustandStore((state) => state.clearCart);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["orderCount", user.firebaseID],
    queryFn: () => getOrderCount(),
    enabled: !!user,
  });

  const onLogoutPress = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    setShowLogoutModal(false);
    await logout();
    clearUser();
    clearCart();
    router.replace("(auth)/login");
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        <View className="p-6 pt-16">
          {/* Header */}
          <View className="mb-6">
            <Title className="text-4xl font-bold text-gray-900 mb-2">
              My Profile
            </Title>
            <Title className="text-base text-gray-600">
              Manage your account and preferences
            </Title>
          </View>

          {/* Profile Card */}
          <Card className="mb-6">
            <CardContent>
              <View className="flex-row items-center">
                <View className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: "https://i.imgur.com/nFyr6sN.png" }}
                    contentFit="cover"
                  />
                </View>
                <View className="flex-1">
                  <Title className="text-xl font-semibold text-gray-900 mb-1">
                    {user && user?.firstname + " "}
                    {user && user?.lastname}
                  </Title>
                  <Title className="text-sm text-gray-600">{user?.email}</Title>
                </View>
                <Button
                  variant="outline"
                  size="sm"
                  onPress={() => router.push("(profile)/Settings")}
                  style={{ borderColor: "#ff5c00" }}
                >
                  <Feather name="edit-3" size={16} color="#ff5c00" />
                </Button>
              </View>
            </CardContent>
          </Card>

          {/* Menu Sections */}
          <View className="space-y-6 mb-6">
            <Card>
              <CardContent>
                <TouchableOpacity
                  className="flex-row items-center justify-between py-2"
                  onPress={() => router.push("myorders")}
                >
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-orange-100 rounded-lg items-center justify-center mr-3">
                      <Feather
                        name="shopping-bag"
                        size={20}
                        color={Colors.primary}
                      />
                    </View>
                    <View>
                      <Title className="text-base font-semibold text-gray-900">
                        My Orders
                      </Title>
                      <Title className="text-sm text-gray-600">
                        {data && !isLoading
                          ? `${data} orders`
                          : "No orders yet"}
                      </Title>
                    </View>
                  </View>
                  <Feather name="chevron-right" size={20} color="#9ca3af" />
                </TouchableOpacity>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <TouchableOpacity
                  className="flex-row items-center justify-between py-2"
                  onPress={() => router.push("product?type=listed")}
                >
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center mr-3">
                      <Feather name="tag" size={20} color="#3b82f6" />
                    </View>
                    <View>
                      <Title className="text-base font-semibold text-gray-900">
                        My Listed Items
                      </Title>
                      <Title className="text-sm text-gray-600">
                        {data && !isLoading
                          ? `${data} items`
                          : "No items listed"}
                      </Title>
                    </View>
                  </View>
                  <Feather name="chevron-right" size={20} color="#9ca3af" />
                </TouchableOpacity>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <TouchableOpacity
                  className="flex-row items-center justify-between py-2"
                  onPress={() => router.push("myorders?type=seller")}
                >
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-green-100 rounded-lg items-center justify-center mr-3">
                      <Feather name="truck" size={20} color="#10b981" />
                    </View>
                    <View>
                      <Title className="text-base font-semibold text-gray-900">
                        My Listed Orders
                      </Title>
                      <Title className="text-sm text-gray-600">
                        {data && !isLoading
                          ? `${data} orders`
                          : "No orders yet"}
                      </Title>
                    </View>
                  </View>
                  <Feather name="chevron-right" size={20} color="#9ca3af" />
                </TouchableOpacity>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <TouchableOpacity
                  className="flex-row items-center justify-between py-2"
                  onPress={() => router.push("(profile)/Settings")}
                >
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-purple-100 rounded-lg items-center justify-center mr-3">
                      <Feather name="settings" size={20} color="#8b5cf6" />
                    </View>
                    <View>
                      <Title className="text-base font-semibold text-gray-900">
                        Settings
                      </Title>
                      <Title className="text-sm text-gray-600">
                        Notifications, password
                      </Title>
                    </View>
                  </View>
                  <Feather name="chevron-right" size={20} color="#9ca3af" />
                </TouchableOpacity>
              </CardContent>
            </Card>
          </View>

          {/* Logout Button */}
          <View className="mt-2 mb-6">
            <Button
              variant="default"
              size="lg"
              onPress={onLogoutPress}
              style={styles.logoutButton}
            >
              <Feather
                name="log-out"
                size={18}
                color="#fff"
                style={{ marginRight: 8 }}
              />
              <Text className="text-white font-semibold text-base">
                Log Out
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        transparent={true}
        visible={showLogoutModal}
        animationType="fade"
        onRequestClose={handleCancelLogout}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Title className="text-xl font-bold text-gray-900 text-center mb-2">
                Logout
              </Title>
              <Title className="text-base text-gray-600 text-center">
                Are you sure you want to logout? You'll need to sign in again to
                access your account.
              </Title>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleCancelLogout}
                activeOpacity={0.7}
              >
                <Feather name="x" size={24} color="#6b7280" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleConfirmLogout}
                activeOpacity={0.7}
              >
                <Feather name="log-out" size={24} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 320,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
