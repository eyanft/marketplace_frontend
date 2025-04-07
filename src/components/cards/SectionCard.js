import React from "react";
import Subtitle from "../text/CustomText";
import Entypo from "@expo/vector-icons/Entypo";
import { Pressable, View } from "react-native";
import { Link } from "expo-router";

export default function SectionCard({ title, subtitle, link, ...props }) {
  return (
    <Link href={link} asChild>
      <Pressable>
        <View className="flex-row items-center justify-between ">
          <View className="flex-1 flex flex-col items-start gap-1 mr-2">
            <Subtitle className="text-xl font-medium">{title}</Subtitle>
            <Subtitle className="opacity-50">{subtitle}</Subtitle>
          </View>
          <Entypo
            className="opacity-50"
            name="chevron-right"
            size={24}
            color="black"
          />
        </View>
      </Pressable>
    </Link>
  );
}
