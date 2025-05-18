import React, { useEffect } from "react";
import { Text, View } from "react-native";
import SectionCard from "../../src/components/cards/SectionCard";
import Title from "../../src/components/text/CustomText";
import { Image } from "expo-image";
import { useZustandStore } from "../../src/store/zustand";
import Button from "../../src/components/buttons/FilledButton";
import { logout } from "../../src/services/auth/authService";
import { useRouter } from "expo-router";
export default function MyProfile() {
  const router = useRouter();
  const user = useZustandStore((state) => state.user);
  const loadUser = useZustandStore((state) => state.loadUser);
  const clearUser = useZustandStore((state) => state.logout);
  const clearCart = useZustandStore((state) => state.clearCart);

  const onLogoutPress = async () => {
    await logout();
    clearUser();
    clearCart();
    router.replace("(auth)/login");
  };
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <View className="p-8 mt-16">
      <Title className="text-5xl font-medium">My profile</Title>
      <View className="flex flex-row h-20 gap-4 mt-10 ">
        <View className="rounded-full   w-20">
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: "https://i.imgur.com/nFyr6sN.png" }}
          />
        </View>
        <View className="flex flex-col">
          <Title className="font-medium text-lg">
            {user && user?.firstname + " "}
            {user && user?.lastname}
          </Title>
          <Title className="opacity-50">{user?.email}</Title>
        </View>
      </View>
      <View className=" flex flex-col gap-10 mt-10">
        <SectionCard
          title={"My orders"}
          subtitle={
            user?.orders?.length
              ? `Already have ${user.orders.length} orders`
              : "No orders yet"
          }
          link="myorders"
        />
        <SectionCard
          title={"Shipping addresses"}
          subtitle={"3 addresses"}
          link="(profile)/AddressList"
        />
        {/* <SectionCard
          title={"Payment methods"}
          subtitle={"Visa  **34"}
          link=""
        /> */}
        {/* <SectionCard
          title={"Cart"}
          subtitle={"You have " + cart.length + " items in your cart"}
          link="/cart"
        /> */}
        <SectionCard
          title={"Settings"}
          subtitle={"Notifications, password"}
          link="(profile)/Settings"
        />
      </View>
      <View className="w-full mt-10">
        <Button onPress={onLogoutPress}>LOG OUT</Button>
      </View>
    </View>
  );
}
