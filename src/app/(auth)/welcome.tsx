import React, { useRef } from 'react';
import { View,Text,StyleSheet,Dimensions,FlatList,Image,TouchableOpacity,Animated,} from 'react-native';
import { useRouter } from 'expo-router';
import { useDynamicStyles } from '@/src/styles/globalStyles';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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
  const dynamicStyles = useDynamicStyles();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) return <Text style={{ textAlign: 'center' }}>Cargando fuente...</Text>;

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <Text
        style={[
          styles.title,
          {
            color: dynamicStyles.themeColors.primary,
            fontFamily: 'Poppins_400Regular',
          },
        ]}
      >
        {item.title}
      </Text>
      <Text
        style={[
          styles.description,
          {
            color: dynamicStyles.themeColors.secondary,
            fontFamily: 'Poppins_400Regular',
          },
        ]}
      >
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
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
      />

      {renderDots()}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: dynamicStyles.themeColors.primary }]}
        onPress={() => router.replace('/(auth)/start')}
        activeOpacity={0.9}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: dynamicStyles.themeColors.background,
              fontFamily: 'Poppins_400Regular',
            },
          ]}
        >
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
    padding: scale(20),
  },
  image: {
    width: '100%',
    height: verticalScale(350),
    borderRadius: scale(12),
    marginBottom: verticalScale(30),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    marginBottom: verticalScale(10),
    textAlign: 'center',
  },
  description: {
    fontSize: moderateScale(15),
    textAlign: 'center',
    paddingHorizontal: scale(25),
    lineHeight: moderateScale(22),
    maxWidth: '90%',
  },
  button: {
    marginVertical: verticalScale(30),
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    width: '80%',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
