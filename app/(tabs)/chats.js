import React from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useUserChats } from "../../src/hooks/useUserChats";
import { Colors } from "../../config/colors";
import { useZustandStore } from "../../src/store/zustand";
import { Image } from "react-native";
import { getTimeAgo } from "../../src/utils/shimmer/dateUtils";
import { MessageCircle, Users } from "lucide-react-native";

const EmptyChatsState = () => {
  const router = useRouter();

  const handleStartChat = () => {
    // Navigate to contacts or user selection screen
    router.push("/contacts"); // Adjust path as needed
  };

  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyContent}>
        <View style={styles.iconContainer}>
          <MessageCircle size={80} color={Colors.primary} strokeWidth={1.5} />
          <View style={styles.iconOverlay}>
            <MessageCircle
              size={60}
              color="#bd643c"
              fill="#bd643c"
              opacity={0.3}
            />
          </View>
        </View>

        <Text style={styles.emptyTitle}>No Messages Yet</Text>
        <Text style={styles.emptySubtitle}>
          Start a conversation with someone to see your chats here
        </Text>

        <View style={styles.illustrationContainer}>
          <Users size={40} color={Colors.primary} strokeWidth={1} />
        </View>
        {/* 
        <TouchableOpacity
          style={styles.startChatButton}
          onPress={handleStartChat}
        >
          <Text style={styles.startChatButtonText}>Start a Chat</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default function Chat() {
  const { user } = useZustandStore();
  const router = useRouter();

  const {
    data: chats = [],
    isLoading,
    isError,
    refetch,
  } = useUserChats(user?.firebaseID);

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
        style={styles.chatItem}
      >
        <Image
          source={{ uri: "https://avatar.iran.liara.run/public/38" }}
          style={styles.avatar}
        />
        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <Text style={styles.receiverName}>{receiverName}</Text>
            <Text style={styles.timeAgo}>
              {getTimeAgo(item.lastMessageTime.seconds * 1000)}
            </Text>
          </View>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
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
      {chats.length === 0 ? (
        <EmptyChatsState />
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onRefresh={refetch}
          refreshing={isLoading}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyContent: {
    alignItems: "center",
    maxWidth: 300,
  },
  iconContainer: {
    position: "relative",
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  iconOverlay: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  emptyTitle: {
    fontSize: 28,
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
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  startChatButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  startChatButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  // Chat item styles
  chatItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 20,
    marginRight: 12,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  receiverName: {
    fontWeight: "bold",
  },
  timeAgo: {
    color: "#666",
  },
  lastMessage: {
    color: "#666",
    marginTop: 4,
  },
});
