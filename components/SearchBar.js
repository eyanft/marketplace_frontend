import React, { useState } from 'react'; 
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, SlidersHorizontal, Camera } from 'lucide-react-native';
import { Colors } from '../config/colors'; 
import VisualSearch from './VisualSearch';

export default function SearchBar() {
  const [visualSearchVisible, setVisualSearchVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#999"
          />
          <TouchableOpacity 
            style={styles.cameraButton}
            onPress={() => setVisualSearchVisible(true)}
          >
            <Camera size={20} color="#999" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <VisualSearch 
        visible={visualSearchVisible}
        onClose={() => setVisualSearchVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1, 
    borderColor: '#ddd', 
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  cameraButton: {
    padding: 5,
  },
  filterButton: {
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});
