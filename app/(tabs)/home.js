import { View, StyleSheet } from 'react-native';
import HeroBanner from '../../components/homeHero'; 

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HeroBanner
        image={require('../../assets/images/hero.png')}
        title="All You Need, One Place."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
