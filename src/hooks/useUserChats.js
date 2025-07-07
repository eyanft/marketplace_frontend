import { useQuery } from "@tanstack/react-query";
import { firestore } from "../services/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export const fetchUserChats = async (userUID) => {
  const q = query(
    collection(firestore, "chats"),
    where("participants", "array-contains", userUID)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const useUserChats = (userUID) =>
  useQuery({
    queryKey: ["userChats", userUID],
    queryFn: () => fetchUserChats(userUID),
    enabled: !!userUID,
    staleTime: 10000,
    refetchInterval: 10000,
  });
