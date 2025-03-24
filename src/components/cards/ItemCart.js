import React from "react";
import { Pressable, View } from "react-native";
import { Image } from "expo-image";
import ItemText from "../text/CustomText";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function ItemCart() {
  return (
    <View className="flex flex-row w-full h-36 bg-white rounded-lg">
      <Image
        contentFit="cover"
        style={{ width: "35%", height: "100%", borderRadius: 10 }}
        source="https://picsum.photos/seed/696/3000/2000"
      />
      <View className="p-2 w-1/2">
        <View>
          <ItemText className="text-2xl font-semibold">Pullover</ItemText>
          <View className="flex flex-row gap-2">
            <ItemText className="text-lg opacity-25">Color:</ItemText>
            <ItemText className="text-lg ">Black</ItemText>
            <ItemText className="text-lg opacity-25 ">Size:</ItemText>
            <ItemText className="text-lg ">L</ItemText>
          </View>
          <View className="mt-5 flex items-center flex-row gap-5 w-full ">
            <Pressable className="bg-white rounded-full p-1 shadow-2xl  ">
              <AntDesign
                className="opacity-25"
                name="minus"
                size={24}
                color="black"
              />
            </Pressable>
            <ItemText className="text-xl">1</ItemText>
            <Pressable className="bg-white rounded-full p-1 shadow-2xl  ">
              <AntDesign
                className="opacity-25"
                name="plus"
                size={24}
                color="black"
              />
            </Pressable>
          </View>
        </View>
      </View>
      <View className=" w-32 h-full p-4  justify-end">
        <ItemText className="font-semibold">30 DT</ItemText>
      </View>
    </View>
  );
}
