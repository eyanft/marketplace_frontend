import React from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useUserChats } from "../../src/hooks/useUserChats";
import { Colors } from "../../config/colors";
import { useZustandStore } from "../../src/store/zustand";
import { Image } from "react-native";
import { getTimeAgo } from "../../src/utils/shimmer/dateUtils";
export default function Chat() {
  const { user } = useZustandStore();
  const router = useRouter();

  const {
    data: chats = [],
    isLoading,
    isError,
    refetch,
  } = useUserChats(user?.firebaseID);
  console.log("user");
  console.log(chats.lastMessageTime);
  console.log("user1");
  const renderItem = ({ item }) => {
    const receiverId = item.participants.find((id) => id !== user?.firebaseID);
    const receiverName = item.participantNames?.find(
      (n) => n !== user.firstName + " " + user.lastName
    );

    return (
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/chat",
            params: {
              chatId: item.id,
              username: user.firstName + " " + user.lastName,
              userUID: user?.firebaseID,
              receiverId,
              receiverName,
            },
          })
        }
        style={{
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#ddd",
          flexDirection: "row",
        }}
      >
        <Image
          source={{ uri: "https://avatar.iran.liara.run/public/38" }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 20,
            marginRight: 12,
          }}
        />
        <View style={{ flex: 1 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontWeight: "bold" }}>{receiverName}</Text>
            <Text>{getTimeAgo(item.lastMessageTime.seconds * 1000)}</Text>
          </View>
          <Text>{item.lastMessage}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );

  if (isError)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Failed to load chats.</Text>
      </View>
    );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onRefresh={refetch}
        refreshing={isLoading}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
