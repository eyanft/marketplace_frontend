import React, { useCallback, useEffect } from "react";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../src/services/firebaseConfig";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Colors } from "../../config/colors";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

const fetchMessages = async (chatId) => {
  return new Promise((resolve, reject) => {
    const messagesRef = collection(firestore, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          const timestamp = firebaseData.timestamp
            ? new Date(firebaseData.timestamp.toMillis())
            : new Date();

          return {
            _id: doc.id,
            text: firebaseData.text || "",
            createdAt: timestamp,
            user: {
              _id: firebaseData.senderId,
              name: firebaseData.senderName || "User",
            },
            receiverId: firebaseData.receiverId,
            receiverName: firebaseData.receiverName,
            readAt: firebaseData.readAt
              ? new Date(firebaseData.readAt.toMillis())
              : null,
          };
        });
        resolve(messages);
      },
      (error) => reject(error)
    );

    return unsubscribe;
  });
};
const renderBubble = (props) => {
  const { currentMessage } = props;
  const isSeen = currentMessage.readAt !== null;
  console.log(isSeen);
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: Colors.secondary,
        },
        right: {
          backgroundColor: Colors.primary,
        },
      }}
      textStyle={{
        right: {
          color: "white",
          fontFamily: "Montserrat-Light",
          fontSize: 14,
        },
        left: {
          color: Colors.primary,
          fontFamily: "Montserrat-Light",
          fontSize: 14,
        },
      }}
      // renderTicks={() => {
      //   return isSeen ? (
      //     <Ionicons name="checkmark-done" size={16} color={"white"} />
      //   ) : null;
      // }}
    />
  );
};

const renderSendButton = (props) => {
  return (
    <Send
      {...props}
      containerStyle={{
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
      }}
    >
      <Ionicons name="send" size={24} color={Colors.primary} />
    </Send>
  );
};
export default function Chat() {
  const { chatId, username, userUID, receiverId, receiverName } =
    useLocalSearchParams();

  const { data: messages = [], refetch } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => fetchMessages(chatId),
    refetchInterval: 5000,
    enabled: !!chatId,
  });
  const markMessageAsSeen = useMutation({
    mutationFn: (messageId) => updateSeenAt(messageId),
    onSuccess: () => {
      console.log("Mutation successful");
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });
  const onSend = useCallback(
    async (newMessages = []) => {
      try {
        const { text } = newMessages[0];

        await addDoc(collection(firestore, "chats", chatId, "messages"), {
          text,
          timestamp: serverTimestamp(),
          senderId: userUID,
          senderName: username,
          receiverId: receiverId,
          receiverName: receiverName,
          sentAt: serverTimestamp(),
          readAt: null,
        });

        await refetch();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
    [chatId, userUID, username, receiverId, receiverName, refetch]
  );
  const updateSeenAt = async (messageId) => {
    console.log(messageId);
    const messageRef = doc(firestore, "chats", chatId, "messages", messageId);
    await updateDoc(messageRef, {
      readAt: serverTimestamp(),
    });
  };
  const onChatOpen = () => {
    if (messages.length > 0) {
      const lastMessage = messages[0];
      console.log(userUID, lastMessage?.user?._id);
      if (lastMessage?.user?._id !== userUID && !lastMessage.readAt) {
        console.log("test", lastMessage._id);
        markMessageAsSeen.mutate(lastMessage._id);
      }
    }
  };

  return (
    <View className="flex-1 bg-orange-600/20 ">
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userUID,
          name: username,
        }}
        renderUsernameOnMessage={true}
        alwaysShowSend
        renderAvatarOnTop
        inverted={true}
        // isTyping={true}
        scrollToBottom
        infiniteScroll
        renderBubble={renderBubble}
        renderSend={renderSendButton}
      />
    </View>
  );
}
