import React from "react";
import { Pressable, View } from "react-native";
import { Image } from "expo-image";
import ItemText from "../text/CustomText";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ItemCart({
  edit,
  product,
  onIncrease,
  onDecrease,
  ...props
}) {
  console.log(product);
  const totalAmount = product?.price * product?.quantity;
  return (
    <View className="flex flex-row w-full bg-white rounded-lg p-2">
      <Image
        contentFit="cover"
        style={{ width: "30%", aspectRatio: 1, borderRadius: 10 }}
        source={product?.imageUrls[0]}
      />
      <View className="px-2 flex-1">
        <View>
          <ItemText className="text-2xl font-semibold">
            {product?.name}
          </ItemText>
          {/* <View className="flex flex-row gap-2">
            <ItemText className="text-lg opacity-25">Color:</ItemText>
            <ItemText className="text-lg ">Black</ItemText>
            <ItemText className="text-lg opacity-25 ">Size:</ItemText>
            <ItemText className="text-lg ">L</ItemText>
          </View> */}
          {edit ? (
            <View className="mt-5 flex items-center flex-row gap-5 w-full">
              <Pressable
                onPress={onDecrease}
                className="bg-white rounded-full p-1 shadow-2xl"
              >
                {product?.quantity > 1 ? (
                  <AntDesign
                    className="opacity-25"
                    name="minus"
                    size={24}
                    color="black"
                  />
                ) : (
                  <FontAwesome
                    className="opacity-50"
                    name="trash-o"
                    size={24}
                    color="red"
                  />
                )}
              </Pressable>
              <ItemText className="text-xl">{product?.quantity}</ItemText>
              <Pressable
                onPress={onIncrease}
                disabled={product?.quantity >= product?.stock}
                className="bg-white rounded-full p-1 shadow-2xl  "
              >
                <AntDesign
                  className="opacity-25"
                  name="plus"
                  size={24}
                  color={product?.quantity >= product?.stock ? "gray" : "black"}
                />
              </Pressable>
            </View>
          ) : (
            <View className="flex flex-row gap-2 mt-8">
              <ItemText className="text-lg opacity-25">Units:</ItemText>
              <ItemText className="text-lg ">{product?.quantity}</ItemText>
            </View>
          )}
        </View>
      </View>
      <View className="justify-end items-end pl-2">
        <ItemText className="font-semibold">{totalAmount} DT</ItemText>
      </View>
    </View>
  );
}
