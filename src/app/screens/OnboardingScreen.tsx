// src/app/screens/OnboardingScreen.tsx
import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Compra Beats',
    description: 'Explorá una gran variedad de beats creados por productores independientes.',
    image: require('../../assets/onboarding1.jpg'),
  },
  {
    id: '2',
    title: 'Vende tu música',
    description: 'Publicá tus beats o voces y generá ingresos fácilmente.',
    image: require('../../assets/onboarding2.jpg'),
  },
  {
    id: '3',
    title: 'Conectá con el ritmo',
    description: 'Todo en un solo lugar para artistas, productores y creativos.',
    image: require('../../assets/onboarding3.jpg'),
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

          const dotOpacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return <Animated.View key={index} style={[styles.dot, { opacity: dotOpacity }]} />;
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />

      {renderDots()}

      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Login')}>
        <Text style={styles.buttonText}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: '#a259ff',
    borderRadius: 5,
    marginHorizontal: 6,
  },
  button: {
    backgroundColor: '#a259ff',
    margin: 50,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
