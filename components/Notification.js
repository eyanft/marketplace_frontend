import React, { useState } from "react";
import { View, TouchableOpacity, Animated, StyleSheet } from "react-native";
import { Bell } from "lucide-react-native";
import { Colors } from '../config/colors'; 


export default function NotificationIcon({ hasNotifications = true, onPress }) {
  const [scaleAnim] = useState(new Animated.Value(1));
  
  const handlePress = () => {
    // Animate the bell when pressed
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Call the passed onPress handler if provided
    if (onPress) onPress();
  };
  
  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.7}
      onPress={handlePress}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Bell size={22} color="#333" strokeWidth={2} />
        
        {/* Notification indicator dot */}
        {hasNotifications && (
          <View style={styles.notificationDot} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 8,
    zIndex: 10,
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    borderWidth: 1.5,
    borderColor: 'transparent',
  }
});