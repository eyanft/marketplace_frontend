import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/category/categoryService';
import { Colors } from '../../config/colors';

const { width } = Dimensions.get('window');

const CategoryListItem = ({ category, isActive, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isActive ? 1.02 : 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundAnim, {
        toValue: isActive ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isActive]);

  const animatedBackgroundStyle = {
    opacity: backgroundAnim,
    transform: [
      {
        scale: backgroundAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.98, 1],
        }),
      },
    ],
  };

  return (
    <Animated.View
      style={[
        styles.categoryItem,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Animated.View style={[styles.activeBackground, animatedBackgroundStyle, { opacity: isActive ? 1 : 0 }]} />
      <TouchableOpacity onPress={() => onPress(category)} style={[styles.categoryTouchable, isActive && styles.activeCategoryTouchable]}>
        <View style={styles.contentContainer}>
          <Image
            source={{ uri: category.imageUrl }}
            style={[styles.categoryIcon, isActive && styles.activeCategoryIcon]}
            resizeMode="contain"
          />
          <Text style={[styles.categoryText, isActive && styles.activeText]} numberOfLines={1} ellipsizeMode="tail">
            {category.name}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const SubcategoryItem = React.memo(({ item, index, onMount }) => {
  const itemFadeAnim = useRef(new Animated.Value(0)).current;
  const itemTranslateY = useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(itemFadeAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(itemTranslateY, {
        toValue: 0,
        friction: 8,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]);

    animation.start(() => {
      if (onMount) onMount();
    });

    return () => animation.stop();
  }, [index]);

  return (
    <Animated.View
      style={[
        styles.subcategoryItem,
        {
          opacity: itemFadeAnim,
          transform: [{ translateY: itemTranslateY }],
        },
      ]}
    >
      <View style={styles.subcategoryIconContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.subcategoryIcon} resizeMode="contain" />
      </View>
      <Text style={styles.subcategoryText}>{item.name}</Text>
    </Animated.View>
  );
});

const SubcategoryGrid = ({ category }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [category]);

  const mockSubcategories = [
    { id: '1', name: 'Sub 1', imageUrl: category.imageUrl },
    { id: '2', name: 'Sub 2', imageUrl: category.imageUrl },
    { id: '3', name: 'Sub 3', imageUrl: category.imageUrl },
    { id: '4', name: 'Sub 4', imageUrl: category.imageUrl },
  ];

  const renderSubcategoryItem = ({ item, index }) => <SubcategoryItem item={item} index={index} />;

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY }],
      }}
    >
      <FlatList
        data={mockSubcategories}
        renderItem={renderSubcategoryItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.subcategoryGrid}
      />
    </Animated.View>
  );
};

export default function AllCategoriesScreen() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  React.useEffect(() => {
    if (categories && categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  if (isLoading) return <Text style={styles.loadingText}>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>Error loading categories</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.leftPanel}>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoryListItem category={item} isActive={selectedCategory?.id === item.id} onPress={setSelectedCategory} />
          )}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.rightPanel}>
        {selectedCategory ? (
          <>
            <Text style={styles.selectedCategoryTitle}>{selectedCategory.name}</Text>
            <SubcategoryGrid category={selectedCategory} />
          </>
        ) : (
          <Text style={styles.placeholderText}>Select a category to view items</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.background,
  },
  leftPanel: {
    width: width * 0.32,
    backgroundColor: '#F8F8F8',
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRightWidth: 1,
    borderRightColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  rightPanel: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  categoryItem: {
    position: 'relative',
    height: 76,
    justifyContent: 'center',
    marginVertical: 0,
  },
  activeBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
  },
  categoryTouchable: {
    height: '100%',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeCategoryTouchable: {
    backgroundColor: 'transparent',
  },
  categoryIcon: {
    width: 28,
    height: 28,
    marginBottom: 6,
    tintColor: '#757575',
    opacity: 0.8,
  },
  activeCategoryIcon: {
    tintColor: Colors.primary,
    opacity: 1,
  },
  categoryText: {
    fontSize: 13,
    color: '#757575',
    textAlign: 'center',
    fontWeight: '500',
    paddingHorizontal: 8,
  },
  activeText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  selectedCategoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  subcategoryGrid: {
    padding: 8,
  },
  subcategoryItem: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subcategoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  subcategoryIcon: {
    width: 35,
    height: 35,
    tintColor: Colors.primary,
  },
  subcategoryText: {
    fontSize: 14,
    color: Colors.primary,
    textAlign: 'center',
    fontWeight: '500',
  },
  loadingText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 20,
    color: Colors.primary,
  },
  errorText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.dotInactive,
    textAlign: 'center',
    marginTop: 20,
  },
});
