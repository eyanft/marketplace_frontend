import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../../src/services/firebaseConfig";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../config/colors";

const renderBubble = (props) => {
  const isSeen = props.currentMessage.readAt !== null;

  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: { backgroundColor: Colors.secondary },
        right: { backgroundColor: Colors.primary },
      }}
      textStyle={{
        right: { color: "white", fontFamily: "Montserrat-Light", fontSize: 14 },
        left: {
          color: Colors.primary,
          fontFamily: "Montserrat-Light",
          fontSize: 14,
        },
      }}
      renderTicks={() =>
        isSeen ? (
          <Ionicons name="checkmark-done" size={16} color="white" />
        ) : null
      }
    />
  );
};

const renderSendButton = (props) => (
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

export default function Chat() {
  const { chatId, username, userUID, receiverId, receiverName } =
    useLocalSearchParams();
  const navigation = useNavigation();
  console.log("xxxxxxxxxxxxxxxxxxx");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: receiverName || "Chat",
    });
  }, [navigation, receiverName]);
  const createChatIfMissing = async (
    chatId,
    userUID,
    receiverId,
    username,
    receiverName
  ) => {
    const chatRef = doc(firestore, "chats", chatId);
    console.log("chatRef", chatRef.id);
    const chatSnap = await getDoc(chatRef);
    console.log(!chatSnap.exists());
    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        participants: [userUID, receiverId],
        participantNames: [username, receiverName],
        createdAt: serverTimestamp(),
        lastMessage: "",
        lastMessageTime: null,
        lastSenderId: null,
      });
    }
  };
  const generateChatId = (userA, userB) => {
    return [userA, userB].sort().join("_"); 
  };

  // Real time message listener
  useEffect(() => {
    if (!chatId) return;

    const messagesRef = collection(firestore, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text || "",
          createdAt: data.timestamp?.toDate() || new Date(),
          user: {
            _id: data.senderId,
            name: data.senderName || "User",
          },
          receiverId: data.receiverId,
          receiverName: data.receiverName,
          readAt: data.readAt?.toDate() || null,
        };
      });
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[0];
    if (lastMessage.user._id !== userUID && !lastMessage.readAt) {
      markMessageAsSeen.mutate(lastMessage._id);
    }
  }, [messages]);

  const updateSeenAt = async (messageId) => {
    const messageRef = doc(firestore, "chats", chatId, "messages", messageId);
    await updateDoc(messageRef, {
      readAt: serverTimestamp(),
    });
  };

  const markMessageAsSeen = useMutation({
    mutationFn: updateSeenAt,
    onSuccess: () => console.log("Message marked as seen"),
    onError: (err) => console.error("Seen update failed:", err),
  });

  const onSend = useCallback(
    async (newMessages = []) => {
      const { text } = newMessages[0];
      const chatIdFinal = generateChatId(userUID, receiverId);
      console.log(chatIdFinal);
      await createChatIfMissing(
        chatIdFinal,
        userUID,
        receiverId,
        username,
        receiverName
      );

      const messageData = {
        text,
        timestamp: serverTimestamp(),
        senderId: userUID,
        senderName: username,
        receiverId,
        receiverName,
        sentAt: serverTimestamp(),
        readAt: null,
      };

      const messagesRef = collection(firestore, "chats", chatId, "messages");
      await addDoc(messagesRef, messageData);

      const chatRef = doc(firestore, "chats", chatId);
      console.log(chatRef);
      await updateDoc(chatRef, {
        lastMessage: text,
        lastMessageTime: serverTimestamp(),
        lastSenderId: userUID,
      });
    },
    [chatId, userUID, username, receiverId, receiverName]
  );

  return (
    <View className="flex-1 bg-orange-600/20">
      <GiftedChat
        messages={messages}
        onSend={(msgs) => onSend(msgs)}
        user={{ _id: userUID, name: username }}
        renderUsernameOnMessage={true}
        alwaysShowSend
        renderAvatarOnTop
        inverted
        scrollToBottom
        infiniteScroll
        renderBubble={renderBubble}
        renderSend={renderSendButton}
      />
    </View>
  );
}
