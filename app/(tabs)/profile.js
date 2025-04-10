import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../config/colors";
import MyProfile from "../(profile)/MyProfile";
export default function ProfileScreen() {
  //   return (
  //     <ScrollView style={styles.container}>
  //       <Text style={styles.title}>My Profile</Text>

  //       <View style={styles.profileSection}>
  //         <View style={styles.imageContainer}>
  //           <Image
  //             source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces&q=80' }}
  //             style={styles.profileImage}
  //           />
  //           <View style={styles.editIconContainer}>
  //             <Icon name="edit" size={14} color="#fff" />
  //           </View>
  //         </View>
  //         <Text style={styles.name}>Eya Naffeti</Text>
  //         <Text style={styles.email}>eyanaffeti@gmail.com</Text>
  //       </View>

  //       <View style={styles.menuSection}>
  //         <TouchableOpacity style={styles.menuItem}>
  //           <View style={styles.menuLeft}>
  //             <View style={[styles.iconCircle, { backgroundColor: Colors.primary }]}>
  //               <Icon name="shopping-bag" size={16} color="#fff" />
  //             </View>
  //             <View style={styles.menuTextContainer}>
  //               <Text style={styles.menuTitle}>My orders</Text>
  //               <Text style={styles.menuSubtitle}>Already have 12 orders</Text>
  //             </View>
  //           </View>
  //           <Icon name="chevron-right" size={16} color="#999" />
  //         </TouchableOpacity>

  //         <TouchableOpacity style={styles.menuItem}>
  //           <View style={styles.menuLeft}>
  //             <View style={[styles.iconCircle, { backgroundColor: Colors.primary }]}>
  //               <Icon name="location-on" size={16} color="#fff" />
  //             </View>
  //             <View style={styles.menuTextContainer}>
  //               <Text style={styles.menuTitle}>Shipping addresses</Text>
  //               <Text style={styles.menuSubtitle}>3 addresses</Text>
  //             </View>
  //           </View>
  //           <Icon name="chevron-right" size={16} color="#999" />
  //         </TouchableOpacity>

  //         <TouchableOpacity style={styles.menuItem}>
  //           <View style={styles.menuLeft}>
  //             <View style={[styles.iconCircle, { backgroundColor: Colors.primary }]}>
  //               <Icon name="credit-card" size={16} color="#fff" />
  //             </View>
  //             <View style={styles.menuTextContainer}>
  //               <Text style={styles.menuTitle}>Payment methods</Text>
  //               <Text style={styles.menuSubtitle}>Visa **34</Text>
  //             </View>
  //           </View>
  //           <Icon name="chevron-right" size={16} color="#999" />
  //         </TouchableOpacity>

  //         <TouchableOpacity style={styles.menuItem}>
  //           <View style={styles.menuLeft}>
  //             <View style={[styles.iconCircle, { backgroundColor: Colors.primary }]}>
  //               <Icon name="local-offer" size={16} color="#fff" />
  //             </View>
  //             <View style={styles.menuTextContainer}>
  //               <Text style={styles.menuTitle}>Promocodes</Text>
  //               <Text style={styles.menuSubtitle}>You have special promocodes</Text>
  //             </View>
  //           </View>
  //           <Icon name="chevron-right" size={16} color="#999" />
  //         </TouchableOpacity>

  //         <TouchableOpacity style={styles.menuItem}>
  //           <View style={styles.menuLeft}>
  //             <View style={[styles.iconCircle, { backgroundColor: Colors.primary }]}>
  //               <Icon name="star" size={16} color="#fff" />
  //             </View>
  //             <View style={styles.menuTextContainer}>
  //               <Text style={styles.menuTitle}>My reviews</Text>
  //               <Text style={styles.menuSubtitle}>Reviews for 4 items</Text>
  //             </View>
  //           </View>
  //           <Icon name="chevron-right" size={16} color="#999" />
  //         </TouchableOpacity>

  //         <TouchableOpacity style={styles.menuItem}>
  //           <View style={styles.menuLeft}>
  //             <View style={[styles.iconCircle, { backgroundColor: Colors.primary }]}>
  //               <Icon name="settings" size={16} color="#fff" />
  //             </View>
  //             <View style={styles.menuTextContainer}>
  //               <Text style={styles.menuTitle}>Settings</Text>
  //               <Text style={styles.menuSubtitle}>Notifications, password</Text>
  //             </View>
  //           </View>
  //           <Icon name="chevron-right" size={16} color="#999" />
  //         </TouchableOpacity>
  //       </View>

  //       <TouchableOpacity style={styles.signOutButton}>
  //         <Icon name="logout" size={16} color="#fff" style={styles.signOutIcon} />
  //         <Text style={styles.signOutText}>Sign Out</Text>
  //       </TouchableOpacity>
  //     </ScrollView>
  //   );
  // }

  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: '#fff',
  //     paddingHorizontal: 16,
  //   },
  //   title: {
  //     fontSize: 22,
  //     fontWeight: '600',
  //     textAlign: 'left',
  //     marginTop: 50,
  //     marginBottom: 16,
  //     paddingLeft: 4,
  //   },
  //   profileSection: {
  //     alignItems: 'center',
  //     marginBottom: 24,
  //   },
  //   imageContainer: {
  //     position: 'relative',
  //     marginBottom: 12,
  //   },
  //   profileImage: {
  //     width: 80,
  //     height: 80,
  //     borderRadius: 40,
  //     borderWidth: 2,
  //     borderColor: '#fff',
  //   },
  //   editIconContainer: {
  //     position: 'absolute',
  //     bottom: 0,
  //     right: 0,
  //     backgroundColor: Colors.primary,
  //     width: 24,
  //     height: 24,
  //     borderRadius: 12,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     borderWidth: 2,
  //     borderColor: '#fff',
  //   },
  //   name: {
  //     fontSize: 20,
  //     fontWeight: '600',
  //     marginBottom: 2,
  //   },
  //   email: {
  //     fontSize: 14,
  //     color: '#666',
  //   },
  //   menuSection: {
  //     marginTop: 16,
  //     backgroundColor: '#fff',
  //     borderRadius: 12,
  //     padding: 8,
  //     shadowColor: '#000',
  //     shadowOffset: {
  //       width: 0,
  //       height: 2,
  //     },
  //     shadowOpacity: 0.1,
  //     shadowRadius: 3,
  //     elevation: 3,
  //   },
  //   menuItem: {
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //     paddingVertical: 12,
  //     paddingHorizontal: 8,
  //     borderBottomWidth: 1,
  //     borderBottomColor: '#f0f0f0',
  //   },
  //   menuLeft: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //   },
  //   iconCircle: {
  //     width: 32,
  //     height: 32,
  //     borderRadius: 16,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     marginRight: 12,
  //   },
  //   menuTextContainer: {
  //     flex: 1,
  //   },
  //   menuTitle: {
  //     fontSize: 15,
  //     fontWeight: '500',
  //     color: '#333',
  //   },
  //   menuSubtitle: {
  //     fontSize: 12,
  //     color: '#999',
  //     marginTop: 2,
  //   },
  //   signOutButton: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     backgroundColor: Colors.primary,
  //     marginTop: 24,
  //     marginBottom: 24,
  //     paddingVertical: 12,
  //     borderRadius: 8,
  //     width: '100%',
  //     shadowColor: '#000',
  //     shadowOffset: {
  //       width: 0,
  //       height: 2,
  //     },
  //     shadowOpacity: 0.1,
  //     shadowRadius: 3,
  //     elevation: 3,
  //   },
  //   signOutIcon: {
  //     marginRight: 6,
  //   },
  //   signOutText: {
  //     color: '#fff',
  //     fontSize: 15,
  //     fontWeight: '600',
  //   },
  // });
  return <MyProfile />;
}
