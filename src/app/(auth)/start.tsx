/*import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import {useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins'

const { width, height } = Dimensions.get('window');

export default function StartScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SELL AND BUY BEATS</Text>

      <Image
        source={require('../../assets/record.png')} 
        style={styles.image}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.createAccountButton]}
          onPress={() => router.push('/(auth)/register')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Create a new account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signInButton]}
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  title: {
    fontSize: width * 0.06,
    color: '#000',
    marginBottom: height * 0.03,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    fontWeight: 'bold',
  },
  image: {
    width: width * 0.8,
    height: height * 0.3,
    borderRadius: 15,
    marginBottom: height * 0.04,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: height * 0.02,
  },
  button: {
    width: width * 0.8,
    paddingVertical: height * 0.015,
    borderRadius: 25,
    alignItems: 'center',
  },
  createAccountButton: {
    backgroundColor: '#6A0DAD',
  },
  signInButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontFamily: 'Poppins_400Regular',
    fontWeight: 'bold',
  },
});
*/

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
    image: require('../../assets/images/onboarding1.jpg'),
  },
  {
    id: '2',
    title: 'Vende tu música',
    description: 'Publicá tus beats o voces y generá ingresos fácilmente.',
    image: require('../../assets/images/onboarding2.jpg'),
  },
  {
    id: '3',
    title: 'Conectá con el ritmo',
    description: 'Todo en un solo lugar para artistas, productores y creativos.',
    image: require('../../assets/images/onboarding3.jpg'),
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