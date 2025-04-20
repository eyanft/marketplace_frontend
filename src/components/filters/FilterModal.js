import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView, Pressable, TextInput } from 'react-native';
import { Colors } from '../../../config/colors';
import Slider from '@react-native-community/slider';
import { X, Star, ChevronDown, ChevronUp } from 'lucide-react-native';

const FilterModal = ({ visible, onClose }) => {
  const [selectedLocation, setSelectedLocation] = useState('Tunis');
  const [price, setPrice] = useState(25);
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('1000');
  const [selectedCategory, setSelectedCategory] = useState('Sports');
  const [rating, setRating] = useState(4);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const categories = ['Clothing', 'Electronics', 'Furniture', 'Automotive'];
  const tunisianGovernorates = [
    'Tunis', 'Ariana', 'Ben Arous', 'Manouba', 'Nabeul', 'Zaghouan', 'Bizerte',
    'Béja', 'Jendouba', 'Le Kef', 'Siliana', 'Sousse', 'Monastir', 'Mahdia',
    'Sfax', 'Kairouan', 'Kasserine', 'Sidi Bouzid', 'Gabès', 'Medenine',
    'Tataouine', 'Gafsa', 'Tozeur', 'Kebili'
  ];

  const handleMinPriceChange = (text) => {
    // Remove non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');
    setMinPrice(numericValue);
    if (numericValue && Number(numericValue) <= Number(maxPrice)) {
      setPrice(Number(numericValue));
    }
  };

  const handleMaxPriceChange = (text) => {
    // Remove non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');
    setMaxPrice(numericValue);
  };

  const renderStars = () => {
    return Array(5).fill(0).map((_, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => setRating(index + 1)}
        style={styles.starButton}
      >
        <Star
          size={32}
          color={index < rating ? Colors.primary : '#ECECEC'}
          fill={index < rating ? Colors.primary : 'none'}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollContent}>
            {/* Category Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Category</Text>
              <View style={styles.categoryContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category && styles.selectedCategory,
                    ]}
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text style={[
                      styles.categoryText,
                      selectedCategory === category && styles.selectedCategoryText
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Location Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Location</Text>
              <Pressable 
                style={styles.dropdownButton}
                onPress={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              >
                <Text style={styles.dropdownButtonText}>{selectedLocation}</Text>
                {isLocationDropdownOpen ? (
                  <ChevronUp size={20} color="#666" />
                ) : (
                  <ChevronDown size={20} color="#666" />
                )}
              </Pressable>
              {isLocationDropdownOpen && (
                <View style={styles.dropdownList}>
                  <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
                    {tunisianGovernorates.map((governorate) => (
                      <Pressable
                        key={governorate}
                        style={[
                          styles.dropdownItem,
                          selectedLocation === governorate && styles.selectedDropdownItem
                        ]}
                        onPress={() => {
                          setSelectedLocation(governorate);
                          setIsLocationDropdownOpen(false);
                        }}
                      >
                        <Text style={[
                          styles.dropdownItemText,
                          selectedLocation === governorate && styles.selectedDropdownItemText
                        ]}>
                          {governorate}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Price Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Price</Text>
                <Text style={styles.priceValue}>${Math.floor(price)}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={Number(minPrice) || 0}
                  maximumValue={Number(maxPrice) || 1000}
                  step={1}
                  value={price}
                  onValueChange={setPrice}
                  minimumTrackTintColor={Colors.primary}
                  maximumTrackTintColor="#ECECEC"
                  thumbTintColor={Colors.primary}
                />
                <View style={styles.priceInputContainer}>
                  <View style={styles.priceInputWrapper}>
                    <Text style={styles.priceInputLabel}>Min Price</Text>
                    <View style={styles.priceInputBox}>
                      <Text style={styles.currencySymbol}>$</Text>
                      <TextInput
                        style={styles.priceInput}
                        value={minPrice}
                        onChangeText={handleMinPriceChange}
                        keyboardType="numeric"
                        placeholder="Min"
                        placeholderTextColor="#999"
                      />
                    </View>
                  </View>
                  <View style={styles.priceInputWrapper}>
                    <Text style={styles.priceInputLabel}>Max Price</Text>
                    <View style={styles.priceInputBox}>
                      <Text style={styles.currencySymbol}>$</Text>
                      <TextInput
                        style={styles.priceInput}
                        value={maxPrice}
                        onChangeText={handleMaxPriceChange}
                        keyboardType="numeric"
                        placeholder="Max"
                        placeholderTextColor="#999"
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Rating Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Product Rating</Text>
              <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                  {renderStars()}
                </View>
                <Text style={styles.ratingText}>
                  {rating} {rating === 1 ? 'Star' : 'Stars'} & Above
                </Text>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.applyButton} onPress={onClose}>
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  scrollContent: {
    flex: 1,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  selectedCategory: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    color: '#666',
  },
  selectedCategoryText: {
    color: 'white',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownList: {
    marginTop: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
    maxHeight: 200,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  selectedDropdownItem: {
    backgroundColor: Colors.primary + '20',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDropdownItemText: {
    color: Colors.primary,
    fontWeight: '500',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  priceContainer: {
    marginBottom: 20,
  },
  priceValue: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  ratingContainer: {
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  starButton: {
    padding: 5,
  },
  ratingText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
  },
  applyButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  priceInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 15,
  },
  priceInputWrapper: {
    flex: 1,
  },
  priceInputLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  priceInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECECEC',
    paddingHorizontal: 10,
    height: 40,
  },
  currencySymbol: {
    color: '#666',
    marginRight: 5,
    fontSize: 16,
  },
  priceInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
});

export default FilterModal; 