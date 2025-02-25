import { Tabs } from 'expo-router';
import { Home, ShoppingBag, Heart, User } from 'lucide-react-native';
import { Colors } from '../../config/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#f1f1f1',
          height: 60, 
          paddingBottom: 8, 
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#999',
        tabBarIconStyle: {
          marginTop: 4, 
        },
        tabBarLabelStyle: {
          fontSize: 14, // Increase the font size
          fontWeight: '500', // Make it a bit bolder
          marginBottom: 4, // Add some space below the text
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size + 4} color={color} />, // Increase icon size
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, size }) => <ShoppingBag size={size + 4} color={color} />, // Increase icon size
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => <Heart size={size + 4} color={color} />, // Increase icon size
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size + 4} color={color} />, // Increase icon size
        }}
      />
    </Tabs>
  );
}