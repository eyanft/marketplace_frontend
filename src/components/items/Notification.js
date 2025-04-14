import React, { useState } from "react";
import { View, TouchableOpacity, Animated, StyleSheet, Modal, Text } from "react-native";
import { Bell, X } from "lucide-react-native";
import { Colors } from '../../../config/colors';
import NotificationList from '../lists/NotificationList';

export default function NotificationIcon({ hasNotifications = true, onPress }) {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'order',
      title: "Nouvelle commande",
      message: "Votre commande #123 a été confirmée et sera livrée demain",
      time: "Il y a 5 minutes",
      read: false
    },
    {
      id: '2',
      type: 'promo',
      title: "Offre spéciale !",
      message: "Profitez de -30% sur toute la collection d'été",
      time: "Il y a 1 heure",
      read: true
    },
    {
      id: '3',
      type: 'message',
      title: "Nouveau message",
      message: "Le vendeur a répondu à votre question sur le produit",
      time: "Il y a 2 heures",
      read: false
    },
    {
      id: '4',
      type: 'alert',
      title: "Stock limité",
      message: "Le produit 'Nike Air Max' est presque en rupture de stock",
      time: "Il y a 3 heures",
      read: true
    },
    {
      id: '5',
      type: 'info',
      title: "Mise à jour de l'application",
      message: "Découvrez les nouvelles fonctionnalités dans la version 2.0",
      time: "Il y a 1 jour",
      read: true
    },
    {
      id: '6',
      type: 'order',
      title: "Commande expédiée",
      message: "Votre commande #122 est en cours de livraison",
      time: "Il y a 1 jour",
      read: false
    },
    {
      id: '7',
      type: 'promo',
      title: "Code promo exclusif",
      message: "Utilisez SUMMER2024 pour -15% sur votre prochaine commande",
      time: "Il y a 2 jours",
      read: true
    }
  ]);
  
  const handlePress = () => {
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
    
    setIsModalVisible(true);
    if (onPress) onPress();
  };

  const handleDeleteNotification = (index) => {
    setNotifications(currentNotifications => 
      currentNotifications.filter((_, i) => i !== index)
    );
  };
  
  return (
    <>
      <TouchableOpacity 
        style={styles.container}
        activeOpacity={0.7}
        onPress={handlePress}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Bell size={22} color="#333" strokeWidth={2} />
          
          {notifications.length > 0 && (
            <View style={styles.notificationDot} />
          )}
        </Animated.View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <X size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Notifications</Text>
          </View>
          <NotificationList
            notifications={notifications}
            onDelete={handleDeleteNotification}
          />
        </View>
      </Modal>
    </>
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
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
  }
});