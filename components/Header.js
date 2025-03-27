import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import Button from './ui/Button';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
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
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  searchButton: {
    position: 'absolute',
    right: 15,
    top: 5,
  },
});

export default Header;