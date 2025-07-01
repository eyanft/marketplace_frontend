import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Search } from 'lucide-react-native';
import { Feather } from '@expo/vector-icons';
import Button from '../ui/Button';

const Header = ({ title, showBack, onBack }) => {
  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        {showBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Feather name="chevron-left" size={28} color="black" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
        <Button variant="ghost" size="icon" style={styles.searchButton}>
          <Search size={20} color="black" />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    paddingBottom: 10,
  },
  titleContainer: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 5,
    zIndex: 2,
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  searchButton: {
    position: 'absolute',
    right: 15,
    top: 5,
  },
});

export default Header;