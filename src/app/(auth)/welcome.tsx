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
import { useRouter } from 'expo-router';
import { useDynamicStyles,getThemeColors} from '@/src/styles/globalStyles';
import { useColorScheme } from 'react-native';

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

export default function Welcome() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const dynamicStyles = useDynamicStyles(); // Obtiene estilos dinámicos

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={[styles.title, { color: dynamicStyles.themeColors.primary || '#000' }]}>{item.title}</Text>
      <Text style={[styles.description, { color: dynamicStyles.themeColors.secondary || '#666' }]}>
        {item.description}
      </Text>
    </View>
  );

  const renderDots = () => (
    <View style={dynamicStyles.dotsContainer}>
      {slides.map((_, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

        const dotOpacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return <Animated.View key={index} style={[dynamicStyles.dot, { opacity: dotOpacity }]} />;
      })}
    </View>
  );

  return (
    <View style={[dynamicStyles.container, { backgroundColor: dynamicStyles.themeColors.background }]}>
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

      <TouchableOpacity
        style={[styles.button, { backgroundColor: dynamicStyles.themeColors.primary }]}
        onPress={() => router.replace('/(auth)/start')}
      >
        <Text style={[styles.buttonText, { color: dynamicStyles.themeColors.background }]}>
          Comenzar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  button: {
    margin: 50,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});


