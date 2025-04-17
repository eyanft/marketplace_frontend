import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, PanResponder, ScrollView } from 'react-native';
import { Trash2, Bell, Mail, Gift, ShoppingCart, Info } from 'lucide-react-native';
import { Colors } from '../../../config/colors'; 

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;

// Mapping des types de notifications avec leurs icônes
const NOTIFICATION_ICONS = {
  alert: Bell,
  message: Mail,
  promo: Gift,
  order: ShoppingCart,
  info: Info,
};

export default function NotificationList({ notifications = [], onDelete }) {
  const [activeTab, setActiveTab] = useState('all');
  const [swipeAnimations] = useState(
    notifications.map(() => new Animated.Value(0))
  );
  const [deleteOpacities] = useState(
    notifications.map(() => new Animated.Value(0))
  );
  const [deletingIndexes, setDeletingIndexes] = useState(new Set());

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(notification => !notification.read);

  const createPanResponder = (index) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          swipeAnimations[index].setValue(gestureState.dx);
          // Mettre à jour l'opacité en fonction du swipe
          const opacity = Math.min(Math.abs(gestureState.dx) / (width * 0.25), 1);
          deleteOpacities[index].setValue(opacity);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -SWIPE_THRESHOLD) {
          Animated.parallel([
            Animated.timing(swipeAnimations[index], {
              toValue: -width * 0.25,
              duration: 150,
              useNativeDriver: true,
            }),
            Animated.timing(deleteOpacities[index], {
              toValue: 1,
              duration: 150,
              useNativeDriver: true,
            })
          ]).start();
        } else {
          Animated.parallel([
            Animated.spring(swipeAnimations[index], {
              toValue: 0,
              friction: 7,
              tension: 40,
              useNativeDriver: true,
            }),
            Animated.timing(deleteOpacities[index], {
              toValue: 0,
              duration: 150,
              useNativeDriver: true,
            })
          ]).start();
        }
      },
    });
  };

  const panResponders = notifications.map((_, index) => createPanResponder(index));

  const handleDelete = (index) => {
    if (deletingIndexes.has(index)) return;
    
    setDeletingIndexes(current => new Set([...current, index]));
    
    Animated.sequence([
      Animated.parallel([
        Animated.timing(deleteOpacities[index], {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(swipeAnimations[index], {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        })
      ]),
      Animated.timing(swipeAnimations[index], {
        toValue: -width,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      setTimeout(() => {
        if (onDelete) onDelete(index);
        setDeletingIndexes(current => {
          const newSet = new Set(current);
          newSet.delete(index);
          return newSet;
        });
      }, 50);
    });
  };

  const getNotificationIcon = (type) => {
    const IconComponent = NOTIFICATION_ICONS[type] || Info;
    return <IconComponent size={24} color={Colors.primary} strokeWidth={2} />;
  };

  const renderNotification = (notification, index) => {
    if (deletingIndexes.has(index)) {
      return null;
    }

    const translateX = swipeAnimations[index];

    return (
      <View key={notification.id || `notification-${index}`} style={styles.notificationContainer}>
        <Animated.View
          style={[
            styles.notificationContent,
            styles.notificationShadow,
            { transform: [{ translateX }] }
          ]}
          {...panResponders[index].panHandlers}
        >
          <View style={styles.notificationIcon}>
            {getNotificationIcon(notification.type)}
          </View>
          <View style={styles.notificationText}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationMessage}>{notification.message}</Text>
            <Text style={styles.notificationTime}>{notification.time}</Text>
          </View>
        </Animated.View>
        <Animated.View 
          style={[
            styles.deleteButton,
            { opacity: deleteOpacities[index] }
          ]}
        >
          <TouchableOpacity
            style={styles.deleteButtonContent}
            onPress={() => handleDelete(index)}
          >
            <Trash2 size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            Toutes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'unread' && styles.activeTab]}
          onPress={() => setActiveTab('unread')}
        >
          <Text style={[styles.tabText, activeTab === 'unread' && styles.activeTabText]}>
            Non lues
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        style={styles.notificationsList}
        contentContainerStyle={styles.notificationsListContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredNotifications.map((notification, index) => renderNotification(notification, index))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  notificationsList: {
    flex: 1,
  },
  notificationsListContent: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  notificationContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    minHeight: 100,
    backgroundColor: 'transparent',
  },
  notificationContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationShadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notificationIcon: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: width * 0.25,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  deleteButtonContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 