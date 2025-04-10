import React from "react";
import { Text, View } from "react-native";
import SectionCard from "../../src/components/cards/SectionCard";
import Title from "../../src/components/text/CustomText";
import { Image } from "expo-image";
export default function MyProfile() {
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
          <Title className="font-medium text-lg">Matilda brown</Title>
          <Title className="opacity-50">matildabrown@mail.com</Title>
        </View>
      </View>
      <View className=" flex flex-col gap-10 mt-10">
        <SectionCard
          title={"My orders"}
          subtitle={"Already have 12 orders"}
          link="myorders"
        />
        <SectionCard
          title={"Shipping addresses"}
          subtitle={"3 addresses"}
          link="(profile)/AddressList"
        />
        <SectionCard
          title={"Payment methods"}
          subtitle={"Visa  **34"}
          link=""
        />
        <SectionCard
          title={"Settings"}
          subtitle={"Notifications, password"}
          link="(profile)/Settings"
        />
      </View>
    </View>
  );
}
