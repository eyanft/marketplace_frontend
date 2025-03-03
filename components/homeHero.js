import React, { useState, useRef, useEffect } from 'react'; 
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  ScrollView 
} from 'react-native';
import { Colors } from '../config/colors'; 

const screenWidth = Dimensions.get('window').width;

const defaultData = {
  title: 'Shop Smart, Buy Easy!',
  subtitle: 'Everything you need, just a click away.',
  buttonText: 'Discover',
  image: 'https://img.freepik.com/photos-gratuite/ventes-achats-du-cyber-monday_23-2148688508.jpg?t=st=1741001246~exp=1741004846~hmac=06b83d68c881e7c0802369cd496b6ea3e8cd51bcc284683bfc110c52a3463c89&w=1380', 
};


export default function HeroBanner({ data = defaultData }) {
  const banners = [
    data,
    {
      title: 'Summer Sale',
      subtitle: 'Up to 70% off on selected items',
      buttonText: 'View Offers',
      image: 'https://img.freepik.com/photos-gratuite/vue-dessus-du-smartphone-clavier-chargeur_23-2149404178.jpg?t=st=1741002900~exp=1741006500~hmac=7c93faaa603a5e460ceccca397e3293116112124f401a693a7e0bbd807ad04e4&w=1380',
    },
    {
      title: 'New Arrivals',
      subtitle: 'Check out our latest collection',
      buttonText: 'Explore',
      image: 'https://img.freepik.com/vecteurs-libre/appareils-ustensiles-cuisine-icons-set_1284-10067.jpg?t=st=1741003414~exp=1741007014~hmac=a0e57a73c3076ce41903d601311c13dcd946593697cd600f232195e24bf9c3c7&w=900',
    },
    {
      title: 'Exclusive Deals',
      subtitle: 'Members only special offers',
      buttonText: 'Join Now',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=720&q=80',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  // Auto-scroll functionality
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Scroll to active banner
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: activeIndex * screenWidth, 
        animated: true,
      });
    }
  }, [activeIndex]);

  // Handle manual scroll
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / screenWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        {banners.map((banner, index) => (
          <View key={index} style={[styles.bannerItem, { width: screenWidth }]}>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{banner.title}</Text>
              <Text style={styles.subtitle}>{banner.subtitle}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{banner.buttonText}</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: banner.image }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
      
      {/* Pagination dots */}
      <View style={styles.pagination}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0, 
  },
  bannerItem: {
    height: 150,
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row'
  },
  contentContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  image: {
    width: '40%',
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: Colors.dotInactive,
    marginHorizontal: 3,
  },
  paginationDotActive: {
    backgroundColor: Colors.primary,
    width: 20,
  },
});
