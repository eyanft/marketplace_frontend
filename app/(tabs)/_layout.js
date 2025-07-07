import { Tabs } from "expo-router";
import { Home, MessageCircle, Plus, Heart, User } from "lucide-react-native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../config/colors";
import { auth } from "../../src/services/firebaseConfig";

export default function TabLayout() {
  console.log(auth.currentUser);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#9E9E9E",
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, size }) => (
            <MessageCircle color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="plus"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <View style={styles.ctaButton}>
              <Plus color="#FFFFFF" size={24} />
            </View>
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.tabBarButton} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
  ctaButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 10,
  },
  tabBarButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
