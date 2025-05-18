import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
export default function CartCard({ cartItemCount }) {
  const router = useRouter();
  const displayCount = cartItemCount > 9 ? "9+" : cartItemCount.toString();
  const translateX = useRef(new Animated.Value(-150)).current;
  useEffect(() => {
    Animated.timing(translateX, {
      toValue: cartItemCount > 0 ? 0 : -150,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [cartItemCount]);
  return (
    <Animated.View
      style={{
        transform: [{ translateX }],
        position: "absolute",
        top: 160,
        left: 0,
      }}
      onTouchStart={() => {
        router.navigate({
          pathname: "/cart",
        });
      }}
      className="absolute top-40 left-0"
    >
      <View className="flex-row items-center bg-orange-600 rounded-r-full p-3 relative">
        <View>
          <Icon name="cart-outline" size={24} color="white" />
          {cartItemCount > 0 && (
            <View className="absolute -top-5 -right-3 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
              <Text className="text-white text-xs font-bold">
                {displayCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );
}
